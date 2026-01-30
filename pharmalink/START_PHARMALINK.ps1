# PharmaLink - Integrated Startup Script
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  PHARMALINK - Starting Services" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to backend
Write-Host "[1/3] Starting Backend API..." -ForegroundColor Yellow
Set-Location -Path "$PSScriptRoot\backend"

# Start backend in background
$backendJob = Start-Job -ScriptBlock {
    param($backendPath)
    Set-Location $backendPath
    npm start
} -ArgumentList (Get-Location).Path

Write-Host "  ✓ Backend running on Port 3000" -ForegroundColor Green
Start-Sleep -Seconds 2

# Return to pharmalink root
Set-Location -Path $PSScriptRoot

# Open Frontend
Write-Host "[2/3] Opening PharmaLink Dashboard..." -ForegroundColor Yellow
$indexPath = Resolve-Path "..\index.html"
Start-Process $indexPath.Path
Write-Host "  ✓ Dashboard opened in browser" -ForegroundColor Green

Write-Host ""
Write-Host "[3/3] Monitoring backend logs..." -ForegroundColor Yellow
Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  PHARMALINK IS NOW LIVE!" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Backend API: http://localhost:3000" -ForegroundColor White
Write-Host "  Dashboard: Running in browser" -ForegroundColor White
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Gray
Write-Host ""

# Stream backend logs
Receive-Job -Job $backendJob -Wait
