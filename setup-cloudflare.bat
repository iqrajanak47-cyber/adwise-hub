@echo off
echo ☁️ Cloudflare SSL Setup for moneyadvisehub.com
echo.
echo 🔧 STEP 1: Add Domain to Cloudflare
echo 1. Go to https://dash.cloudflare.com
echo 2. Click "Add a Site"
echo 3. Enter: moneyadvisehub.com
echo 4. Select Free plan
echo.
echo 🌐 STEP 2: DNS Records
echo Add these CNAME records in Cloudflare:
echo.
echo Type: CNAME
echo Name: www
echo Target: adwise-oylki82ud-iqrajans-projects.vercel.app
echo Proxy: ON (Orange Cloud)
echo.
echo Type: CNAME
echo Name: @
echo Target: adwise-oylki82ud-iqrajans-projects.vercel.app
echo Proxy: ON (Orange Cloud)
echo.
echo 🔒 STEP 3: SSL Settings
echo 1. Go to SSL/TLS tab
echo 2. Set to "Full (strict)"
echo 3. Enable "Always Use HTTPS"
echo.
echo 📋 STEP 4: Update Nameservers
echo Copy Cloudflare nameservers to your domain registrar
echo.
echo ⏱️ Wait 24-48 hours for propagation
echo.
pause