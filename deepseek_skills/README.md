# Dreamskills —— 一体化 Vibecoding 综合技能集

> **Dreamskills**（梦想技能集）是一套自研的、覆盖软件全生命周期的 AI 编码技能集（Agent Skills）。
> 它融合了 GitHub 上最热门 vibecoding skills 的精华——规格驱动（spec-kit / OpenSpec）、方法论流程（superpowers）、官方规范（anthropics/skills）、设计系统化（ui-ux-pro-max）、反 AI-slop 审美（taste-skill）、组件资产化（shadcn/ui）、判决式验证（sentinel / vibetest）等——并在设计上**取长补短**：保留各家的核心优势，用机制规避其公认弱点（流程过重、规格过散、审美主观、验证缺失等）。
>
> **版本**：v1.7.0 ｜ **格式规范**：严格遵循 [Anthropic Agent Skills 官方规范](https://github.com/anthropics/skills)（SKILL.md + frontmatter + 渐进式披露 + references/scripts）
> **适用平台**：**Claude Code · OpenCode · Codex CLI 三平台原生兼容**（frontmatter 仅用三平台安全字段集 `name` + `description`，见 `docs/multi-platform.md`）；Cursor、Gemini CLI 等支持 SKILL.md 的代理亦可使用；亦可作为方法论参考用于任意 AI 编码工作流。

---

## 一、Dreamskills 是什么

Dreamskills 把"一名资深工程师 + 一名产品设计师 + 一名 QA 负责人"的工作习惯，编译成 20 个原子化、可组合、可裁剪的技能文件。它不只是提示词合集，而是一套**有状态、有产物、有验收门**的开发治理体系：

- **规格驱动**：任何非平凡变更先写 spec（`.dreamspec/`），spec 与代码同仓演进，是人与 AI 的共同契约；
- **流程纪律**：头脑风暴 → 计划落盘 → 按计划执行 → 审查 → 验证门的强制流水线（支持 rigorous / balanced / light 三档强度，避免"一刀切"式僵硬）；
- **设计系统化**：tokens 先行（DESIGN.md），界面打磨走"反 slop 清单 + 参考锚定"；
- **验证闭环**：交付前必须通过验证门——单元测试、真实浏览器 E2E、性能与安全检查——宣称"完成"必须附验证证据。

### 特性一览

| 特性 | 说明 | 吸收自 |
|---|---|---|
| 规格即契约 | `.dreamspec/` 三阶段生命周期 propose→implement→archive | OpenSpec / spec-kit |
| 计划落盘 | 计划写成文件、分块加载，工件即记忆 | superpowers |
| 红-绿-重构 | TDD 是默认执行路径而非建议 | superpowers / anthropics |
| 系统化调试 | 复现→二分→根因→回归的科学方法 | superpowers / mattpocock |
| 设计 tokens 先行 | DESIGN.md 结构化设计规范，agent 可执行 | anthropics / ui-ux-pro-max |
| 设计系统生成器 | 品牌关键词 → 完整设计 tokens（含语义色/间距/圆角/动效推导规则） | ui-ux-pro-max Design System Generator（数据原创） |
| 设计智能库（全量 13 数据域） | **84 风格 × 192 产品 × 192 配色 × 74 字体 × 161 推理规则 × 98 UX 指南 × 104 图标 × 25 图表 × 16 动效 × 35 落地页 × 950 款真实字体大目录**，全部含关键词索引可检索（功能全量对等 ui-ux-pro-max 的 13 主 CSV，数据 100% 原创） | ui-ux-pro-max（全数据域整合） |
| 反 slop 门控 | 界面交付前对照 do/don't 清单自检 | taste-skill |
| 专业级打磨规则 | 动效/数据可视化/深色模式/状态设计/hero 模式/间距节奏等 pro 规则 | ui-ux-pro-max pro-rules（原创撰写） |
| 多栈映射 | **22 个技术栈** token 落地指南（Web/移动/桌面/低代码全谱） | ui-ux-pro-max 22 技术栈 CSV（原创撰写） |
| 组件即资产 | 优先复用 registry/现成组件，代码归你所有 | shadcn/ui / magic-mcp |
| 判决式验证门 | 交付 = 验证证据通过，pass/fail 二元结论 | superpowers / sentinel |
| 性能与安全护栏 | Lighthouse/CWV 指标门 + OWASP 检查清单 | performance-audit / semgrep |
| 三档强度模式 | rigorous / balanced / light 按项目裁剪 | 对 superpowers"过度工程"的改进 |
| 元技能自进化 | 用 dream-skill-creator 沉淀新经验为新技能 | superpowers writing-skills |
| 三平台兼容 | 一套技能同时装进 Claude Code / OpenCode / Codex | agents 标准 + 官方 skills 规范 |

---

## 二、技能流水线总览

```
                     ┌────────────────────────────────────────────────────────────┐
  需求/变更 ──► dream-spec-propose ──► dream-spec-implement ──► dream-verify ──► 交付 ✅
                     │                    │  （实施过程中按需挂载）                  ▲
                     ▼                    ▼                                        │
            dream-brainstorm ──► dream-plan ──► dream-execute ──► dream-review ────┘
                                       │            │
                         dream-design-system      dream-tdd
                                       │            dream-debug
                              dream-ui-polish      dream-git
                                       │
                             dream-style-library  dream-webapp-test
                                                   dream-perf-audit
                                                   dream-security-check

  全局：dream-bootstrap（项目初始化） · dream-skill-creator（元技能，随时可用）
```

**一句话流程**：bootstrap 铺地基 → propose 立契约 → brainstorm/plan 想清楚 → execute 干出来（TDD/调试/设计技能护航）→ review 挑毛病 → verify 验证门 → 交付。

---

## 三、技能清单（20 个）

| # | 技能 | 定位 | 层 |
|---|---|---|---|
| 1 | `dream-bootstrap` | 项目初始化与治理骨架 | 治理 |
| 2 | `dream-spec-propose` | 规格变更提案（SDD 入口） | 规格 |
| 3 | `dream-spec-implement` | 按规格实施与归档 | 规格 |
| 4 | `dream-brainstorm` | 需求澄清头脑风暴 | 流程 |
| 5 | `dream-plan` | 计划先行与落盘 | 流程 |
| 6 | `dream-execute` | 计划执行与子代理委派 | 流程 |
| 7 | `dream-tdd` | 测试驱动开发（红-绿-重构） | 开发 |
| 8 | `dream-debug` | 系统化调试 | 开发 |
| 9 | `dream-git` | 提交与分支纪律 | 开发 |
| 10 | `dream-design-system` | 设计 tokens + 设计系统生成器 + 22 栈落地 | 设计 |
| 11 | `dream-ui-polish` | 界面渐进打磨 + 反 slop 门控 + 专业级规则 | 设计 |
| 12 | `dream-style-library` | 13 数据域全量设计智能库（84/192/192/74/161/98/104/25/16/35/950，关键词检索） | 设计 |
| 13 | `dream-slide-design` | 幻灯片/演示文稿设计（对标 ckm:slides，页型模式库） | 设计 |
| 14 | `dream-banner-design` | 横幅/营销视觉设计（对标 ckm:banner-design，多尺寸适配） | 设计 |
| 15 | `dream-review` | 代码审查 | 验证 |
| 16 | `dream-verify` | 交付前验证门（判决式） | 验证 |
| 17 | `dream-webapp-test` | 真实浏览器功能验证 | 验证 |
| 18 | `dream-perf-audit` | 性能审计护栏（Lighthouse/CWV） | 验证 |
| 19 | `dream-security-check` | 安全审查（OWASP 清单） | 验证 |
| 20 | `dream-skill-creator` | 元技能：创建/改进技能 | 元 |

---

## 四、目录结构

```
deepseekskills/
├── README.md                      # 本文件：总览 + 安装部署 + 快速上手
├── CHANGELOG.md                   # 版本变更日志
├── package.json                   # npm 包定义（纯 JS 零依赖，bin: dreamskills）
├── cli.mjs                        # 统一 CLI 入口（install/commands/init/propose/validate/archive/verify/doctor）
├── install.sh                     # Linux/macOS 一键安装脚本（架构检测）
├── install.ps1                    # Windows 一键安装脚本（架构检测）
├── docs/
│   ├── design-philosophy.md       # 设计思路：九大支柱与取长补短论证
│   ├── usage-guide.md             # 具体操作说明（每个技能的用法、话术、产物）
│   ├── skill-map.md               # 上游技能 → Dreamskills 映射对照表
│   └── multi-platform.md          # 三平台兼容性 + OS/架构支持设计
├── CLAUDE.md.example              # 项目记忆模板（Claude Code，拷入项目根改名 CLAUDE.md）
├── AGENTS.md.example              # 项目记忆模板（OpenCode/Codex，拷入项目根改名 AGENTS.md）
├── DESIGN.md.example              # 设计规范模板（拷入项目根改名 DESIGN.md）
├── plugin.json.example            # Claude Code 插件化打包示例
├── scripts/
│   ├── install.mjs                # 多平台一键安装（--target claude|opencode|codex|all）
│   ├── uninstall.mjs              # 安全卸载（备份式移除/--force 永久删除/--commands/--purge-dreamspec）
│   ├── build-commands.mjs         # 斜杠命令生成器（Claude Code / OpenCode 的 /dream-* 命令）
│   ├── dream.mjs                  # 规格生命周期 CLI（init/propose/status/validate/archive/verify）
│   └── doctor.mjs                 # 环境与安装自检（OS/架构/Node/技能/代理/治理文件）
└── skills/
    ├── dream-bootstrap/SKILL.md
    ├── dream-spec-propose/SKILL.md
    ├── ...（其余 17 个，见上方清单）
    └── dream-skill-creator/SKILL.md
```

---

## 五、安装部署（Claude Code / OpenCode / Codex）

### 前置条件

- 已安装任意一个编码代理：Claude Code、OpenCode 或 Codex CLI；
- Node.js ≥ 18（仅 CLI 脚本需要；纯手工安装无需 Node）。

### 操作系统与架构支持（纯 JS 零原生依赖 → 架构无关）

| 操作系统 | x64 (x86_64) | arm64 (aarch64) | x86 (32-bit) |
|---|---|---|---|
| Windows | ✅ | ✅ | ✅（需 Node 32 位版） |
| macOS | ✅（Intel） | ✅（Apple Silicon） | ❌（现代 macOS 无 32 位） |
| Linux | ✅ | ✅ | ⚠️（需 Node 32 位版，部分发行版已移除） |

> 全部脚本为纯 JavaScript（仅用 Node 内置模块、无原生二进制依赖），**只要该 OS/架构提供 Node.js ≥ 18 即可运行**，无需编译、无需按架构分发不同版本——这与 openspec（npm 包）的跨平台策略一致。

### 方式零：终端一键部署（openspec 式，推荐）

**A. npm 全局安装（跨平台跨架构）**：

```bash
# 本地目录安装为全局命令
npm install -g /path/to/deepseekskills

# 或从 Git 仓库安装（分发场景）
npm install -g <git 仓库地址>

# 之后任意位置可用统一命令
dreamskills install          # 三平台全局安装技能
dreamskills doctor           # 环境与安装自检
dreamskills init             # 在项目目录初始化治理骨架
dreamskills propose "标题"   # 变更提案
dreamskills validate 001     # 校验提案（结构 + GWT）
dreamskills archive 001      # 归档
dreamskills commands         # 生成 /dream-* 斜杠命令
dreamskills uninstall        # 卸载（默认备份式移除，可恢复；--force 永久删除）
```

**B. 一键脚本（无需 npm 全局安装）**：

```bash
# Linux / macOS（自动检测 x64 / arm64 / x86）
./install.sh                         # 三平台全局安装
./install.sh --target opencode       # 只装 OpenCode
./install.sh --project               # 项目级

# Windows PowerShell（自动检测 AMD64 / ARM64 / x86）
.\install.ps1
.\install.ps1 -Target codex
.\install.ps1 -Project
```

脚本只做环境检测（OS/架构/Node 版本）并委托 Node 安装器完成安装，随后自动运行 `doctor` 自检——与 openspec 的终端部署体验一致。

### 三平台目录一览

| 平台 | 全局安装（所有项目可用） | 项目级安装（随 git 共享） |
|---|---|---|
| Claude Code | `~/.claude/skills/` | `.claude/skills/` |
| OpenCode | `~/.config/opencode/skills/`（注意是复数 `skills/`） | `.opencode/skills/` |
| Codex CLI | `~/.codex/skills/` | `.codex/skills/` |

完整兼容性设计（frontmatter 安全字段集、行为差异、坑点、验证方法）见 `docs/multi-platform.md`。

### 方式一：统一 CLI 安装（dreamskills / node 脚本）

```bash
# 1) 进入本目录
cd D:\DeepSeekHarnessTest\deepseekskills

# 2) 全局安装——默认三平台全装
dreamskills install                        # 等价于 node scripts/install.mjs --target all
dreamskills install --target claude        # 只装 Claude Code
dreamskills install --target opencode      # 只装 OpenCode
dreamskills install --target codex         # 只装 Codex CLI

# 3) 项目级安装（随 git 共享给团队）
dreamskills install --project --target all

# 4) 生成 20 个 /dream-* 斜杠命令（Claude Code + OpenCode）
dreamskills commands --target all

# 5) 环境与安装自检（OS/架构/Node/技能完整性/代理检测）
dreamskills doctor

# 预览操作（不写文件）
dreamskills install --dry-run
```

脚本行为：把 `skills/<name>/`（含 references/）**真实拷贝**到各平台目录（禁用符号链接——Codex 不识别文件级 symlink）；已存在同名技能自动备份到 `.dreamskills-backup-<时间戳>/`；安装后打印每平台的清单与 OS/架构信息。

### 方式二：手工安装（无 Node 环境）

```powershell
# 全局
Copy-Item -Recurse .\skills\* "$env:USERPROFILE\.claude\skills\"            # Claude Code
Copy-Item -Recurse .\skills\* "$env:USERPROFILE\.config\opencode\skills\"   # OpenCode（复数 skills）
Copy-Item -Recurse .\skills\* "$env:USERPROFILE\.codex\skills\"             # Codex CLI

# 项目级
Copy-Item -Recurse .\skills\* .\.claude\skills\
Copy-Item -Recurse .\skills\* .\.opencode\skills\
Copy-Item -Recurse .\skills\* .\.codex\skills\
```

其他代理（Cursor 等）：SKILL.md 是平台中立格式，复制到对应代理的技能目录，或让代理"阅读并遵循 skills/ 目录下的技能"。

### 方式三：插件化打包（Claude Code）

```powershell
# 将 plugin.json.example 复制为 .claude-plugin/plugin.json 后按官方插件规范安装
New-Item -ItemType Directory -Force .claude-plugin | Out-Null
Copy-Item plugin.json.example .claude-plugin\plugin.json
# 随后在 Claude Code 中：/plugin marketplace add <本目录>  →  /plugin install dreamskills@<本目录>
```

### 安装后初始化项目

```bash
# 在目标项目目录执行（或对代理说"用 dream-bootstrap 初始化本项目"）
node <本目录>\scripts\dream.mjs init
```

`init` 会创建 `.dreamspec/{specs,changes,archive}`、生成 `DESIGN.md`（从模板）、合并 `CLAUDE.md`/`AGENTS.md`（按平台）、写入 `.dreamspec/SKILLS.md`（记录强度模式与启用技能）。

### 各平台触发方式速记

| 平台 | 触发技能的方式 |
|---|---|
| Claude Code | 自然语言（自动识别触发词）或 `/dream-propose 用户登录功能` |
| OpenCode | 自然语言或 `/dream-propose 用户登录功能`（`$ARGUMENTS` 注入参数） |
| Codex CLI | 自然语言："用 dream-spec-propose 提出……"（Codex 技能是模型工具，无斜杠命令） |

### 卸载（Uninstall）

```bash
# 卸载全局技能（默认三平台；与安装范围对齐）
dreamskills uninstall                          # 默认"备份式移除"→ .dreamskills-uninstalled-<时间戳>/，可恢复
dreamskills uninstall --target opencode        # 只卸载 OpenCode
dreamskills uninstall --force                  # 永久删除（不保留备份）

# 卸载项目级 + 斜杠命令 + 治理目录
dreamskills uninstall --project --commands     # 项目级技能 + /dream-* 斜杠命令
dreamskills uninstall --purge-dreamspec        # 连 .dreamspec 治理目录一起移除（慎重：含全部提案/规格）

# 预览将移除的内容
dreamskills uninstall --dry-run
```

安全设计：默认**备份式移除**（技能/命令/治理目录移动到 `.dreamskills-uninstalled-<时间戳>/`，手工移回即可恢复）；只有显式 `--force` 才永久删除；只触碰 `dream-*` 文件，绝不误删其他内容；`CLAUDE.md`/`AGENTS.md`/`DESIGN.md` 属项目文件，卸载时保留（其中的工作流引用按需手工移除）。

---

## 六、快速上手（5 分钟）

以一个"新增用户登录功能"为例，与 Claude Code 的对话如下：

```
你：用 dream-bootstrap 初始化项目（或已初始化则跳过）
你：用 dream-spec-propose 提出"用户登录"的变更提案
AI：产出 .dreamspec/changes/001-user-login/ 三份文件并请你确认 ✅ 你确认
你：用 dream-brainstorm 澄清边界（密码规则？会话过期？第三方登录？）
你：用 dream-plan 写实施计划（落盘 .dreamspec/changes/001-user-login/tasks.md）
你：用 dream-spec-implement 实施（AI 自动按需挂载 dream-tdd / dream-design-system / dream-ui-polish）
你：用 dream-review 审查 + 用 dream-verify 走验证门
AI：附上测试通过、浏览器 E2E 通过、性能达标的证据，输出 pass 判决 → 交付 ✅
```

> 各技能的触发话术、输入输出、产物路径与验收清单，详见 `docs/usage-guide.md`。

---

## 七、三档强度模式

针对 superpowers 被诟病的"流程过重、小任务过度工程"，Dreamskills 内置三档强度（在 `.dreamspec/SKILLS.md` 中声明，CLI 与技能读取）：

| 模式 | 适用 | 裁剪规则 |
|---|---|---|
| **rigorous** 严格 | 大型/多人/合规项目 | 全流程全产物，验证门全开（含 E2E + 性能 + 安全） |
| **balanced** 平衡（默认） | 常规项目 | spec 仅用于功能/行为变更；TDD 覆盖核心路径；E2E 覆盖关键流程；性能/安全抽查 |
| **light** 轻量 | 原型/脚本/一次性工具 | 可跳过 spec 提案（改为 plan 中一句话说明）；TDD 可选；验证门 = 构建/运行 + 冒烟 |

每个技能文档内标注"light 模式下可跳过"的步骤，agent 依模式裁剪——**有纪律但不僵硬**。

---

## 八、设计思路与操作说明

- **设计思路**（九大支柱、取长补短论证、边界与反模式）：见 `docs/design-philosophy.md`
- **具体操作说明**（每个技能用法、完整工作流演练、场景配方、CLI 参考）：见 `docs/usage-guide.md`
- **上游映射**（各家技能优势 → Dreamskills 吸收点 → 改进点）：见 `docs/skill-map.md`
- **多平台兼容**（Claude Code / OpenCode / Codex 目录映射、安全字段集、坑点、验证方法）：见 `docs/multi-platform.md`

---

## 九、上游灵感与致谢

Dreamskills 的每个设计决策都建立在对以下项目的深入分析之上（详见调研报告 `../vibecoding-skills-analysis.md` 与 `docs/skill-map.md`）：

- [obra/superpowers](https://github.com/obra/superpowers)（~20-27万★）：方法论即代码、工件即记忆、验证门；
- [anthropics/skills](https://github.com/anthropics/skills)（~13.5-17万★）：SKILL.md 格式规范、渐进式披露、frontend-design；
- [github/spec-kit](https://github.com/github/spec-kit)（~10-11.5万★）：规格优先、机器可校验 spec；
- [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)（~7.8-11.1万★）：设计系统化、tokens 先行；
- [shadcn-ui/ui](https://github.com/shadcn-ui/ui)（~8.3-11万★）：组件即资产、registry 分发；
- [mattpocock/skills](https://github.com/mattpocock/skills)（~8万★）：经验即技能、轻量注入；
- [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec)（~5.7-6万★）：spec 即事实源、变更生命周期；
- [kesslerio/taste-skill](https://github.com/kesslerio/taste-skill)（~4.1-6万★）：反 slop 门控、品味工程化；
- [wshobson/agents](https://github.com/wshobson/agents)（~3.8万★）：角色化子代理委派（Dreamskills 中为可选增强模式）；
- 验证闭环工具派：sentinel / vibetest（判决式 QA）、semgrep guardian（安全左移）、Lighthouse 护栏（性能门）。

---

## 十、版本与维护

- **v1.0.0**：18 技能完整发布。
- **v1.1.0**：三平台兼容（Claude Code / OpenCode / Codex）+ 多平台安装器与斜杠命令。
- **v1.2.0**：整合 ui-ux-pro-max 全设计要素（50/21/50 原创库 + 设计系统生成器 + pro-rules）。
- **v1.4.0**：全量数据域对等整合——13 数据域设计智能库（84 风格/192 产品/192 配色/74 字体/161 推理规则/98 UX 指南/104 图标/25 图表/16 动效/35 落地页/950 款真实字体）+ 22 技术栈落地指南。
- **v1.5.0**：openspec 式终端部署——npm 全局安装（`dreamskills` 统一命令）+ install.sh/install.ps1 一键脚本（Windows/Linux/macOS · x64/arm64/x86，纯 JS 架构无关）+ doctor 自检 + validate 提案校验。
- **v1.6.0**：新增 2 个设计专项技能——`dream-slide-design`（对标 ckm:slides 幻灯片设计）、`dream-banner-design`（对标 ckm:banner-design 横幅/营销视觉设计），技能集 18 → 20。
- **v1.7.0**：补充卸载能力——`dreamskills uninstall`（默认备份式移除可恢复、`--force` 永久删除、`--commands` 卸载斜杠命令、`--purge-dreamspec` 连治理目录一起移除）。
- 维护方式：使用 `dream-skill-creator` 元技能持续沉淀新经验、改进旧技能；变更遵循 `dream-spec-propose` 流程。
- 许可：MIT（技能与脚本均可自由修改、分发、商用）。
