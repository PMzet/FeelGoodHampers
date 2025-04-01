@echo off
echo Starting Bloom & Gift Shop website locally...
echo.
echo Make sure you have Node.js installed!
echo.

echo 1. Installing dependencies...
call npm install

echo.
echo 2. Starting local server...
call node server.js

echo.
echo If the server doesn't start, make sure Node.js is installed correctly.
echo Visit: https://nodejs.org/en/download/
echo.
echo Press any key to exit...
pause > nul 