const fs = require('fs');
const path = require('path');

const fixes = {
  'G-511130452': 'G-XW1ZYER79Q',
  'ca-pub-1234567890123456': 'ca-pub-6914004429115810',
  'localhost/advise-hub': 'moneyadvisehub.com',
  'https://moneyadvisehub.com': 'https://moneyadvisehub.com',
  'Advise Hub': 'Money Advise Hub',
  'advise-oylki82ud-iqrajans-projects.vercel.app': 'moneyadvisehub.com',
  'www.yourdomain.com': 'moneyadvisehub.com'
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
    console.log(`✅ Fixed: ${filePath}`);
  }
}

// Fix all HTML files
const files = [
  'index.php', 'posts.html', 'about.html', 'contact.html', 'privacy.html', 'terms.html', 'disclaimer.html',
  'articles/insurance.html', 'articles/loans.html', 'articles/mortgage.html', 'articles/health.html', 'articles/hosting.html', 'articles/legal.html',
  'articles/car-insurance-2025.html', 'articles/investment-apps-beginners.html', 'articles/mortgage-refinancing-complete-guide.html',
  'reviews/insurance-reviews.html', 'reviews/hosting-reviews.html', 'compare/insurance-compare.html', 'compare/hosting-compare.html',
  'tools/calculators.html', 'tools/mortgage-calculator.html', 'tools/emi-calculator.html'
];

files.forEach(file => fixFile(file));
console.log('🎉 All errors fixed!');