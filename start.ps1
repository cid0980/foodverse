$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Backend = Join-Path $Root "backend"
$Frontend = Join-Path $Root "frontend"

if (!(Test-Path $Backend) -or !(Test-Path $Frontend)) {
  Write-Error "Missing backend or frontend directory."
}

$envFile = Join-Path $Backend ".env"
$envExample = Join-Path $Backend ".env.example"
if (!(Test-Path $envFile)) {
  Copy-Item $envExample $envFile
  Write-Host "Created backend/.env from .env.example. Update MONGO_URI and JWT_SECRET." -ForegroundColor Yellow
}

if (!(Test-Path (Join-Path $Backend "node_modules"))) {
  Write-Host "Installing backend dependencies..."
  Push-Location $Backend
  npm install
  Pop-Location
}

if (!(Test-Path (Join-Path $Frontend "node_modules"))) {
  Write-Host "Installing frontend dependencies..."
  Push-Location $Frontend
  npm install
  Pop-Location
}

Write-Host "Starting backend..."
Push-Location $Backend
$backend = Start-Process -FilePath "npm" -ArgumentList "run","dev" -NoNewWindow -PassThru
Pop-Location

Write-Host "Starting frontend..."
Push-Location $Frontend
$env:VITE_API_BASE = "/api"
Start-Process -FilePath "npm" -ArgumentList "run","dev" -NoNewWindow
Pop-Location

Write-Host "Backend PID: $($backend.Id)"
Write-Host "Frontend running at http://localhost:5173"
