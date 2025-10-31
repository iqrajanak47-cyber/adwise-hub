// Daily 10 Posts Auto Generator
const API_ENDPOINT = 'https://adwise-oylki82ud-iqrajans-projects.vercel.app/api/upload-content.php';
const API_KEY = 'mah-api-key-2025';

// 100+ Financial Topics Pool
const topicPool = [
  // Credit Cards
  'Best Cashback Credit Cards 2025', 'Low Interest Credit Cards for Bad Credit', 'Travel Rewards Credit Cards Comparison',
  'Business Credit Cards with No Annual Fee', 'Student Credit Cards for Building Credit', 'Secured Credit Cards Guide',
  
  // Loans
  'Personal Loan Rates This Week', 'Bad Credit Loan Options', 'Home Equity Loan vs HELOC',
  'Auto Loan Refinancing Guide', 'Student Loan Forgiveness Programs', 'Payday Loan Alternatives',
  
  // Insurance
  'Cheapest Car Insurance by State', 'Health Insurance Open Enrollment', 'Life Insurance for Young Adults',
  'Home Insurance Coverage Guide', 'Disability Insurance Explained', 'Pet Insurance Worth It',
  
  // Investing
  'Best Investment Apps 2025', 'Retirement Planning in Your 30s', 'Index Fund vs ETF Comparison',
  'Real Estate Investment Trusts', 'Cryptocurrency for Beginners', 'Dollar Cost Averaging Strategy',
  
  // Banking
  'High Yield Savings Accounts', 'Best Online Banks 2025', 'CD Rates Comparison',
  'Checking Account Fees to Avoid', 'Mobile Banking Security Tips', 'Credit Union vs Bank',
  
  // Mortgages
  'Mortgage Rates Forecast 2025', 'First Time Home Buyer Programs', 'Refinancing Your Mortgage',
  'FHA vs Conventional Loans', 'Jumbo Loan Requirements', 'Reverse Mortgage Pros and Cons',
  
  // Budgeting
  '50/30/20 Budget Rule Explained', 'Emergency Fund Calculator', 'Debt Snowball vs Avalanche',
  'Side Hustle Ideas 2025', 'Passive Income Strategies', 'Money Saving Apps Review',
  
  // Taxes
  'Tax Deductions You Can Claim', 'IRA vs 401k Comparison', 'Tax Software Reviews',
  'Quarterly Tax Payment Guide', 'Tax Credits for Families', 'Self Employment Tax Tips',
  
  // Business Finance
  'Small Business Loan Options', 'Business Credit Card Benefits', 'LLC vs Corporation Taxes',
  'Invoice Factoring Explained', 'Equipment Financing Guide', 'Business Line of Credit',
  
  // Financial Planning
  'Financial Goals for 2025', 'Estate Planning Basics', 'College Savings Plans',
  'Retirement Withdrawal Strategies', 'Financial Advisor vs Robo Advisor', 'Net Worth Calculation'
];

const categories = ['Finance', 'Insurance', 'Loans', 'Investing', 'Banking', 'Real Estate', 'Business'];

// Generate content using AI (placeholder for Google AI Studio)
async function generateAIContent(topic, category) {
  // Simulate AI content generation
  const templates = {
    intro: `<h2>Introduction</h2><p>Understanding ${topic.toLowerCase()} is crucial for US residents looking to make smart financial decisions in 2025.</p>`,
    main: `<h3>Key Benefits</h3><p>Here are the main advantages and considerations for ${topic.toLowerCase()}:</p><ul><li>Competitive rates and terms</li><li>Flexible qualification requirements</li><li>Quick approval process</li><li>Excellent customer service</li></ul>`,
    comparison: `<h3>Top Options Comparison</h3><p>We've analyzed the leading providers to help you choose the best option for your needs.</p>`,
    cta: `<div class="cta-box"><h3>Ready to Get Started?</h3><p>Compare your options and apply today to secure the best rates available.</p></div>`
  };
  
  return templates.intro + templates.main + templates.comparison + templates.cta;
}

// Upload single article
async function uploadArticle(title, category) {
  try {
    const content = await generateAIContent(title, category);
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        title: title,
        content: content,
        category: category,
        source: 'AI Financial Research'
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log(`✅ Created: ${result.url}`);
      return result;
    } else {
      console.error(`❌ Failed: ${result.error}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

// Generate 10 daily posts
async function generateDailyPosts() {
  console.log(`🚀 Starting daily content generation: ${new Date().toISOString()}`);
  
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  
  const results = [];
  
  for (let i = 0; i < 10; i++) {
    // Select topic based on day and post number to ensure variety
    const topicIndex = (dayOfYear * 10 + i) % topicPool.length;
    const topic = topicPool[topicIndex];
    const category = categories[i % categories.length];
    
    console.log(`📝 Generating post ${i + 1}/10: ${topic}`);
    
    const result = await uploadArticle(topic, category);
    if (result) {
      results.push(result);
    }
    
    // Wait 2 seconds between posts to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`✅ Daily generation complete: ${results.length}/10 posts created`);
  return results;
}

// Run forever with daily schedule
async function runForever() {
  console.log('🔄 Starting infinite daily post generator...');
  
  while (true) {
    try {
      await generateDailyPosts();
      
      // Wait 24 hours (86400000 ms) before next batch
      console.log('⏰ Waiting 24 hours for next batch...');
      await new Promise(resolve => setTimeout(resolve, 86400000));
      
    } catch (error) {
      console.error('❌ Daily generation failed:', error);
      // Wait 1 hour before retry on error
      await new Promise(resolve => setTimeout(resolve, 3600000));
    }
  }
}

// Export functions
if (typeof module !== 'undefined') {
  module.exports = { generateDailyPosts, runForever, uploadArticle };
}

// Auto-start if run directly
if (typeof window === 'undefined' && require.main === module) {
  runForever();
}