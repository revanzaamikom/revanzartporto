const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, 'src');
const exts = new Set(['.js', '.jsx', '.ts', '.tsx', '.astro']);

function walk(dir) {
  const res = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) res.push(...walk(full));
    else if (e.isFile() && exts.has(path.extname(e.name))) res.push(full);
  }
  return res;
}

function findImports(content) {
  const imports = [];
  // simple regex for import ... from '...'
  const re = /import\s+([\s\S]+?)\s+from\s+["']([^"']+)["'];?/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const raw = m[1].trim();
    const line = m[0].trim();
    if (!raw) continue;
    // handle default + named: e.g. default, {a,b as c}
    if (raw.startsWith('{') || raw.includes('{')) {
      // extract named part inside {}
      const namedMatch = raw.match(/\{([\s\S]*?)\}/);
      if (namedMatch) {
        const items = namedMatch[1].split(',').map(s => s.trim()).filter(Boolean);
        for (const it of items) {
          // handle alias: a as b
          const parts = it.split(/\s+as\s+/i).map(s => s.trim());
          const name = parts.length>1?parts[1]:parts[0];
          imports.push({ importText: line, name });
        }
      }
      // also check default before the named, like: defaultExport, {a}
      const before = raw.split('{')[0].replace(/,$/, '').trim();
      if (before) {
        imports.push({ importText: line, name: before });
      }
    } else if (raw.startsWith('*\s+as')) {
      const parts = raw.split(/\s+as\s+/i);
      if (parts[1]) imports.push({ importText: line, name: parts[1].trim() });
    } else {
      // single default import
      imports.push({ importText: line, name: raw });
    }
  }
  return imports;
}

const files = walk(root);
const results = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const imports = findImports(content);
  for (const imp of imports) {
    const name = imp.name.replace(/[^A-Za-z0-9_\$]/g, '');
    if (!name) continue;
    const re = new RegExp('\\b' + name + '\\b', 'g');
    const matches = content.match(re) || [];
    const count = matches.length;
    // if only occurrence is in import -> count <=1
    if (count <= 1) {
      results.push({ file, identifier: name, occurrences: count, importLine: imp.importText });
    }
  }
}

console.log(JSON.stringify(results, null, 2));
