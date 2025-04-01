@echo off
echo Creating image directories for Bloom & Gift Shop...

if not exist images mkdir images
if not exist images\slider mkdir images\slider
if not exist images\categories mkdir images\categories
if not exist images\products mkdir images\products
if not exist images\testimonials mkdir images\testimonials
if not exist images\payment mkdir images\payment

echo Directory structure created successfully:
echo - images/
echo   - slider/
echo   - categories/
echo   - products/
echo   - testimonials/
echo   - payment/

echo.
echo Add your images to these folders before deploying the website.
echo.
echo Press any key to exit...
pause > nul 