<#
Runs Backend and Frontend in separate PowerShell windows.
Usage: .\run-all.ps1 [-OpenBrowser]
#>

param(
    [switch]$OpenBrowser
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$backendDir = Join-Path $root 'Backend'
$frontendDir = Join-Path $root 'frontend'

# Start backend in new PowerShell window
Start-Process powershell -ArgumentList "-NoExit","-Command","Set-Location -LiteralPath '$backendDir'; dotnet run"

# Start frontend in new PowerShell window
Start-Process powershell -ArgumentList "-NoExit","-Command","Set-Location -LiteralPath '$frontendDir'; npm run dev"

if ($OpenBrowser) {
    Start-Sleep -Seconds 3
    Start-Process "http://localhost:5222"
    Start-Process "http://localhost:5173"
}
