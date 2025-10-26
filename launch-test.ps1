# Git Commit AI - Launch Test Mode

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   Git Commit AI - Launch Test Mode" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[OK] Extension compiled and ready!" -ForegroundColor Green
Write-Host "[OK] Ollama installed with llama3.2 model" -ForegroundColor Green
Write-Host "[OK] No API key needed - 100% FREE!" -ForegroundColor Green
Write-Host ""

Write-Host "QUICK START:" -ForegroundColor Yellow
Write-Host "   1. A new VS Code window will open" -ForegroundColor White
Write-Host "   2. Open any Git repository" -ForegroundColor White
Write-Host "   3. Make changes and stage them (git add .)" -ForegroundColor White
Write-Host "   4. Click the sparkle icon in Source Control" -ForegroundColor White
Write-Host ""

Write-Host "TIP: Read TEST_GUIDE.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""

Write-Host "Launching in 2 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "LAUNCHING EXTENSION!" -ForegroundColor Green
Write-Host ""

# Launch VS Code with the extension
code --extensionDevelopmentPath="$PWD"
