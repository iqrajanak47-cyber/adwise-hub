const API_KEY = 'AIzaSyBGBvisMUklr_swayUPHV-n4VJL-eK-ZLU';

async function listModels() {

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);

    if (response.ok) {
      const data = await response.json();

      data.models.forEach(model => {
        `);
      });
    } else {

      const text = await response.text();

    }

  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

listModels();