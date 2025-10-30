# Money Advise Hub API

## Content Upload API

### Endpoint
`POST /api/upload-content.php`

### Authentication
```
Authorization: Bearer mah-api-key-2025
```

### Request Body
```json
{
  "title": "Article Title",
  "content": "<p>HTML content here</p>",
  "category": "Finance",
  "source": "Source Name"
}
```

### Response
```json
{
  "success": true,
  "filename": "2025-01-15-article-title.html",
  "url": "https://moneyadvisehub.com/articles/2025-01-15-article-title.html"
}
```

## Google AI Studio Integration

### Setup
1. Get Google AI Studio API key
2. Replace `YOUR_GOOGLE_AI_API_KEY` in `ai-content-generator.js`
3. Run daily content generation

### Usage
```javascript
// Generate single article
const result = await generateFinancialContent('Best Credit Cards 2025', 'Finance');

// Auto-generate daily content
generateDailyContent();
```

### Automation
Set up cron job or scheduled task:
```bash
# Daily at 9 AM
0 9 * * * node /path/to/ai-content-generator.js
```

## Features
- ✅ Secure API with authentication
- ✅ Auto-generates HTML articles
- ✅ SEO-optimized content
- ✅ Google AI Studio integration
- ✅ Daily content automation
- ✅ USA financial focus