@echo off
echo 🌐 DNS Configuration Helper for moneyadvisehub.com
echo.
echo Current Status: DOMAIN NOT WORKING
echo Working URL: https://adwise-oylki82ud-iqrajans-projects.vercel.app/
echo.
echo 🔧 DNS RECORDS NEEDED:
echo.
echo CNAME Records (Add these to your domain registrar):
echo ================================================
echo Type: CNAME
echo Name: www
echo Value: cname.vercel-dns.com
echo TTL: 300
echo.
echo Type: CNAME
echo Name: @
echo Value: cname.vercel-dns.com  
echo TTL: 300
echo.
echo 📋 STEPS TO FIX:
echo 1. Login to your domain registrar (GoDaddy, Namecheap, etc.)
echo 2. Go to DNS Management
echo 3. Add the CNAME records above
echo 4. Wait 24-48 hours for DNS propagation
echo.
echo 🚀 VERCEL SETUP:
echo 1. Go to https://vercel.com/dashboard
echo 2. Select your project
echo 3. Go to Settings ^> Domains
echo 4. Add: moneyadvisehub.com
echo 5. Add: www.moneyadvisehub.com
echo.
pause