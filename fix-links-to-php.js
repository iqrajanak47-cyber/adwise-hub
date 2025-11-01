const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace all index.php references with index.php
  if (content.includes('index.php')) {
    content = content.replace(/index\.html/g, 'index.php');
    changed = true;
  }

  // Replace href="index.php" with href="index.php"
  if (content.includes('href="index.php"')) {
    content = content.replace(/href="\.\.\/"/g, 'href="index.php"');
    changed = true;
  }

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
    } else if (file.endsWith('.html') || file.endsWith('.php') || file.endsWith('.js')) {
      fixFile(filePath);
    }
  });
}

walkDir('.');
