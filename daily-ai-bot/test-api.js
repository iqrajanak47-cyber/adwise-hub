// Test Google AI API key
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_KEY = 'AIzaSyBGBvisMUklr_swayUPHV-n4VJL-eK-ZLU';

async function testAPI() {

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

        if (response.ok) {
            const data = await response.json();
            if (data.candidates && data.candidates[0]) {

                 + '...');
            }
        } else {
            const error = await response.text();

        }

    } catch (error) {
        console.error('❌ Request failed:', error.message);
    }
}

testAPI();