const fs = require('fs');
const path = require('path');

// Check which files exist and which don't
const checkFiles = [
  'about.html',
  'contact.html', 
  'privacy.html',
  'terms.html',
  'disclaimer.html',
  'manifest.json'
];

console.log('🔍 Checking for missing files...');

const missingFiles = [];
checkFiles.forEach(file => {
  if (!fs.existsSync(path.join(__dirname, file))) {
    missingFiles.push(file);
    console.log(`❌ Missing: ${file}`);
  } else {
    console.log(`✅ Exists: ${file}`);
  }
});

// Create missing essential files
if (missingFiles.includes('manifest.json')) {
  const manifest = {
    "name": "Money Advise Hub",
    "short_name": "MoneyAdvise",
    "description": "Smart Financial Insights. Smarter Decisions.",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#667eea",
    "theme_color": "#667eea",
    "icons": [
      {
        "src": "assets/images/placeholder.svg",
        "sizes": "192x192",
        "type": "image/svg+xml"
      }
    ]
  };
  fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
  console.log('✅ Created manifest.json');
}

console.log('🎉 Link fixing complete!');