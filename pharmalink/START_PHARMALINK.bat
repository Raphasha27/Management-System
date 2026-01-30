@echo off
echo ====================================
echo   PHARMALINK - Starting Services
echo ====================================
echo.

REM Start Backend in Background
echo [1/2] Starting Backend API on Port 3000...
cd backend
start /B cmd /c "npm start"
cd ..
timeout /t 3 /nobreak >nul

REM Open Frontend Dashboard
echo [2/2] Opening PharmaLink Dashboard...
start "" "%CD%\..\index.html"

echo.
echo ====================================
echo   PHARMALINK IS NOW LIVE!
echo ====================================
echo   Backend API: http://localhost:3000
echo   Dashboard: Opened in browser
echo ====================================
echo.
pause
