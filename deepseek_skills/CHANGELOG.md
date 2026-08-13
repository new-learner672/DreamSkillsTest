# Dreamskills 变更日志（CHANGELOG）

> 维护纪律：本文件随每次发布更新；技能与脚本变更遵循 dream-spec-propose 流程。

## v1.7.0（当前）

- **补充卸载能力**：新增 `scripts/uninstall.mjs` 与 `dreamskills uninstall` 命令
  - 默认"备份式移除"（移动到 `.dreamskills-uninstalled-<时间戳>/`，可手工恢复）；`--force` 永久删除
  - `--target claude|opencode|codex|all` 按平台卸载；`--project` 卸载项目级；`--commands` 连 `/dream-*` 斜杠命令一起卸载
  - `--purge-dreamspec` 连 `.dreamspec` 治理目录一起移除（慎重）；`--dir` 自定义目录；`--dry-run` 预览
  - 安全设计：只触碰 `dream-*` 文件；CLAUDE.md/AGENTS.md/DESIGN.md 项目文件保留

## v1.6.0

- **专项设计技能补齐（技能 18 → 20）**：新增 `dream-slide-design`（对标 ui-ux-pro-max ckm:slides——16:9 页型模式库/图表化/演讲者备注/可编辑源文件）与 `dream-banner-design`（对标 ckm:banner-design——媒介尺寸表/构图模式/单一 CTA/多尺寸适配）
- 全部 20 个技能保持三平台安全字段集（name+description）；plugin.json.example、build-commands.mjs（20 个 /dream-* 命令）、doctor.mjs、package.json、README/usage-guide/skill-map 同步更新

## v1.5.0

- **openspec 式终端部署**：npm 包化（package.json + cli.mjs 统一入口，`npm install -g` 后全局使用 `dreamskills` 命令）
- **一键安装脚本**：install.sh（Linux/macOS，uname 架构检测）+ install.ps1（Windows，PROCESSOR_ARCHITECTURE 检测）
- **全架构支持**：纯 JS 零原生依赖 → Windows/Linux/macOS × x64/arm64/x86（提供 Node ≥18 即可运行，无需按架构分发）
- **doctor 自检**：scripts/doctor.mjs——OS/架构/Node 版本/18 技能完整性/三代理安装情况/项目治理文件，退出码可接入 CI
- **validate 校验**：dream.mjs 新增 validate 命令（对开 openspec validate）——提案结构 + Given-When-Then 可验证性检查
- 技能打磨：dream-bootstrap 新增"步骤 5：验证安装与技能可发现"收尾步骤

## v1.4.0

- **全量数据域对等整合**：ui-ux-pro-max 的 13 主 CSV + 22 技术栈 CSV 全部整合进设计层（数据 100% 原创）：
  - 84 风格 / 192 产品 / 192 配色 / 74 字体搭配 / 161 推理规则 / 98 UX 指南 / 104 图标 / 25 图表 / 16 动效 / 35 落地页 / 950 款真实字体大目录（零虚构，预留联网补录接口）
  - 22 技术栈落地指南（Web/元框架/样式方案/移动/桌面/低代码）
- 全部数据文件带关键词索引（可检索设计决策目录），索引先行渐进披露，不占上下文
- 产品库跨库推荐编号重映射至扩展后范围（风格≤84/配色≤192/字体≤74）
- 三平台兼容性保持：全部新数据为纯 markdown references，18 技能 frontmatter 仍为 name+description 安全集

## v1.3.0

- dream-design-system 新增设计系统生成器（品牌关键词 → 完整 tokens，含语义色/圆角/阴影/动效推导规则）
- dream-ui-polish 新增 pro-rules 专业级规则（动效/数据可视化/深色模式/状态设计/hero 模式等）
- 设计智能库扩展：50 风格 × 21 配色 × 50 字体 + 关键词索引

## v1.2.0

- 整合 ui-ux-pro-max 全设计要素（功能对等、数据原创）

## v1.1.0

- 三平台兼容：Claude Code / OpenCode / Codex CLI（frontmatter 安全字段集 = name + description）
- install.mjs v2 多平台安装（--target claude|opencode|codex|all、--project、--dry-run、真实拷贝+备份）
- build-commands.mjs 斜杠命令生成器（Claude Code + OpenCode 的 18 个 /dream-* 命令）
- AGENTS.md.example（OpenCode/Codex 项目记忆模板）
- docs/multi-platform.md 兼容性设计文档（目录映射/坑点/验证方法）

## v1.0.0

- 18 个技能完整发布：治理/规格（bootstrap、spec-propose、spec-implement）、流程（brainstorm、plan、execute）、开发（tdd、debug、git）、设计（design-system、ui-polish、style-library）、验证（review、verify、webapp-test、perf-audit、security-check）、元（skill-creator）
- docs：design-philosophy（九大支柱）、usage-guide、skill-map
- scripts：dream.mjs（规格生命周期 CLI）、install.mjs
- 模板：CLAUDE.md / DESIGN.md / plugin.json 示例
