# Git Commit AI - Quick Start

Write-Host "🚀 Git Commit AI - Quick Start" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Compile TypeScript
Write-Host "🔨 Compiling TypeScript..." -ForegroundColor Yellow
npm run compile

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Press F5 to launch the extension" -ForegroundColor White
    Write-Host "  2. Run 'Configure Git Commit AI' command" -ForegroundColor White
    Write-Host "  3. Enter your API key" -ForegroundColor White
    Write-Host "  4. Click the ✨ sparkle icon in Source Control" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 Read SETUP.md for detailed instructions" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "❌ Build failed. Check errors above." -ForegroundColor Red
}
