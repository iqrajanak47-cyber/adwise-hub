const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('AdWise')) {
    content = content.replace(/AdWise/g, 'Advise');
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${filePath}`);
  }
}

const files = [
  'index.html', 'posts.html', 'about.html', 'contact.html', 'privacy.html', 'terms.html', 'disclaimer.html',
  'articles/insurance.html', 'articles/loans.html', 'articles/mortgage.html', 'articles/health.html', 'articles/hosting.html', 'articles/legal.html',
  'articles/car-insurance-2025.html', 'articles/investment-apps-beginners.html', 'articles/mortgage-refinancing-complete-guide.html',
  'reviews/insurance-reviews.html', 'reviews/hosting-reviews.html', 'compare/insurance-compare.html', 'compare/hosting-compare.html',
  'tools/calculators.html', 'tools/mortgage-calculator.html', 'tools/emi-calculator.html'
];

files.forEach(file => fixFile(file));
console.log('🎉 AdWise → Advise complete!');