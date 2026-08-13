# Dreamskills 一键安装/卸载脚本（Windows PowerShell 5.1+）
# 用法（安装）：
#   powershell -ExecutionPolicy Bypass -File install.ps1            # 项目级安装到当前目录（opencode + codex）
#   powershell -ExecutionPolicy Bypass -File install.ps1 -Global    # 全局安装（用户级）
#   powershell -ExecutionPolicy Bypass -File install.ps1 -Target opencode
#   powershell -ExecutionPolicy Bypass -File install.ps1 -Target codex -Skill dream-ui
# 用法（卸载）：
#   powershell -ExecutionPolicy Bypass -File install.ps1 -Uninstall                 # 卸载项目级（opencode + codex）
#   powershell -ExecutionPolicy Bypass -File install.ps1 -Uninstall -Global         # 卸载全局
#   powershell -ExecutionPolicy Bypass -File install.ps1 -Uninstall -Target codex -Skill dream-ui
param(
    [ValidateSet("all", "opencode", "codex")]
    [string]$Target = "all",
    [switch]$Global,
    [string]$Skill = "",
    [switch]$Uninstall
)

$ErrorActionPreference = "Stop"
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$srcSkills  = Join-Path $scriptRoot "dreamskills\skills"
$srcCommands = Join-Path $scriptRoot "dreamskills\commands"
$srcHooks   = Join-Path $scriptRoot "dreamskills\hooks"

# OS/架构检测（适配 Windows / Linux / macOS × x64 / arm64）
$osName = if ($IsWindows) { "Windows" } elseif ($IsLinux) { "Linux" } elseif ($IsMacOS) { "macOS" } else { "Unknown" }
$arch = if ([Environment]::Is64BitOperatingSystem) {
    if ($env:PROCESSOR_ARCHITECTURE -match "ARM") { "arm64" } else { "x86_64" }
} else { "x86" }
Write-Host "Dreamskills 安装脚本 · $osName / $arch" -ForegroundColor Cyan

if (-not (Test-Path $srcSkills)) { Write-Error "技能源目录不存在: $srcSkills"; exit 1 }

$skillDirs = @(
    if ($Skill) { Join-Path $srcSkills $Skill }
    else { Get-ChildItem -Path $srcSkills -Directory | Select-Object -ExpandProperty FullName }
)
if ($Skill -and -not (Test-Path ($skillDirs[0]))) { Write-Error "技能不存在: $Skill"; exit 1 }

function Install-To($skillRoot, $label) {
    foreach ($sd in $skillDirs) {
        $dest = Join-Path $skillRoot (Split-Path $sd -Leaf)
        if (Test-Path $dest) {
            Write-Host "[跳过] $label 已存在: $dest（删除后重装或手工覆盖）" -ForegroundColor Yellow
        } else {
            Copy-Item -Path $sd -Destination $skillRoot -Recurse
            Write-Host "[安装] $label  <-  $dest" -ForegroundColor Green
        }
    }
}

function Uninstall-From($skillRoot, $label) {
    foreach ($sd in $skillDirs) {
        $dest = Join-Path $skillRoot (Split-Path $sd -Leaf)
        if (Test-Path $dest) {
            Remove-Item -Path $dest -Recurse -Force
            Write-Host "[卸载] $label  <-  $dest" -ForegroundColor Green
        } else {
            Write-Host "[不存在] $($label): $dest" -ForegroundColor DarkGray
        }
    }
}

function Uninstall-Files($root, $pattern, $label) {
    if (Test-Path $root) {
        Get-ChildItem -Path $root -File -Filter $pattern -ErrorAction SilentlyContinue | ForEach-Object {
            Remove-Item -Path $_.FullName -Force
            Write-Host "[卸载] $label  <-  $($_.FullName)" -ForegroundColor Green
        }
    }
}

if ($Uninstall) {
    if (-not $Skill) {
        $skillDirs = Get-ChildItem -Path $srcSkills -Directory -Filter "dream-*" | Select-Object -ExpandProperty FullName
    }
    if ($Target -in @("all", "opencode")) {
        $ocRoot = if ($Global) { Join-Path $env:USERPROFILE ".config\opencode" } else { Join-Path (Get-Location) ".opencode" }
        Uninstall-From (Join-Path $ocRoot "skills") "opencode"
        if (-not $Global -and -not $Skill) {
            Uninstall-Files (Join-Path $ocRoot "commands") "dream-*.md" "opencode commands"
            Uninstall-Files (Join-Path $ocRoot "hooks") "session-start.md" "opencode hooks"
        }
    }
    if ($Target -in @("all", "codex")) {
        $cxRoot = if ($Global) { Join-Path $env:USERPROFILE ".codex" } else { Join-Path (Get-Location) ".codex" }
        Uninstall-From (Join-Path $cxRoot "skills") "codex"
        if (-not $Global -and -not $Skill) {
            Uninstall-Files (Join-Path $cxRoot "commands") "dream-*.md" "codex commands"
        }
    }
    Write-Host ""
    Write-Host "卸载完成。注意：项目中的 specs/、changes/ 等规格数据不会被删除，可保留作普通文档。" -ForegroundColor Cyan
    exit 0
}

# opencode：项目级 .opencode/skills 或全局 ~/.config/opencode/skills
if ($Target -in @("all", "opencode")) {
    $ocRoot = if ($Global) { Join-Path $env:USERPROFILE ".config\opencode" } else { Join-Path (Get-Location) ".opencode" }
    $ocSkills = Join-Path $ocRoot "skills"
    New-Item -ItemType Directory -Path $ocSkills -Force | Out-Null
    Install-To $ocSkills "opencode"
    if (-not $Global -and -not $Skill) {
        $ocCmds = Join-Path $ocRoot "commands"
        New-Item -ItemType Directory -Path $ocCmds -Force | Out-Null
        Copy-Item -Path "$srcCommands\*" -Destination $ocCmds -Force
        Write-Host "[安装] opencode commands  <-  $ocCmds" -ForegroundColor Green
        $ocHooks = Join-Path $ocRoot "hooks"
        New-Item -ItemType Directory -Path $ocHooks -Force | Out-Null
        Copy-Item -Path "$srcHooks\*" -Destination $ocHooks -Force
        Write-Host "[安装] opencode hooks  <-  $ocHooks" -ForegroundColor Green
    }
}

# codex：全局 ~/.codex/skills 或项目级 .codex/skills
if ($Target -in @("all", "codex")) {
    $cxRoot = if ($Global) { Join-Path $env:USERPROFILE ".codex" } else { Join-Path (Get-Location) ".codex" }
    $cxSkills = Join-Path $cxRoot "skills"
    New-Item -ItemType Directory -Path $cxSkills -Force | Out-Null
    Install-To $cxSkills "codex"
    if (-not $Global -and -not $Skill) {
        $cxCmds = Join-Path $cxRoot "commands"
        New-Item -ItemType Directory -Path $cxCmds -Force | Out-Null
        Copy-Item -Path "$srcCommands\*" -Destination $cxCmds -Force
        Write-Host "[安装] codex commands  <-  $cxCmds" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "完成。验证方式：" -ForegroundColor Cyan
Write-Host "  opencode: 会话中问 AI『你有哪些 dreamskills 技能可用』"
Write-Host "  codex:   codex 会话中问 AI『列出可用的 dream 技能』"
Write-Host "  dream-ui 数据资产已随技能一并复制（data/*.csv + scripts/ 可选 Python 检索）"
Write-Host ""
Write-Host "提示: 也可用 npm CLI 部署（跨平台推荐）: npx dreamskills-cli install --target opencode" -ForegroundColor DarkGray
