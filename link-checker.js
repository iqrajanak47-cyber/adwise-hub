// Comprehensive link checker for Money Advise Hub
const https = require('https');
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://moneyadvisehub.com';
const checkedUrls = new Set();
const brokenLinks = [];
const workingLinks = [];

// Check if URL is accessible
function checkUrl(url) {
    return new Promise((resolve) => {
        if (checkedUrls.has(url)) {
            resolve({ url, status: 'already-checked' });
            return;
        }

        checkedUrls.add(url);

        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || 443,
            path: urlObj.pathname + urlObj.search,
            method: 'HEAD',
            timeout: 5000
        };

        const req = https.request(options, (res) => {
            const status = res.statusCode;
            if (status >= 200 && status < 400) {
                workingLinks.push({ url, status });
                resolve({ url, status: 'working', code: status });
            } else {
                brokenLinks.push({ url, status });
                resolve({ url, status: 'broken', code: status });
            }
        });

        req.on('error', () => {
            brokenLinks.push({ url, status: 'error' });
            resolve({ url, status: 'error' });
        });

        req.on('timeout', () => {
            brokenLinks.push({ url, status: 'timeout' });
            resolve({ url, status: 'timeout' });
        });

        req.end();
    });
}

// Extract links from HTML files
function extractLinks(filePath) {
    if (!fs.existsSync(filePath)) return [];

    const content = fs.readFileSync(filePath, 'utf8');
    const links = [];

    // Extract href attributes
    const hrefRegex = /href=["']([^"']+)["']/g;
    let match;
    while ((match = hrefRegex.exec(content)) !== null) {
        let url = match[1];

        // Skip anchors, javascript, mailto, tel
        if (url.startsWith('#') || url.startsWith('javascript:') ||
            url.startsWith('mailto:') || url.startsWith('tel:')) continue;

        // Convert relative URLs to absolute
        if (url.startsWith('/')) {
            url = baseUrl + url;
        } else if (!url.startsWith('http')) {
            url = baseUrl + '/' + url;
        }

        links.push({ url, file: filePath });
    }

    return links;
}

// Main function
async function checkAllLinks() {

    // Files to check
    const filesToCheck = [
        'index.php',
        'posts.html',
        'about.html',
        'contact.html',
        'privacy.html',
        'terms.html',
        'disclaimer.html'
    ];

    const allLinks = [];

    // Extract links from all files
    filesToCheck.forEach(file => {
        if (fs.existsSync(file)) {
            const links = extractLinks(file);
            allLinks.push(...links);

        }
    });

    // Check all links
    const results = [];
    for (const link of allLinks) {
        const result = await checkUrl(link.url);
        results.push({ ...result, file: link.file });

        if (result.status === 'working') {

        } else if (result.status === 'broken') {
            `);
        } else if (result.status === 'error') {
            `);
        }
    }

    // Generate report

    if (brokenLinks.length > 0) {

        brokenLinks.forEach(link => {
            `);
        });
    }

    // Save report
    const report = {
        timestamp: new Date().toISOString(),
        total: allLinks.length,
        working: workingLinks.length,
        broken: brokenLinks.length,
        brokenLinks: brokenLinks,
        workingLinks: workingLinks
    };

    fs.writeFileSync('link-check-report.json', JSON.stringify(report, null, 2));

}

checkAllLinks();