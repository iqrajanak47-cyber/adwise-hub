// Test Google AI API key
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_KEY = 'AIzaSyBGBvisMUklr_swayUPHV-n4VJL-eK-ZLU';

async function testAPI() {
    console.log('🔑 Testing Google AI API key...');
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: 'Write a short paragraph about personal finance.' }]
                }]
            })
        });

        console.log('Response status:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            if (data.candidates && data.candidates[0]) {
                console.log('✅ API Key Working!');
                console.log('Generated content:', data.candidates[0].content.parts[0].text.substring(0, 200) + '...');
            }
        } else {
            const error = await response.text();
            console.log('❌ API Error:', error);
        }
        
    } catch (error) {
        console.error('❌ Request failed:', error.message);
    }
}

testAPI();