// Simplified content generator for Money Advise Hub
const { generateDailyContentWithAI } = require('./google-ai-integration.js');

async function generateAndPublish() {
  console.log('🚀 Starting daily content generation...');
  
  try {
    const result = await generateDailyContentWithAI();
    
    if (result && result.success) {
      console.log(`✅ Content published successfully: ${result.url}`);
      console.log(`📄 Title: ${result.title}`);
    } else {
      console.log('⚠️ Using fallback content generation');
      
      // Manual fallback content creation
      const topics = [
        'Best Personal Loans for Americans 2025',
        'Top Credit Cards with No Annual Fee',
        'Cheapest Auto Insurance by State',
        'High Yield Savings Account Comparison',
        'Mortgage Rates This Week'
      ];
      
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      console.log(`📝 Generated topic: ${randomTopic}`);
    }
    
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
  }
}

// Run the generator
generateAndPublish();