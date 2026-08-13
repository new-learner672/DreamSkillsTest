# Dreamskills 多平台兼容性设计（Claude Code / OpenCode / Codex CLI）

> 本文档说明 Dreamskills 如何用**一份技能源（SSOT）**同时完美兼容三个编码代理平台，以及每个平台的行为差异、坑点与验证方法。
> 调研依据：官方文档（opencode docs/skills、openai/codex docs/skills）、各平台 issue/PR 记录与社区跨平台实践（完整来源见文末）。

---

## 0. 核心结论（一句话）

**我们的 20 个技能只使用 `name` + `description` frontmatter，这正是三平台的唯一安全字段集**——技能文件本身零改动即可三平台通用；平台差异全部由安装脚本（`install.mjs`）与命令生成器（`build-commands.mjs`）在目录层解决。

## 1. 平台目录映射

| 平台 | 全局（所有项目可用） | 项目级（随 git 共享） |
|---|---|---|
| Claude Code | `~/.claude/skills/<name>/SKILL.md` | `.claude/skills/<name>/SKILL.md` |
| OpenCode | `~/.config/opencode/skills/<name>/SKILL.md`（`OPENCODE_CONFIG_DIR` 可覆盖配置根） | `.opencode/skills/<name>/SKILL.md` |
| Codex CLI | `~/.codex/skills/<name>/SKILL.md`（`CODEX_HOME` 可覆盖） | `.codex/skills/<name>/SKILL.md` |

要点：
- **OpenCode 只认复数 `skills/`**，单数 `skill/` 不会被发现（issue #8054、vercel-labs/skills#36 等多处确认）。
- OpenCode v2 与 Codex 还共同读取 `.agents/skills/` 共享标准目录；但 **Claude Code 不读该目录**，因此安装器按三平台目录分别真实拷贝，不依赖单一共享目录。

## 2. frontmatter 安全字段集（三平台唯一安全集）

```yaml
---
name: dream-verify          # 三平台均接受（Claude 可选、Codex 必填、OpenCode 可用目录名兜底）
description: 当……时使用……   # 三平台必填/必需
---
```

### 绝对禁止写入的字段（跨平台高危）

| 字段 | 危害 |
|---|---|
| `arguments` | Claude Code 专属；OpenCode 直接抛 `ConfigFrontmatterError`（issue #8519） |
| `context` 等其他 Claude 扩展字段 | OpenCode 历史版本对未知字段崩溃（issue #7575 等，新版已改为优雅跳过但仍是风险面） |
| `allowed-tools`（如需权限过滤） | 拼写存在 `allowed-tools`（Claude）/`allow-tools`（OpenCode 文档）分歧，需在目标版本实测；Dreamskills 默认不使用 |

> Dreamskills 全部 20 个技能自检通过：frontmatter 仅含 `name` + `description`，无任何扩展字段。

## 3. 三平台行为差异速查

| 行为 | Claude Code | OpenCode | Codex CLI |
|---|---|---|---|
| 技能调用方式 | 模型工具 + 斜杠命令 | 模型工具 + 斜杠命令 | **仅模型工具**（技能不是 /命令，frr.dev 专文确认） |
| `$ARGUMENTS` 参数注入 | ✅（斜杠命令） | ✅（斜杠命令，issue #3272） | ❌ 不适用 |
| 斜杠命令机制 | `.claude/commands/<name>.md` | `.opencode/commands/<name>.md` | ~~`~/.codex/prompts/`~~ **v0.117.0 已移除**，勿使用 |
| references/ 附加文件 | 不自动注入，模型按需读取 | 不自动注入，模型按需读取（相对路径解析有 bug #6900/#17101） | 不自动注入，模型按需读取（官方 #16479 建议） |
| 项目记忆文件 | CLAUDE.md | **AGENTS.md**（项目+全局合并，opencode 也兼容 CLAUDE.md） | **AGENTS.md**（项目根 + `~/.codex/AGENTS.md`；@import 未确认支持，避免使用） |
| 符号链接 | 支持 | 未核实 | **文件级 symlink 不被识别**（#9365/#15756/#17344），目录级可行 |

**据此的工程决策**：
1. 安装器一律**真实拷贝**，禁用符号链接（对 Codex 安全）；
2. references 加载方式与现有设计天然一致——每个 SKILL.md 的"进阶资料"节已显式指示"何时加载 references/xxx.md"，三平台行为统一；
3. 斜杠命令只为 Claude Code 与 OpenCode 生成（`build-commands.mjs`），Codex 用户用自然语言触发（如"用 dream-spec-propose 提出…"）；
4. 提供 `CLAUDE.md.example` 与 `AGENTS.md.example` 双模板，内容一致，按平台选用（可两者并存）；
5. 设计智能数据（13 数据域：84 风格/192 产品/192 配色/74 字体/161 推理规则/98 UX 指南/104 图标/25 图表/16 动效/35 落地页/950 款真实字体库 + 22 技术栈落地/生成器规则/pro 规则）全部位于 `references/*.md`——纯 markdown、无 frontmatter、无平台专属字段、无 CSV 解析依赖（三平台 Read 工具直接可用），三平台"按需读取"行为一致，**数据规模扩展不影响兼容性**。

## 4. 安装与使用

### 4.1 多平台安装

```bash
# 全局安装（三平台全装）
node scripts/install.mjs                    # 或 --target claude|opencode|codex

# 项目级安装（随 git 共享给团队）
node scripts/install.mjs --project --target all

# 预览将执行的操作
node scripts/install.mjs --dry-run

# 单目录安装（自定义）
node scripts/install.mjs --dir C:\some\skills\dir
```

