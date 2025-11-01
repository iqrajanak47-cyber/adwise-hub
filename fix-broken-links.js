// Script to identify and fix broken links
const fs = require('fs');
const path = require('path');

// Map of broken links to correct links
const linkFixes = {
  // Missing affiliate-links.js file
  'assets/js/affiliate-links.js': 'assets/js/main.js',
  
  // Favicon files that don't exist
  '/favicon.ico': 'assets/images/placeholder.svg',
  '/apple-touch-icon.png': 'assets/images/placeholder.svg',
  '/favicon-32x32.png': 'assets/images/placeholder.svg',
  '/favicon-16x16.png': 'assets/images/placeholder.svg',
  
  // Missing OG image
  '/assets/images/og-image.jpg': 'assets/images/placeholder.svg',
  
  // Social media links (placeholder)
  '#': 'https://facebook.com/moneyadvisehub',
  
  // Missing manifest
  'manifest.json': '#'
};

// Files to check and fix
const filesToFix = [
  'index.php',
  'posts.html', 
  'posts-enhanced.html',
  'about.html',
  'contact.html',
  'privacy.html',
  'terms.html',
  'disclaimer.html'
];

console.log('🔧 Fixing broken links...');

filesToFix.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let fixed = false;
    
    Object.entries(linkFixes).forEach(([broken, correct]) => {
      if (content.includes(broken)) {
        content = content.replace(new RegExp(broken, 'g'), correct);
        fixed = true;
      }
    });
    
    if (fixed) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed links in ${file}`);
    }
  }
});

console.log('🎉 Link fixing complete!');