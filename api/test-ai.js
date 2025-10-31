const { testGoogleAI, generateDailyContentWithAI } = require('./google-ai-integration.js');

async function runTest() {
  console.log('🧪 Testing Google AI content generation...');
  
  try {
    const content = await testGoogleAI();
    console.log('✅ AI test successful!');
    console.log('Content length:', content.length, 'characters');
    
    console.log('\n🚀 Generating daily content...');
    const result = await generateDailyContentWithAI();
    
    if (result) {
      console.log('✅ Daily content generated and published!');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runTest();