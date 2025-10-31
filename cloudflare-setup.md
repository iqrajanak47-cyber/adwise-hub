# Cloudflare SSL Setup for moneyadvisehub.com

## DNS Configuration (Cloudflare)
```
Type: CNAME
Name: www
Value: adwise-oylki82ud-iqrajans-projects.vercel.app
Proxy: ON (Orange Cloud)

Type: CNAME
Name: @
Value: adwise-oylki82ud-iqrajans-projects.vercel.app
Proxy: ON (Orange Cloud)
```

## SSL/TLS Settings
1. Go to Cloudflare Dashboard
2. Select domain: moneyadvisehub.com
3. SSL/TLS → Overview
4. Set to: **Full (strict)**

## Page Rules
```
Rule 1: http://moneyadvisehub.com/*
Setting: Always Use HTTPS

Rule 2: http://www.moneyadvisehub.com/*
Setting: Always Use HTTPS
```

## Security Settings
- Security Level: Medium
- Bot Fight Mode: ON
- Browser Integrity Check: ON
- Challenge Passage: 30 minutes

## Performance
- Auto Minify: HTML, CSS, JS
- Brotli: ON
- Early Hints: ON