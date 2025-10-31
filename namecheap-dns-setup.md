# Namecheap DNS Setup for moneyadvisehub.com

## Step-by-Step Instructions

### 1. Login to Namecheap
- Go to https://www.namecheap.com/
- Click "Sign In"
- Enter your credentials

### 2. Access Domain Management
- Click "Domain List" in left sidebar
- Find `moneyadvisehub.com`
- Click "Manage" button

### 3. Configure DNS Records
- Click "Advanced DNS" tab
- Delete existing A/CNAME records if any
- Add these records:

```
Type: CNAME Record
Host: www
Value: adwise-oylki82ud-iqrajans-projects.vercel.app
TTL: Automatic

Type: CNAME Record  
Host: @
Value: adwise-oylki82ud-iqrajans-projects.vercel.app
TTL: Automatic
```

### 4. Save Changes
- Click "Save all changes"
- Wait for green confirmation message

### 5. Verify Settings
Your DNS records should look like:
- www CNAME adwise-oylki82ud-iqrajans-projects.vercel.app
- @ CNAME adwise-oylki82ud-iqrajans-projects.vercel.app

### 6. Add to Vercel
- Go to https://vercel.com/dashboard
- Select your project
- Settings → Domains
- Add: moneyadvisehub.com
- Add: www.moneyadvisehub.com

### 7. Wait for Propagation
- DNS changes: 30 minutes to 48 hours
- Check: https://dnschecker.org/

## Troubleshooting
- If "Host @ not allowed", use your domain name instead
- Remove any existing A records
- Ensure TTL is set to Automatic or 300