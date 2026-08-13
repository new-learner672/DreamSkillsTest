# DreamSkillsTest

> 本仓库收纳两套自研的 AI 编码技能集：**deepseek_skills**（Dreamskills 全能技能集）与 **opencode_skills**（OpenCode 专用技能包）。

## 目录说明

| 目录 | 内容 | 适用平台 |
|---|---|---|
| `deepseek_skills/` | **Dreamskills v1.7.0**——规格驱动、设计系统化、验证闭环的一体化 vibecoding 技能集：20 个原子化技能 + 13 数据域设计智能库（84 风格/192 产品/192 配色/74 字体/161 推理规则/98 UX 指南/104 图标/25 图表/16 动效/35 落地页/950 款真实字体）+ 22 技术栈落地指南 + openspec 式 CLI 与 doctor/validate/uninstall 工具链 | Claude Code / OpenCode / Codex CLI（Windows/Linux/macOS · x64/arm64/x86） |
| `opencode_skills/` | OpenCode 专用技能包：`dreamskills/` 插件（.claude-plugin + agents/commands/hooks/skills）、CLI 工具与安装脚本 | OpenCode |

## 快速安装

### deepseek_skills（Dreamskills 全能技能集）

```bash
cd deepseek_skills
npm install -g .                # 安装全局 dreamskills 命令（跨平台跨架构）
dreamskills install             # 三平台全局安装技能（Claude Code / OpenCode / Codex）
dreamskills doctor              # 环境自检
# 或一键脚本：Linux/macOS ./install.sh；Windows .\install.ps1
```

详见 `deepseek_skills/README.md` 与 `docs/multi-platform.md`。

### opencode_skills（OpenCode 专用）

```bash
cd opencode_skills
# Linux/macOS
./install.sh
# Windows
.\install.ps1
```

详见 `opencode_skills/README.md`。

## 维护

- 两套技能集各自维护于对应目录；上传/更新使用 git push。
- Dreamskills 的变更遵循其 spec-driven 流程（`dreamskills propose` → `validate` → `archive`）。
