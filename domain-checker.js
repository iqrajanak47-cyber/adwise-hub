// Domain status checker
const https = require('https');
const dns = require('dns');

console.log('🔍 CHECKING DOMAIN STATUS...\n');

// Check DNS resolution
function checkDNS() {
    console.log('📡 DNS CHECK:');
    
    dns.lookup('moneyadvisehub.com', (err, address) => {
        if (err) {
            console.log('❌ moneyadvisehub.com - DNS not resolved');
            console.log(`   Error: ${err.code}`);
        } else {
            console.log(`✅ moneyadvisehub.com resolves to: ${address}`);
        }
    });
    
    dns.lookup('www.moneyadvisehub.com', (err, address) => {
        if (err) {
            console.log('❌ www.moneyadvisehub.com - DNS not resolved');
            console.log(`   Error: ${err.code}`);
        } else {
            console.log(`✅ www.moneyadvisehub.com resolves to: ${address}`);
        }
    });
}

// Check HTTP response
function checkHTTP() {
    console.log('\n🌐 HTTP CHECK:');
    
    const domains = [
        'https://moneyadvisehub.com',
        'https://www.moneyadvisehub.com',
        'https://adwise-oylki82ud-iqrajans-projects.vercel.app'
    ];
    
    domains.forEach(url => {
        https.get(url, (res) => {
            console.log(`✅ ${url} - Status: ${res.statusCode}`);
        }).on('error', (err) => {
            console.log(`❌ ${url} - Error: ${err.code}`);
        });
    });
}

// Run checks
setTimeout(() => {
    checkDNS();
    setTimeout(checkHTTP, 2000);
}, 1000);