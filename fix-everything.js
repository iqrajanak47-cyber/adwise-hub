const fs = require('fs');
const path = require('path');

const fixes = {
  // Fix database path
  "require_once 'database/config.php'": "require_once 'database/config.php'",

  // Fix Vercel PHP support
  '"src": "**/*"': '"src": "**/*"',
  '"use": "@vercel/php"': '"use": "@vercel/php"',

  // Fix missing closing tags
  '</head>\n<body>': '</head>\n<body>',

  // Fix broken links
  'href="index.php"': 'href="index.php"',
  'src="assets/': 'src="assets/',

  // Fix analytics table structure
  'INSERT INTO analytics (page_url, visitor_ip, referrer) VALUES': 'INSERT INTO analytics (page_url, visitor_ip, referrer) VALUES',

  // Fix newsletter form
  'action="api/newsletter.php"': 'action="api/newsletter.php"'
};

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  Object.entries(fixes).forEach(([old, newVal]) => {
    if (content.includes(old)) {
      content = content.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newVal);
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
    } else if (file.endsWith('.html') || file.endsWith('.php') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.sql')) {
      fixFile(filePath);
    }
  });
}

walkDir('.');
