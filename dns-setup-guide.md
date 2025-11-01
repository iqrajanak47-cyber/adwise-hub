# DNS Configuration Guide for moneyadvisehub.com

## Step 1: Find Your Domain Registrar
Check where you bought `moneyadvisehub.com`:
- GoDaddy
- Namecheap  
- Google Domains
- Cloudflare
- Other registrar

## Step 2: Login to Domain Control Panel
1. Go to your registrar's website
2. Login to your account
3. Find "DNS Management" or "Domain Settings"

## Step 3: Add DNS Records

### Option A: Direct to Vercel (Simple)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### Option B: Through Cloudflare (Recommended)
```
Type: CNAME
Name: www
Value: advise-oylki82ud-iqrajans-projects.vercel.app
Proxy: ON (Orange Cloud)

Type: CNAME
Name: @
Value: advise-oylki82ud-iqrajans-projects.vercel.app
Proxy: ON (Orange Cloud)
```

## Step 4: Vercel Domain Setup
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Domains
4. Add: `moneyadvisehub.com`
5. Add: `www.moneyadvisehub.com`

## Step 5: Wait for Propagation
- DNS changes take 24-48 hours
- Check status: https://dnschecker.org/

## Quick Commands to Check:
```bash
nslookup moneyadvisehub.com
dig moneyadvisehub.com
```