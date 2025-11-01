const fs = require('fs');
const path = require('path');

const linkFixes = {
  // Old Vercel URLs to new domain
  'https://moneyadvisehub.com': 'https://moneyadvisehub.com',
  'https://moneyadvisehub.com': 'https://moneyadvisehub.com',
  'https://moneyadvisehub.com': 'https://moneyadvisehub.com',
  'https://moneyadvisehub.com': 'https://moneyadvisehub.com',
  'https://moneyadvisehub.com': 'https://moneyadvisehub.com',

  // Affiliate links (examples - replace with real ones)
  'https://bluehost.com/track/moneyadvisehub': 'https://bluehost.com/track/moneyadvisehub',
  'https://siteground.com/go/moneyadvisehub': 'https://siteground.com/go/moneyadvisehub',
  'https://a2hosting.com/refer/moneyadvisehub': 'https://a2hosting.com/refer/moneyadvisehub',
  'https://northwesternmutual.com/go/moneyadvisehub': 'https://northwesternmutual.com/go/moneyadvisehub',
  'https://statefarm.com/go/moneyadvisehub': 'https://statefarm.com/go/moneyadvisehub',
  'https://newyorklife.com/go/moneyadvisehub': 'https://newyorklife.com/go/moneyadvisehub',

  // Social media
  '@moneyadvisehub': '@moneyadvisehub',
  '@moneyadvisehub': '@moneyadvisehub'
};

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  Object.entries(linkFixes).forEach(([old, newVal]) => {
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
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.md') || file.endsWith('.json') || file.endsWith('.php')) {
      fixFile(filePath);
    }
  });
}

walkDir('.');
