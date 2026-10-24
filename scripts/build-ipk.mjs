#!/usr/bin/env node
// Packages src/ into dist/<id>_<version>_all.ipk with no dependencies.
//
// An .ipk is an `ar` archive of: debian-binary ("2.0\n"), control.tar.gz and
// data.tar.gz (usr/palm/applications/<id>/... + usr/palm/packages/<id>/packageinfo.json),
// the same layout ares-package produces. Output is byte-identical on every OS and
// Node version: timestamps come from SOURCE_DATE_EPOCH (or the last git commit),
// files are sorted, and gzip uses stored blocks (see gzipStored).

import { execSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, posix, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');

const appinfo = JSON.parse(readFileSync(join(SRC, 'appinfo.json'), 'utf8'));
const { id, version } = appinfo;
if (!/^[a-z0-9.-]+$/.test(id)) throw new Error(`appinfo.json: invalid id "${id}"`);
if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error(`appinfo.json: invalid version "${version}"`);

const mtime = Number(process.env.SOURCE_DATE_EPOCH) || gitTime() || Math.floor(Date.now() / 1000);

function gitTime() {
  try {
    return Number(execSync('git log -1 --format=%ct', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }));
  } catch {
    return 0;
  }
}

// ---- tar (ustar) ----------------------------------------------------------

function octal(n, width) {
  return n.toString(8).padStart(width - 1, '0') + '\0';
}

function tarHeader(name, size, isDir) {
  const h = Buffer.alloc(512);
  let prefix = '';
  if (Buffer.byteLength(name) > 100) {
    const cut = name.lastIndexOf('/', 155);
    prefix = name.slice(0, cut);
    name = name.slice(cut + 1);
  }
  h.write(name, 0, 100);
  h.write(octal(isDir ? 0o755 : 0o644, 8), 100);
  h.write(octal(0, 8), 108); // uid
  h.write(octal(0, 8), 116); // gid
  h.write(octal(size, 12), 124);
  h.write(octal(mtime, 12), 136);
  h.fill(' ', 148, 156); // checksum placeholder
  h.write(isDir ? '5' : '0', 156);
  h.write('ustar\0', 257);
  h.write('00', 263);
  h.write('root', 265, 32);
  h.write('root', 297, 32);
  h.write(prefix, 345, 155);
  const sum = h.reduce((a, b) => a + b, 0);
  h.write(octal(sum, 7) + ' ', 148);
  return h;
}

function tar(entries) {
  const parts = [];
  for (const { name, data } of entries) {
    const isDir = data === null;
    parts.push(tarHeader(isDir ? `${name}/` : name, isDir ? 0 : data.length, isDir));
    if (!isDir) {
      parts.push(data, Buffer.alloc((512 - (data.length % 512)) % 512));
    }
  }
  parts.push(Buffer.alloc(1024));
  return Buffer.concat(parts);
}

// ---- ar --------------------------------------------------------------------

function ar(members) {
  const parts = [Buffer.from('!<arch>\n')];
  for (const { name, data } of members) {
    const header = name.padEnd(16) + String(mtime).padEnd(12) + '0'.padEnd(6) + '0'.padEnd(6)
      + '100644'.padEnd(8) + String(data.length).padEnd(10) + '`\n';
    parts.push(Buffer.from(header), data);
    if (data.length % 2) parts.push(Buffer.from('\n'));
  }
  return Buffer.concat(parts);
}

// ---- package ----------------------------------------------------------------

function walk(dir) {
  return readdirSync(dir).sort().flatMap((entry) => {
    const full = join(dir, entry);
    if (entry.startsWith('.')) return [];
    return statSync(full).isDirectory() ? [{ full, dir: true }, ...walk(full)] : [{ full, dir: false }];
  });
}

const appDir = `usr/palm/applications/${id}`;
const pkgDir = `usr/palm/packages/${id}`;
const files = walk(SRC);
const packageinfo = Buffer.from(JSON.stringify({ id, version, app: id }, null, 2) + '\n');

const data = [
  ...['usr', 'usr/palm', 'usr/palm/applications', 'usr/palm/packages', appDir, pkgDir]
    .map((name) => ({ name, data: null })),
  ...files.map(({ full, dir }) => ({
    name: posix.join(appDir, relative(SRC, full).split('\\').join('/')),
    data: dir ? null : readFileSync(full),
  })),
  { name: `${pkgDir}/packageinfo.json`, data: packageinfo },
];

const installedSize = data.reduce((n, e) => n + (e.data ? e.data.length : 0), 0);
const control = Buffer.from([
  `Package: ${id}`,
  `Version: ${version}`,
  'Section: misc',
  'Priority: optional',
  'Architecture: all',
  `Installed-Size: ${installedSize}`,
  `Maintainer: ${appinfo.vendor || 'N/A'}`,
  `Description: ${appinfo.title}`,
  'webOS-Package-Format-Version: 2',
  'webOS-Packager-Version: x.y.x',
  '',
].join('\n'));

// ---- gzip -------------------------------------------------------------------
// Deflate output differs between zlib versions (Node bundles different ones), so
// we write "stored" (uncompressed) deflate blocks, which every implementation
// produces identically. The payload is mostly already-compressed PNGs anyway.

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function gzipStored(buf) {
  const parts = [Buffer.from([0x1f, 0x8b, 8, 0, 0, 0, 0, 0, 0, 3])]; // no mtime, OS = Unix
  const MAX = 0xffff;
  for (let i = 0; i === 0 || i < buf.length; i += MAX) {
    const block = buf.subarray(i, i + MAX);
    const head = Buffer.alloc(5);
    head[0] = i + MAX >= buf.length ? 1 : 0; // BFINAL on the last block, BTYPE = stored
    head.writeUInt16LE(block.length, 1);
    head.writeUInt16LE(~block.length & 0xffff, 3);
    parts.push(head, block);
  }
  const tail = Buffer.alloc(8);
  tail.writeUInt32LE(crc32(buf), 0);
  tail.writeUInt32LE(buf.length >>> 0, 4);
  parts.push(tail);
  return Buffer.concat(parts);
}

const gz = gzipStored;
const ipk = ar([
  { name: 'debian-binary', data: Buffer.from('2.0\n') },
  { name: 'control.tar.gz', data: gz(tar([{ name: 'control', data: control }])) },
  { name: 'data.tar.gz', data: gz(tar(data)) },
]);

mkdirSync(DIST, { recursive: true });
const out = join(DIST, `${id}_${version}_all.ipk`);
writeFileSync(out, ipk);
console.log(`${relative(ROOT, out)} (${ipk.length} bytes)`);
