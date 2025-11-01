@echo off
color 0A
echo ========================================
echo   Advise Hub - Newspaper Theme v2.0
echo ========================================
echo.
echo [1] Checking XAMPP status...
net start | find "Apache" >nul 2>nul
if %errorlevel%==0 (
    echo [✓] Apache is running
) else (
    echo [!] Apache not detected. Starting XAMPP...
    if exist "C:\xampp\xampp_start.exe" (
        start "" "C:\xampp\xampp_start.exe"
        timeout /t 5 /nobreak >nul
    ) else (
        echo [!] Please start XAMPP manually
        pause
        exit
    )
)
echo.
echo [2] Opening website...
timeout /t 2 /nobreak >nul
start http://localhost/advise-hub/index.html
echo.
echo ========================================
echo   ✅ WEBSITE LAUNCHED SUCCESSFULLY
echo ========================================
echo Main Site: http://localhost/advise-hub/
echo Server Info: http://localhost/advise-hub/server-info.php
echo Calculators: http://localhost/advise-hub/tools/
echo All Pages: http://localhost/advise-hub/sitemap.html
echo ========================================
echo.
echo Press any key to exit...
pause >nul