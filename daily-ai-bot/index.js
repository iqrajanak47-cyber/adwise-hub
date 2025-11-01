// Daily AI Bot for Money Advise Hub
require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_KEY = process.env.GOOGLE_AI_API_KEY;
const WEBSITE_URL = process.env.WEBSITE_URL;
const API_ENDPOINT = process.env.API_ENDPOINT;

// Financial topics for daily posts
const topics = [
    'Best Credit Cards for Americans 2025',
    'Personal Loan Rates This Week',
    'Cheapest Car Insurance by State',
    'High Yield Savings Accounts',
    'Investment Apps for Beginners',
    'Mortgage Refinancing Guide',
    'Small Business Loan Options',
    'Tax Deductions You Can Claim',
    'Retirement Planning in Your 30s',
    'Emergency Fund Calculator',
    'Best Online Banks 2025',
    'Cryptocurrency Investment Guide',
    'Home Insurance Shopping Tips',
    'Student Loan Forgiveness Programs',
    'Side Hustle Ideas for Extra Income'
];

// Generate content with Google AI
async function generateContent(topic) {
    const prompt = `Write a comprehensive financial article for US residents about "${topic}".

Requirements:
- 800-1200 words
- SEO optimized with H2 and H3 headings
- Include practical advice and current market data
- Add a call-to-action section
- Focus on USA financial regulations and products
- Use HTML formatting with proper tags
- Include bullet points and numbered lists where appropriate

Target Audience: US residents seeking financial advice
Format the response as clean HTML content ready for publication.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048}
            })
        });

        if (!response.ok) {
            throw new Error(`AI API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('No content generated');
        }

    } catch (error) {
        console.error('AI generation failed:', error);

        // Fallback content
        return `
            <h2>Understanding ${topic}</h2>
            <p>This comprehensive guide covers everything US residents need to know about ${topic.toLowerCase()}.</p>

            <h3>Key Benefits</h3>
            <ul>
                <li>Competitive rates and terms available in the US market</li>
                <li>Flexible qualification requirements for American consumers</li>
                <li>Quick approval processes with major US providers</li>
                <li>Excellent customer service and support</li>
            </ul>

            <h3>How to Get Started</h3>
            <p>Follow these steps to find the best ${topic.toLowerCase()} options for your needs:</p>
            <ol>
                <li>Compare rates from multiple US providers</li>
                <li>Check your credit score and financial standing</li>
                <li>Read reviews and customer testimonials</li>
                <li>Apply with your preferred provider</li>
            </ol>

            <div class="cta-box">
                <h3>Ready to Take Action?</h3>
                <p>Compare your options and find the best ${topic.toLowerCase()} solution for your financial needs today.</p>
            </div>
        `;
    }
}

// Upload content to website
async function uploadContent(title, content, category) {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify({
                title: title,
                content: content,
                category: category,
                source: 'Daily AI Bot'
            })
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Upload failed:', error);
        return { success: false, error: error.message };
    }
}

// Main function to generate daily post
async function generateDailyPost() {

    .toLocaleDateString()}`);

    // Select topic based on day of year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const selectedTopic = topics[dayOfYear % topics.length];

    // Generate content

    const content = await generateContent(selectedTopic);

    // Determine category
    const category = selectedTopic.includes('Credit Card') ? 'Finance' :
                    selectedTopic.includes('Insurance') ? 'Insurance' :
                    selectedTopic.includes('Loan') ? 'Loans' :
                    selectedTopic.includes('Investment') ? 'Investing' :
                    selectedTopic.includes('Mortgage') ? 'Real Estate' : 'Finance';

    // Save content locally (since upload API may not be ready)

    const fs = require('fs');
    const fileName = `post-${new Date().toISOString().split('T')[0]}.html`;

    const fullContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${selectedTopic} - Money Advise Hub</title>
</head>
<body>
    <h1>${selectedTopic}</h1>
    ${content}
    <p><em>Generated by AI Bot on ${new Date().toLocaleDateString()}</em></p>
</body>
</html>`;

    fs.writeFileSync(fileName, fullContent);

    // Try to upload (optional)
    try {
        const result = await uploadContent(selectedTopic, content, category);
        if (result.success) {

        }
    } catch (error) {
        ');
    }

}

// Run the bot
generateDailyPost();