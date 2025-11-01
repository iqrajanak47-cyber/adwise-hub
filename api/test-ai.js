const { testGoogleAI, generateDailyContentWithAI } = require('./google-ai-integration.js');

async function runTest() {

  try {
    const content = await testGoogleAI();

    const result = await generateDailyContentWithAI();

    if (result) {

    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runTest();