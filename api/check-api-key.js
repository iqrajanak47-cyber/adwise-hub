const API_KEY = 'AIzaSyBGBvisMUklr_swayUPHV-n4VJL-eK-ZLU';

async function checkAPIKey() {

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

    ));

    const text = await response.text();
    );

    if (response.ok) {

    } else {

    }

  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

checkAPIKey();