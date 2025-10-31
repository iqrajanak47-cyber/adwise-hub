const API_KEY = 'AIzaSyBGBvisMUklr_swayUPHV-n4VJL-eK-ZLU';

async function checkAPIKey() {
  console.log('🔑 Checking Google AI Studio API key...');
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: 'Hello, this is a test.' }]
        }]
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('Response body:', text.substring(0, 500));
    
    if (response.ok) {
      console.log('✅ API key is working!');
    } else {
      console.log('❌ API key issue - Status:', response.status);
    }
    
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

checkAPIKey();