const fs = require('fs');
const path = require('path');

function cleanFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Fix common issues
  const fixes = [
    [/console\.log\([^)]*\);?/g, ''],
    [/\n\s*\n\s*\n/g, '\n\n'],
    [/[ \t]+$/gm, ''],
    [/href="https:\/\/moneyadvisehub\.com\/https:\/\/moneyadvisehub\.com\//g, 'href="https://moneyadvisehub.com/'],
    [/src="assets\/assets\//g, 'src="assets/'],
    [/,\s*}/g, '}'],
    [/,\s*]/g, ']']
  ];

  fixes.forEach(([pattern, replacement]) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content);

  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      walkDir(filePath);
    } else if (file.endsWith('.html') || file.endsWith('.php') || file.endsWith('.js') || file.endsWith('.json')) {
      cleanFile(filePath);
    }
  });
}

walkDir('.');
