const fs = require('fs');

// Critical CSS for above-the-fold content
const criticalCSS = `
:root{--bg:#667eea;--text:#2d3748;--accent:#e53e3e}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;color:var(--text);line-height:1.6}
.container{max-width:1200px;margin:0 auto;padding:0 15px}
.site-header{background:#1a202c;color:#fff;padding:15px 0}
.logo{font-weight:900;color:#fff;text-decoration:none;font-size:2rem}
.hero{padding:60px 0;text-align:center;background:#f7fafc}
.hero h1{font-size:3rem;margin-bottom:20px;font-weight:800}
@media(max-width:768px){.hero h1{font-size:2rem}}
`;

// Optimize index.html
let indexContent = fs.readFileSync('index.html', 'utf8');

// Add critical CSS inline and defer non-critical
indexContent = indexContent.replace(
  '<link rel="stylesheet" href="assets/css/style.css">',
  `<style>${criticalCSS}</style>
  <link rel="preload" href="assets/css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="assets/css/style.css"></noscript>`
);

// Add resource hints
indexContent = indexContent.replace(
  '<head>',
  `<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://pagead2.googlesyndication.com">
  <link rel="dns-prefetch" href="https://www.googletagmanager.com">`
);

// Defer non-critical JS
indexContent = indexContent.replace(
  /<script src="assets\/js\/([^"]+)"><\/script>/g,
  '<script src="assets/js/$1" defer></script>'
);

// Add lazy loading to images
indexContent = indexContent.replace(
  /<img src="/g,
  '<img loading="lazy" src="'
);

fs.writeFileSync('index.html', indexContent);

// Create optimized CSS
const optimizedCSS = fs.readFileSync('assets/css/style.css', 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
  .replace(/\s+/g, ' ') // Minify whitespace
  .trim();

fs.writeFileSync('assets/css/style.min.css', optimizedCSS);

console.log('✅ Core Web Vitals optimized!');