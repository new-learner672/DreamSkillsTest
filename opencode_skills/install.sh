#!/usr/bin/env bash
# Dreamskills 一键安装/卸载脚本（Linux/macOS）
# 用法（安装）：
#   ./install.sh              # 项目级安装到当前目录（opencode + codex）
#   ./install.sh --global     # 全局安装（用户级）
#   ./install.sh --target opencode
#   ./install.sh --target codex --skill dream-ui
# 用法（卸载）：
#   ./install.sh --uninstall                    # 卸载项目级（opencode + codex）
#   ./install.sh --uninstall --global           # 卸载全局
#   ./install.sh --uninstall --target codex --skill dream-ui
set -euo pipefail

TARGET="${TARGET:-all}"      # all | opencode | codex
GLOBAL_FLAG="${GLOBAL_FLAG:-0}"
SKILL_ARG="${SKILL:-}"
UNINSTALL_FLAG="${UNINSTALL_FLAG:-0}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target) TARGET="$2"; shift 2 ;;
    --global) GLOBAL_FLAG=1; shift ;;
    --skill) SKILL_ARG="$2"; shift 2 ;;
    --uninstall) UNINSTALL_FLAG=1; shift ;;
    *) echo "未知参数: $1"; exit 1 ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_SKILLS="$SCRIPT_DIR/dreamskills/skills"
SRC_COMMANDS="$SCRIPT_DIR/dreamskills/commands"
SRC_HOOKS="$SCRIPT_DIR/dreamskills/hooks"

# OS/架构检测（适配 Windows / Linux / macOS × x64 / arm64）
OS_NAME="$(uname -s)"
case "$OS_NAME" in
  Linux*) OS_LABEL="Linux" ;;
  Darwin*) OS_LABEL="macOS" ;;
  MINGW*|MSYS*|CYGWIN*) OS_LABEL="Windows" ;;
  *) OS_LABEL="$OS_NAME" ;;
esac
ARCH_NAME="$(uname -m)"
case "$ARCH_NAME" in
  x86_64|amd64) ARCH_LABEL="x86_64" ;;
  aarch64|arm64) ARCH_LABEL="arm64" ;;
  *) ARCH_LABEL="$ARCH_NAME" ;;
esac
echo "Dreamskills 安装脚本 · $OS_LABEL / $ARCH_LABEL"

[[ -d "$SRC_SKILLS" ]] || { echo "技能源目录不存在: $SRC_SKILLS"; exit 1; }

if [[ -n "$SKILL_ARG" ]]; then
  SKILL_DIRS=("$SRC_SKILLS/$SKILL_ARG")
  [[ -d "${SKILL_DIRS[0]}" ]] || { echo "技能不存在: $SKILL_ARG"; exit 1; }
else
  SKILL_DIRS=("$SRC_SKILLS"/*)
fi

uninstall_from() {
  local skill_root="$1" label="$2"
  for sd in "${SKILL_DIRS[@]}"; do
    local name dest
    name="$(basename "$sd")"
    dest="$skill_root/$name"
    if [[ -e "$dest" ]]; then
      rm -rf "$dest"
      echo "[卸载] $label <- $dest"
    else
      echo "[不存在] $label: $dest"
    fi
  done
}

uninstall_files() {
  local dir="$1" pattern="$2" label="$3"
  if [[ -d "$dir" ]]; then
    find "$dir" -maxdepth 1 -type f -name "$pattern" -print -delete 2>/dev/null | sed "s|^|[卸载] $label <- |" || true
  fi
}

if [[ "$UNINSTALL_FLAG" == "1" ]]; then
  if [[ "$TARGET" == "all" || "$TARGET" == "opencode" ]]; then
    if [[ "$GLOBAL_FLAG" == "1" ]]; then
      OC_ROOT="${XDG_CONFIG_HOME:-$HOME/.config}/opencode"
    else
      OC_ROOT="$(pwd)/.opencode"
    fi
    uninstall_from "$OC_ROOT/skills" "opencode"
    if [[ "$GLOBAL_FLAG" != "1" && -z "$SKILL_ARG" ]]; then
      uninstall_files "$OC_ROOT/commands" "dream-*.md" "opencode commands"
      uninstall_files "$OC_ROOT/hooks" "session-start.md" "opencode hooks"
    fi
  fi
  if [[ "$TARGET" == "all" || "$TARGET" == "codex" ]]; then
    if [[ "$GLOBAL_FLAG" == "1" ]]; then
      CX_ROOT="$HOME/.codex"
    else
      CX_ROOT="$(pwd)/.codex"
    fi
    uninstall_from "$CX_ROOT/skills" "codex"
    if [[ "$GLOBAL_FLAG" != "1" && -z "$SKILL_ARG" ]]; then
      uninstall_files "$CX_ROOT/commands" "dream-*.md" "codex commands"
    fi
  fi
  echo ""
  echo "卸载完成。注意：项目中的 specs/、changes/ 等规格数据不会被删除，可保留作普通文档。"
  exit 0
fi

install_to() {
  local skill_root="$1" label="$2"
  mkdir -p "$skill_root"
  for sd in "${SKILL_DIRS[@]}"; do
    local name dest
    name="$(basename "$sd")"
    dest="$skill_root/$name"
    if [[ -e "$dest" ]]; then
      echo "[跳过] $label 已存在: $dest"
    else
      cp -R "$sd" "$skill_root/"
      echo "[安装] $label <- $dest"
    fi
  done
}

if [[ "$TARGET" == "all" || "$TARGET" == "opencode" ]]; then
  if [[ "$GLOBAL_FLAG" == "1" ]]; then
    OC_ROOT="${XDG_CONFIG_HOME:-$HOME/.config}/opencode"
  else
    OC_ROOT="$(pwd)/.opencode"
  fi
  install_to "$OC_ROOT/skills" "opencode"
  if [[ "$GLOBAL_FLAG" != "1" && -z "$SKILL_ARG" ]]; then
    mkdir -p "$OC_ROOT/commands" "$OC_ROOT/hooks"
    cp "$SRC_COMMANDS"/* "$OC_ROOT/commands/"
    cp "$SRC_HOOKS"/* "$OC_ROOT/hooks/"
    echo "[安装] opencode commands/hooks <- $OC_ROOT"
  fi
fi

if [[ "$TARGET" == "all" || "$TARGET" == "codex" ]]; then
  if [[ "$GLOBAL_FLAG" == "1" ]]; then
    CX_ROOT="$HOME/.codex"
  else
    CX_ROOT="$(pwd)/.codex"
  fi
  install_to "$CX_ROOT/skills" "codex"
  if [[ "$GLOBAL_FLAG" != "1" && -z "$SKILL_ARG" ]]; then
    mkdir -p "$CX_ROOT/commands"
    cp "$SRC_COMMANDS"/* "$CX_ROOT/commands/"
    echo "[安装] codex commands <- $CX_ROOT/commands"
  fi
fi

echo ""
echo "完成。验证：在宿主会话中问 AI『你有哪些 dreamskills 技能可用』"
echo "提示: 也可用 npm CLI 部署（跨平台推荐）: npx dreamskills-cli install --target codex"
