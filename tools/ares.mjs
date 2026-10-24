#!/usr/bin/env node
// Runs LG's webOS CLI (ares-*) for this app, cross-platform.
//   node tools/ares.mjs install|launch|inspect [extra ares args, e.g. -d mytv]
// Requires the CLI on PATH: npm install -g @webos-tools/cli
// Preloads node-compat.cjs so ares works on Node 23+ (util.isDate etc. were removed).

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { id, version } = JSON.parse(readFileSync(join(ROOT, 'src', 'appinfo.json'), 'utf8'));

const COMMANDS = {
  install: ['ares-install', join(ROOT, 'dist', `${id}_${version}_all.ipk`)],
  launch: ['ares-launch', id],
  inspect: ['ares-inspect', '--app', id],
};

const [action, ...extra] = process.argv.slice(2);
if (!COMMANDS[action]) {
  console.error(`usage: node tools/ares.mjs <${Object.keys(COMMANDS).join('|')}> [ares args]`);
  process.exit(2);
}

const [cmd, ...args] = COMMANDS[action];
const shim = join(ROOT, 'tools', 'node-compat.cjs');
const { status, error } = spawnSync(cmd, [...args, ...extra], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, NODE_OPTIONS: `${process.env.NODE_OPTIONS || ''} --require "${shim}"`.trim() },
});
if (error) {
  console.error(error.code === 'ENOENT' ? `${cmd} not found. Install it with: npm install -g @webos-tools/cli` : error.message);
  process.exit(1);
}
process.exit(status ?? 1);
