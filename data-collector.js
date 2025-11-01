// Data collector for Money Advice Hub UK
const https = require('https');
const fs = require('fs');

const targetUrl = 'https://www.moneyadvicehub.org.uk/';

function collectData() {

    https.get(targetUrl, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            // Extract key information
            const pageData = {
                title: extractTitle(data),
                navigation: extractNavigation(data),
                categories: extractCategories(data),
                articles: extractArticles(data),
                structure: extractStructure(data),
                timestamp: new Date().toISOString()
            };

            // Save collected data
            fs.writeFileSync('collected-data.json', JSON.stringify(pageData, null, 2));

            // Generate insights
            generateInsights(pageData);
        });

    }).on('error', (err) => {
        console.error('❌ Error collecting data:', err.message);
    });
}

function extractTitle(html) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return titleMatch ? titleMatch[1].trim() : 'Not found';
}

function extractNavigation(html) {
    const navMatches = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/gi) || [];
    return navMatches.map(nav => {
        const links = nav.match(/<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a>/gi) || [];
        return links.map(link => {
            const match = link.match(/<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a>/i);
            return match ? { url: match[1], text: match[2].trim() } : null;
        }).filter(Boolean);
    });
}

function extractCategories(html) {
    const categories = [];
    const categoryMatches = html.match(/category|section|topic/gi) || [];
    return [...new Set(categoryMatches)];
}

function extractArticles(html) {
    const articles = [];
    const articleMatches = html.match(/<article[^>]*>[\s\S]*?<\/article>/gi) || [];

    articleMatches.forEach(article => {
        const titleMatch = article.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/i);
        const linkMatch = article.match(/<a[^>]*href="([^"]*)"[^>]*>/i);

        if (titleMatch) {
            articles.push({
                title: titleMatch[1].trim(),
                url: linkMatch ? linkMatch[1] : null
            });
        }
    });

    return articles;
}

function extractStructure(html) {
    return {
        hasHeader: html.includes('<header'),
        hasFooter: html.includes('<footer'),
        hasNav: html.includes('<nav'),
        hasSidebar: html.includes('sidebar') || html.includes('aside'),
        hasArticles: html.includes('<article'),
        responsive: html.includes('viewport') || html.includes('responsive')
    };
}

function generateInsights(data) {
    const insights = {
        siteAnalysis: {
            title: data.title,
            navigationItems: data.navigation.flat().length,
            articleCount: data.articles.length,
            isResponsive: data.structure.responsive,
            hasModernStructure: data.structure.hasHeader && data.structure.hasFooter
        },
        recommendations: [
            'Analyze navigation structure for UX improvements',
            'Study article categorization methods',
            'Review responsive design implementation',
            'Examine content organization patterns'
        ],
        collectedAt: data.timestamp
    };

    fs.writeFileSync('site-insights.json', JSON.stringify(insights, null, 2));

    // Display summary

}

// Run collection
collectData();