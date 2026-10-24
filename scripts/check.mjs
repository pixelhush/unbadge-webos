#!/usr/bin/env node
// Sanity checks run in CI and before releases: manifest, files, script syntax,
// and (with --tag vX.Y.Z) that the tag matches appinfo.json.

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const errors = [];
const fail = (msg) => errors.push(msg);

let appinfo = {};
try {
  appinfo = JSON.parse(readFileSync(join(SRC, 'appinfo.json'), 'utf8'));
} catch (e) {
  fail(`src/appinfo.json is not valid JSON: ${e.message}`);
}

for (const key of ['id', 'version', 'type', 'main', 'title', 'icon', 'largeIcon']) {
  if (!appinfo[key]) fail(`src/appinfo.json: missing "${key}"`);
}
if (appinfo.id && !/^[a-z0-9.-]+$/.test(appinfo.id)) fail(`src/appinfo.json: invalid id "${appinfo.id}"`);
if (appinfo.version && !/^\d+\.\d+\.\d+$/.test(appinfo.version)) fail(`src/appinfo.json: version must be X.Y.Z`);

for (const key of ['main', 'icon', 'largeIcon']) {
  if (appinfo[key] && !existsSync(join(SRC, appinfo[key]))) fail(`src/${appinfo[key]} (appinfo "${key}") not found`);
}

const userScript = join(SRC, 'webOSUserScripts', 'userScript.js');
try {
  new vm.Script(readFileSync(userScript, 'utf8'), { filename: userScript });
} catch (e) {
  fail(`userScript.js does not parse: ${e.message}`);
}

const tagIndex = process.argv.indexOf('--tag');
if (tagIndex !== -1) {
  const tag = process.argv[tagIndex + 1];
  if (tag !== `v${appinfo.version}`) fail(`tag ${tag} does not match appinfo.json version v${appinfo.version}`);
}

if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`);
  process.exit(1);
}
console.log(`✓ ${appinfo.id} ${appinfo.version}`);
