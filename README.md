# AdWise Hub - Static Website

This static site skeleton includes SEO-ready pages, AdSense placeholders, comparison tables and review templates. Replace `ca-pub-xxxxxxxxxxxxxxxx` with your AdSense Publisher ID and deploy to Firebase Hosting, Netlify, or Vercel.

## 🚀 Quick Start (Local Development)

1. **Start XAMPP** and ensure Apache is running
2. **Run the batch file**: Double-click `start-server.bat`
3. **Or manually visit**: http://localhost/adwise-hub/

### 📄 Available URLs:
- **Server Info**: http://localhost/adwise-hub/server-info.php
- **Main Site**: http://localhost/adwise-hub/
- **Homepage**: http://localhost/adwise-hub/index.html

## 🌐 Steps to deploy
1. Replace `localhost/adwise-hub` with your real domain in files and update images.
2. Replace AdSense client & ad-slot IDs (currently using placeholder: `ca-pub-1234567890123456`).
3. Host on Netlify / Vercel / Firebase Hosting.
4. Submit sitemap to Google Search Console and request indexing.

## 📁 Project Structure
```
adwise-hub/
├── index.html              # Main homepage
├── server-info.php         # Local dev server info
├── start-server.bat        # Quick start script
├── articles/               # Article pages
├── reviews/                # Review pages  
├── compare/                # Comparison pages
├── tools/                  # Calculator tools
└── assets/                 # CSS, JS, images
```