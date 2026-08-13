#!/usr/bin/env sh
# ═══════════════════════════════════════════════════════════════════
# Dreamskills 一键安装脚本（Linux / macOS · x64 / arm64 / x86）
# 纯 JS 零原生依赖 → 架构无关；只需 Node.js ≥ 18。
#
# 用法：
#   ./install.sh                        # 三平台全局安装（claude+opencode+codex）
#   ./install.sh --target opencode      # 只装 OpenCode
#   ./install.sh --project              # 安装到当前项目级
#   ./install.sh --dry-run              # 预览
# 与 openspec 的终端部署一致：脚本只做环境检测并委托 Node 安装器。
# ═══════════════════════════════════════════════════════════════════
set -e

OS=$(uname -s)
MACHINE=$(uname -m)

case "$MACHINE" in
  x86_64|amd64)  ARCH_NAME="x64 (x86_64)" ;;
  aarch64|arm64) ARCH_NAME="arm64 (aarch64)" ;;
  i386|i686)     ARCH_NAME="x86 (32-bit)" ;;
  *)             ARCH_NAME="$MACHINE" ;;
esac

echo "Dreamskills 安装器"
echo "  操作系统：$OS"
echo "  CPU 架构：$ARCH_NAME"

if ! command -v node >/dev/null 2>&1; then
  echo ""
  echo "❌ 未检测到 Node.js（需要 ≥18）。请先安装：https://nodejs.org/"
  echo "   （Windows 另见 install.ps1；任何提供 Node 的平台均可运行，架构不限）"
  exit 1
fi

NODE_VER=$(node -p "process.versions.node")
NODE_ARCH=$(node -p "process.arch")
echo "  Node.js ：v$NODE_VER（运行时架构：$NODE_ARCH）"

case "$NODE_VER" in
  1[0-7].*|[0-9].*) echo "❌ Node.js 版本过低（需 ≥18，当前 $NODE_VER）"; exit 1 ;;
esac

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
echo "  安装源 ：$SCRIPT_DIR"
echo ""

echo "▶ 安装技能到目标平台目录（真实拷贝，自动备份同名旧技能）..."
node "$SCRIPT_DIR/scripts/install.mjs" "$@"

echo ""
echo "▶ 环境自检..."
node "$SCRIPT_DIR/scripts/doctor.mjs" || true

echo ""
echo "✅ 完成。下一步："
echo "   1) 项目内生成斜杠命令：node \"$SCRIPT_DIR/scripts/build-commands.mjs\" --target all"
echo "   2) 项目初始化：node \"$SCRIPT_DIR/cli.mjs\" init  或对代理说“用 dream-bootstrap 初始化本项目”"
echo "   3) 卸载：node \"$SCRIPT_DIR/cli.mjs\" uninstall（默认备份式移除；--force 永久删除）"
echo "   4) 更多：README.md 与 docs/multi-platform.md"