安装器行为：真实拷贝 `skills/<name>/`（含 references/）到各平台目录；已存在同名技能自动备份到 `.dreamskills-backup-<时间戳>/`；输出每平台的安装清单。

### 4.2 生成斜杠命令（Claude Code + OpenCode）

```bash
node scripts/build-commands.mjs --target all     # 生成 20 个 /dream-* 命令
# Claude Code → .claude/commands/ ；OpenCode → .opencode/commands/
```

- 命令是薄入口：正文指示模型完整读取对应技能并按流程执行，参数经 `$ARGUMENTS` 透传；
- frontmatter 按平台裁剪（Claude 含 `argument-hint`；OpenCode 仅 `description`，避免未知字段风险）。

### 4.3 卸载

```bash
dreamskills uninstall                 # 全局卸载（默认备份式移除 → .dreamskills-uninstalled-<ts>/，可恢复）
dreamskills uninstall --project --commands   # 卸载项目级技能 + 斜杠命令
dreamskills uninstall --purge-dreamspec      # 连 .dreamspec 治理目录一起移除（慎重）
dreamskills uninstall --force          # 永久删除（不保留备份）
```

卸载只触碰 `dream-*` 文件；`CLAUDE.md`/`AGENTS.md`/`DESIGN.md` 等项目文件保留。

### 4.4 项目记忆模板

- Claude Code 用户：复制 `CLAUDE.md.example` → `CLAUDE.md`
- OpenCode / Codex 用户：复制 `AGENTS.md.example` → `AGENTS.md`
- 两者内容一致，可同时放置（互不冲突；OpenCode 同时读 AGENTS.md 且兼容 CLAUDE.md）

## 5. 验证方法（装完必做）

| 平台 | 验证步骤 |
|---|---|
| Claude Code | 会话中说"列出当前可用技能"，确认 dream-* 全部可见；或直接 `/dream-propose` 试触发 |
| OpenCode | TUI 中输入 `/` 查看命令列表（应含 20 个 /dream-*）；或问模型"有哪些技能"；技能在 `~/.config/opencode/skills/` 或项目 `.opencode/skills/` 下 |
| Codex CLI | 说"用 dream-verify 走验证门"，观察是否按 SKILL.md 流程执行；技能目录 `~/.codex/skills/`；注意 Codex 无斜杠命令 |
| 通用自检 | `node scripts/install.mjs --dry-run` 确认目标路径正确 |

## 6. 已知坑点备忘（安装/使用时注意）

1. ❌ 不要给共享技能添加 `arguments` 字段（OpenCode 崩溃）。
2. ❌ 不要符号链接单个 SKILL.md（Codex 不识别）；要共享就用安装器拷贝。
3. ❌ 不要使用 `~/.codex/prompts/`（v0.117.0 已移除）。
4. ❌ OpenCode 只认 `.opencode/skills/`（复数）；手写目录时别用单数。
5. ⚠️ OpenCode 对技能目录内资源的相对路径解析有 bug：SKILL.md 指示读 references 时，若模型解析路径失败，改用技能目录的绝对/项目相对路径读取。
6. ⚠️ 若未来需要 `allowed-tools` 权限过滤：先写 Claude 拼写 `allowed-tools: Bash(...)`，并在目标 OpenCode 版本实测是否生效；不生效时在 OpenCode 侧副本改用 `allow-tools`。

## 8. 操作系统与架构支持（纯 JS → 架构无关）

| OS | x64 | arm64 | x86(32位) |
|---|---|---|---|
| Windows | ✅ | ✅ | ✅（需 Node 32 位版） |
| macOS | ✅ Intel | ✅ Apple Silicon | ❌ |
| Linux | ✅ | ✅ | ⚠️（需 Node 32 位版） |

- 全部脚本为纯 JavaScript（仅 Node 内置模块、零原生依赖、无编译步骤）→ **任何提供 Node.js ≥ 18 的 OS/架构均可运行**，无需按架构分发二进制（与 openspec 的 npm 部署策略一致）；
- 部署入口：`npm install -g`（统一 `dreamskills` 命令）/ `install.sh`（Linux/macOS，uname 检测架构）/ `install.ps1`（Windows，PROCESSOR_ARCHITECTURE 检测）；
- 健康检查：`dreamskills doctor` 输出 OS/架构/Node 版本/技能完整性/三代理安装情况/项目治理文件，退出码 0/1 可接入 CI；
- 路径跨 OS 约定：全局技能目录在 Windows 为 `%USERPROFILE%\...`、macOS/Linux 为 `~/.config/opencode`（XDG）等——install.mjs 已按 `homedir()` 与环境变量（`OPENCODE_CONFIG_DIR`/`CODEX_HOME`）自适应。

## 9. 主要来源

- OpenCode 官方：https://docs.opencode.ai/docs/skills/ · Rules/AGENTS.md：https://opencode.ai/docs/rules
- Codex 官方：https://github.com/openai/codex/blob/main/docs/skills.md · Memory：https://mintlify.wiki/openai/codex/features/memory
- OpenCode 关键 issue：#7575（非 OpenCode frontmatter 崩溃）、#8519（arguments 报错）、#8054（只认复数 skills/）、#6900/#17101（资源路径 bug）、PR #11842（.agents/skills）
- Codex 关键 issue：#9365/#15756/#17344（symlink 不识别）、#14337（.codex/skills 路径）、#16479（references 按需读取）、#15972（prompts 移除）
- 跨平台实践：vercel-labs/skills Compatibility、kanaries《Codex vs Claude Code Skills》、superpowers 的 .codex/INSTALL.md（拷贝目录、frontmatter 不动）
- 本地一手证据：工作区 `.opencode/skills/`（openspec 三平台技能实例）与 `@opencode-ai/sdk` 类型定义
