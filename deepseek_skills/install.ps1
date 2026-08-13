# ======================================================================
# Dreamskills one-click installer (Windows PowerShell, x64 / arm64 / x86)
# Pure-JS zero native deps -> architecture independent; Node.js >= 18 only.
#
# Usage:
#   .\install.ps1                         # global install (all 3 agents)
#   .\install.ps1 -Target opencode        # OpenCode only
#   .\install.ps1 -Project                # project-level install
#   .\install.ps1 -DryRun                 # preview only
# Uninstall: node cli.mjs uninstall  (backup-style by default; --force for permanent)
# ======================================================================
param(
  [ValidateSet('claude', 'opencode', 'codex', 'all')]
  [string]$Target = 'all',
  [switch]$Project,
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

$osArch = $env:PROCESSOR_ARCHITECTURE
$archName = switch ($osArch) {
  'AMD64' { 'x64 (x86_64)' }
  'ARM64' { 'arm64 (aarch64)' }
  'x86'   { 'x86 (32-bit)' }
  default { $osArch }
}

Write-Host 'Dreamskills installer'
Write-Host '  OS      : Windows'
Write-Host "  CPU arch: $archName"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host ''
  Write-Host 'ERROR: Node.js not found (>=18 required). Install from https://nodejs.org/' -ForegroundColor Red
  exit 1
}

$nodeVer = node -p 'process.versions.node'
$nodeArch = node -p 'process.arch'
Write-Host "  Node.js : v$nodeVer (runtime arch: $nodeArch)"

if ([version]$nodeVer -lt [version]'18.0.0') {
  Write-Host "ERROR: Node.js too old (>=18 required, got $nodeVer)" -ForegroundColor Red
  exit 1
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Host "  Source  : $scriptDir"
Write-Host ''

Write-Host '>> Installing skills to agent dirs (real copy, auto-backup of same-name skills)...'
$nodeArgs = @("$scriptDir\scripts\install.mjs", '--target', $Target)
if ($Project) { $nodeArgs += '--project' }
if ($DryRun)  { $nodeArgs += '--dry-run' }
& node @nodeArgs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ''
Write-Host '>> Environment self-check...'
& node "$scriptDir\scripts\doctor.mjs"

Write-Host ''
Write-Host 'Done. Next steps:'
Write-Host '  1) Generate slash commands in a project: node "$scriptDir\scripts\build-commands.mjs" --target all'
Write-Host '  2) Init a project: node "$scriptDir\cli.mjs" init   (or tell the agent "use dream-bootstrap to init this project")'
Write-Host '  3) Uninstall: node "$scriptDir\cli.mjs" uninstall   (backup-style by default; --force for permanent removal)'
Write-Host '  4) Docs: README.md and docs/multi-platform.md'
