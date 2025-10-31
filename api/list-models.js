const API_KEY = 'AIzaSyBGBvisMUklr_swayUPHV-n4VJL-eK-ZLU';

async function listModels() {
  console.log('📋 Listing available Google AI models...');
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Available models:');
      data.models.forEach(model => {
        console.log(`- ${model.name} (${model.displayName})`);
      });
    } else {
      console.log('❌ Failed to list models:', response.status);
      const text = await response.text();
      console.log(text);
    }
    
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

listModels();