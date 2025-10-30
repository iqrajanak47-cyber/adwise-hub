@echo off
echo Starting Daily Content Generator...
echo This will generate 10 posts every 24 hours forever
echo Press Ctrl+C to stop

cd /d "%~dp0"
node api/daily-auto-generator.js

pause