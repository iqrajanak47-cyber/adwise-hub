const fs = require('fs');
const path = require('path');

// Clean up duplicate/broken code patterns
const cleanups = {
  // Remove duplicate scripts
  '<script src="assets/js/main.js"></script>\\s*<script src="assets/js/main.js" defer></script>': '<script src="assets/js/main.js" defer></script>',

  // Fix malformed HTML
  '</span></div>\\s*</span></div>': '</div>',
  '<p>.*?</span></div>': '<p>',

  // Remove empty elements
  '<div class="[^"]*">\\s*</div>': '',
  '<p>\\s*</p>': '',

  // Fix CSS syntax
  'color:https://[^;]*;': 'color:#333;',
  'background:https://[^;]*;': 'background:#f5f5f5;',

  // Clean up broken links
  'href="https://moneyadvisehub.com/': 'href="https://moneyadvisehub.com/',
  'src="assets/': 'src="assets/',

  // Fix PHP syntax
  '<?php\\s*<?php': '<?php',
  '?>\\s*?>': '?>',

  // Remove debug code
  'console.log\\([^)]*\\);?': '',
  'var_dump\\([^)]*\\);?': '',

  // Fix JSON syntax
  ',\\s*}': '}',
  ',\\s*]': ']'
};

function cleanFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  Object.entries(cleanups).forEach(([pattern, replacement]) => {
    const regex = new RegExp(pattern, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      changed = true;
    }
  });

  // Remove extra whitespace
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  content = content.replace(/[ \t]+$/gm, '');

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
    } else if (file.endsWith('.html') || file.endsWith('.php') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.json')) {
      cleanFile(filePath);
    }
  });
}

walkDir('.');
