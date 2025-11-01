// Simplified content generator for Money Advise Hub
const { generateDailyContentWithAI } = require('./google-ai-integration.js');

async function generateAndPublish() {

  try {
    const result = await generateDailyContentWithAI();

    if (result && result.success) {

    } else {

      // Manual fallback content creation
      const topics = [
        'Best Personal Loans for Americans 2025',
        'Top Credit Cards with No Annual Fee',
        'Cheapest Auto Insurance by State',
        'High Yield Savings Account Comparison',
        'Mortgage Rates This Week'
      ];

      const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    }

  } catch (error) {
    console.error('❌ Generation failed:', error.message);
  }
}

// Run the generator
generateAndPublish();