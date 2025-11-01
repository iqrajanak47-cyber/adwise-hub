// Domain status checker
const https = require('https');
const dns = require('dns');

// Check DNS resolution
function checkDNS() {

    dns.lookup('moneyadvisehub.com', (err, address) => {
        if (err) {

        } else {

        }
    });

    dns.lookup('www.moneyadvisehub.com', (err, address) => {
        if (err) {

        } else {

        }
    });
}

// Check HTTP response
function checkHTTP() {

    const domains = [
        'https://moneyadvisehub.com',
        'https://www.moneyadvisehub.com',
        'https://moneyadvisehub.com'
    ];

    domains.forEach(url => {
        https.get(url, (res) => {

        }).on('error', (err) => {

        });
    });
}

// Run checks
setTimeout(() => {
    checkDNS();
    setTimeout(checkHTTP, 2000);
}, 1000);