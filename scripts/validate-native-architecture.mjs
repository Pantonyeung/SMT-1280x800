import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TEXT_EXTENSIONS = new Set(['.html', '.css', '.js', '.mjs', '.json', '.md']);
const FORBIDDEN_FILE_PARTS = ['restore', 'override', 'patch', 'fix', 'enhancement'];
const RULES = [
  ['no-important', /!important\b/],
  ['no-inline-style', /\sstyle\s*=\s*["']/i],
  ['no-legacy-canvas', /\b1920(?:px)?\b|1920\s*[×x]\s*1080/i],
  ['no-production-scale', /transform\s*:\s*scale\s*\(/i],
  ['no-mutation-observer', /\bMutationObserver\b/],
];

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

export function validateNativeArchitecture(rootDir) {
  const sourceRoot = path.join(rootDir, 'src-native');
  const violations = [];

  for (const filePath of walk(sourceRoot)) {
    const relative = path.relative(rootDir, filePath).replaceAll(path.sep, '/');
    const lowerName = path.basename(filePath).toLowerCase();

    for (const part of FORBIDDEN_FILE_PARTS) {
      if (lowerName.includes(part)) {
        violations.push({ file: relative, rule: 'no-forbidden-filename' });
        break;
      }
    }

    if (!TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase())) continue;
    const source = fs.readFileSync(filePath, 'utf8');
    for (const [rule, pattern] of RULES) {
      if (pattern.test(source)) violations.push({ file: relative, rule });
    }
  }

  return { violations };
}

function runCli() {
  const rootDir = path.resolve(process.argv[2] || process.cwd());
  const result = validateNativeArchitecture(rootDir);
  if (result.violations.length === 0) {
    console.log('Native architecture guard: PASS');
    return;
  }

  console.error('Native architecture guard: FAIL');
  for (const violation of result.violations) {
    console.error(`- ${violation.file}: ${violation.rule}`);
  }
  process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) runCli();
