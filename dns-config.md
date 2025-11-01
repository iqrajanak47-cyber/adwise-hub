# DNS Configuration for moneyadvisehub.com

## Current Issue
- Domain: moneyadvisehub.com
- Status: ERR_FAILED (DNS not pointing to Vercel)
- Working URL: https://moneyadvisehub.com/

## Required DNS Records

### Cloudflare DNS Records (Recommended)
```
Type: CNAME
Name: www
Value: advise-oylki82ud-iqrajans-projects.vercel.app
Proxy: ON (Orange Cloud)
TTL: Auto

Type: CNAME  
Name: @
Value: advise-oylki82ud-iqrajans-projects.vercel.app
Proxy: ON (Orange Cloud)
TTL: Auto
```

### Option 2: A Records
```
Type: A
Name: @
Value: 76.76.19.61
TTL: 300

Type: A
Name: www
Value: 76.76.19.61
TTL: 300
```

## Vercel Domain Setup
1. Go to Vercel Dashboard
2. Select your project: advise-hub
3. Go to Settings > Domains
4. Add domain: moneyadvisehub.com
5. Add domain: www.moneyadvisehub.com
6. Copy the DNS records provided by Vercel

## Domain Registrar Settings
Configure these records in your domain registrar's DNS panel:
- GoDaddy, Namecheap, Cloudflare, etc.

## Verification
After DNS propagation (24-48 hours):
- https://moneyadvisehub.com → Working
- https://www.moneyadvisehub.com → Working