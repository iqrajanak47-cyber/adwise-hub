const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Replace all variations
  const replacements = [
    [/Advise/g, 'Advise'],
    [/advise/g, 'advise'],
    [/ADVISE/g, 'ADVISE']
  ];
  
  replacements.forEach(([pattern, replacement]) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      walkDir(filePath);
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.md') || file.endsWith('.json') || file.endsWith('.php') || file.endsWith('.bat')) {
      replaceInFile(filePath);
    }
  });
}

walkDir('.');
console.log('🎉 All Advise → Advise replacements complete!');