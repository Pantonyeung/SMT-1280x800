import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { validateNativeArchitecture } from '../scripts/validate-native-architecture.mjs';

test('architecture guard detects forbidden native patterns', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'morefun-native-'));
  const source = path.join(root, 'src-native');
  fs.mkdirSync(source, { recursive: true });
  fs.writeFileSync(
    path.join(source, 'screen-fix.css'),
    '.legacy{width:1920px!important;transform:scale(.5)}',
  );
  fs.writeFileSync(
    path.join(source, 'index.html'),
    '<div style="width:1px"></div><script>new MutationObserver(()=>{})</script>',
  );

  const rules = new Set(validateNativeArchitecture(root).violations.map(({ rule }) => rule));
  assert.deepEqual(
    [...rules].sort(),
    [
      'no-forbidden-filename',
      'no-important',
      'no-inline-style',
      'no-legacy-canvas',
      'no-mutation-observer',
      'no-production-scale',
    ].sort(),
  );
});

test('architecture guard accepts clean native source', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'morefun-native-'));
  const source = path.join(root, 'src-native');
  fs.mkdirSync(source, { recursive: true });
  fs.writeFileSync(path.join(source, 'tokens.css'), ':root{--app-width:1280px}');
  assert.deepEqual(validateNativeArchitecture(root), { violations: [] });
});
