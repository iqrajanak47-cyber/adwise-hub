const fs = require('fs');

// Validate critical files
const validations = [
  {
    file: 'index.php',
    checks: [
      'Money Advise Hub',
      'require_once',
      'DOCTYPE html',
      'meta charset'
    ]
  },
  {
    file: 'database/config.php',
    checks: [
      'PDO',
      'money_advise_hub',
      'localhost'
    ]
  },
  {
    file: 'vercel.json',
    checks: [
      'vercel-php',
      'index.php',
      'functions'
    ]
  }
];

let allValid = true;

validations.forEach(({file, checks}) => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const missing = checks.filter(check => !content.includes(check));
    
    if (missing.length === 0) {
      console.log(`✅ ${file} - Valid`);
    } else {
      console.log(`❌ ${file} - Missing: ${missing.join(', ')}`);
      allValid = false;
    }
  } else {
    console.log(`❌ ${file} - File not found`);
    allValid = false;
  }
});

console.log(allValid ? '🎉 All validations passed!' : '⚠️ Some issues found');
process.exit(allValid ? 0 : 1);