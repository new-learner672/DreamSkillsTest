# Dreamskills 操作说明（Usage Guide）

> 本文档是 Dreamskills 的**具体操作手册**：每个技能怎么触发、给什么输入、产什么输出、怎么验收。
> 与 README（部署）和 design-philosophy（理念）配套阅读。

---

## 1. 完整工作流演练（从零到交付）

以"给现有 Web 项目新增用户登录功能"为例（Claude Code 会话）：

### 第 0 步：初始化（一次性）
```
你：用 dream-bootstrap 初始化本项目
AI：创建 .dreamspec/{specs,changes,archive}、DESIGN.md（让你补品牌关键词）、
    合并 CLAUDE.md、生成 .dreamspec/SKILLS.md（默认 balanced 模式）✅
```

### 第 1 步：提出变更提案
```
你：用 dream-spec-propose 提出"用户登录"变更
AI：在 .dreamspec/changes/001-user-login/ 生成 proposal.md / tasks.md / spec-delta.md
    spec-delta.md 含 Given-When-Then（如"当用户输入正确密码，那么登录成功并跳转首页"）
    请你确认提案 ✅ 你确认
```

### 第 2 步：澄清与计划
```
你：用 dream-brainstorm 澄清登录边界
AI：连环追问：密码强度规则？会话过期？第三方登录？找回密码本期做吗？
你：用 dream-plan 写实施计划
AI：在 tasks.md 写入分块任务（每块≤半天、带验收点），从 spec-delta 派生 ✅
```

### 第 3 步：实施（自动挂载护航技能）
```
你：用 dream-spec-implement 实施
AI：逐块执行 tasks.md：
    块1 数据模型与接口 —— 自动调用 dream-tdd（先写失败测试）
    块2 登录页面 —— 自动调用 dream-design-system（遵循 DESIGN.md tokens）
                        + dream-ui-polish（反 slop 自检）
    块3 会话管理 —— dream-debug（遇到问题复现→定位）
    每完成一块执行 dream-git（原子提交）✅
```

### 第 4 步：审查与验证门
```
你：用 dream-review 审查本次变更
AI：按 checklist 输出问题分级（阻断/建议），修复阻断项
你：用 dream-verify 走验证门
AI：收集证据 → 输出判决：
    ✅ PASS：单元测试 14/14 通过；浏览器 E2E（登录成功/失败/会话过期）3/3 通过；
            Lighthouse 性能 ≥90；安全清单无高危
    → 归档提案（dream-spec-implement 的 archive 步骤）→ 交付 ✅
```

---

## 2. 各技能操作速查

> 触发话术示例以"用 xxx 做/检查/写"形式给出；每个技能完整细节见其 SKILL.md。

### 治理层
| 技能 | 触发场景/话术 | 关键产物 | 验收要点 |
|---|---|---|---|
| dream-bootstrap | 新项目第一步；"初始化 dreamskills" | .dreamspec/ 三目录、DESIGN.md、CLAUDE.md、SKILLS.md | 四类文件齐全 |
| dream-skill-creator | "把这次踩坑经验固化成技能"；改进现有技能 | 新技能目录（含 SKILL.md + references） | 通过格式自检清单 |

### 规格层
| 技能 | 触发场景/话术 | 关键产物 | 验收要点 |
|---|---|---|---|
| dream-spec-propose | 新功能/行为变更前；"先写 spec" | changes/<id>/ 三文件 + INDEX 登记 | 三文件齐全、GWT 完整、用户确认 |
| dream-spec-implement | 提案已确认；"实施这个提案" | 代码 + 测试 + 归档后的 specs/ 更新 | tasks.md 全勾选、验证证据齐、archive 完成 |

### 流程层
| 技能 | 触发场景/话术 | 关键产物 | 验收要点 |
|---|---|---|---|
| dream-brainstorm | 需求含糊/重大决策前 | 澄清问答记录（写入提案背景） | 边界、非目标、风险点已明确 |
| dream-plan | 提案确认后、实施前 | tasks.md 分块计划 | 每块≤半天、带验收点 |
| dream-execute | "执行计划"；无 spec 的小任务 | 逐块实现 + 块级验证记录 | 计划块全完成、不跳块 |

### 开发层
| 技能 | 触发场景/话术 | 关键产物 | 验收要点 |
|---|---|---|---|
| dream-tdd | 写任何逻辑前；"用 TDD 实现" | 失败测试→实现→重构三态证据 | 红→绿→重构顺序可追溯 |
| dream-debug | 遇到 bug；"系统化调试" | 根因报告（复现→二分→根因→回归） | 根因定位而非改症状 |
| dream-git | 每完成一个逻辑块 | 原子提交（信息含块号） | 一提交一意图、可回滚 |

### 设计层
| 技能 | 触发场景/话术 | 关键产物 | 验收要点 |
|---|---|---|---|
| dream-design-system | 任何 UI 工作前；"生成设计系统" | 补全/遵循 DESIGN.md tokens；或关键词→完整 tokens（生成器） | 组件全部由 tokens 派生；生成结果经用户确认 |
| dream-ui-polish | 功能完成后打磨界面 | 反 slop 自检 + pro-rules 执行记录 + 打磨记录 | 清单逐项通过或注明豁免 |
| dream-style-library | "换个风格"；需要配色/字体/图标/图表/动效/落地页建议 | 从 13 数据域库（84/192/192/74/161/98/104/25/16/35/950）按关键词检索组合/规范并写入 DESIGN.md | 组合完整（风格+配色+字体），索引先行检索，专项规范有引用记录 |
| dream-slide-design | "设计幻灯片/演示文稿/汇报 PPT" | 页型化演示文稿（16:9 网格 + 演讲者备注 + 可编辑源文件） | 每页一个信息焦点、图表页带结论、源文件可渲染 |
| dream-banner-design | "设计 banner/海报/营销图/开屏" | 多尺寸横幅（构图模式 + 单一 CTA + 源文件与导出规格） | 单一视觉焦点、一个 CTA、尺寸齐全无变形 |

### 验证层
| 技能 | 触发场景/话术 | 关键产物 | 验收要点 |
|---|---|---|---|
| dream-review | 变更完成、验证门之前 | 问题分级清单（阻断/建议） | 阻断项清零 |
| dream-verify | 任何"宣称完成"前（强制收口） | PASS/FAIL 判决 + 证据附件 | 判决附证据，FAIL 附缺口 |
| dream-webapp-test | 有 UI 的变更；"浏览器验证" | E2E 用例与通过记录 | 关键流程真实浏览器通过 |
| dream-perf-audit | 性能敏感变更；发布前 | Lighthouse/CWV 指标报告 | 指标达标或列入债务 |
| dream-security-check | 涉及输入/权限/数据的变更 | 安全清单结论 | 高危项清零 |

---

## 3. 场景配方（用哪几个技能）

| 场景 | 技能链（balanced 模式） |
|---|---|
| 新功能 | propose → brainstorm → plan → implement（+tdd/design/ui）→ review → verify |
| 改 bug | debug → tdd（补回归测试）→ git → review → verify（冒烟即可） |
| 重构 | propose → plan → tdd（先补特性测试）→ implement → review → verify |
| 纯 UI 优化 | design-system → style-library（可选）→ ui-polish → webapp-test → verify |
| 演示文稿 | slide-design（结构→版式→逐页→备注）→ review → verify |
| 营销视觉 | banner-design（需求卡→构图→多尺寸→交付）→ review → verify |
| 性能优化 | perf-audit（先测基线）→ plan → execute → perf-audit（复测）→ verify |
| 安全加固 | security-check → plan → execute → review → verify |
| 原型探索 | light 模式：plan（一句话）→ execute → verify（运行冒烟） |

---

## 4. CLI 参考（dreamskills 统一命令 / scripts/dream.mjs）

```bash
# 安装与部署（openspec 式终端部署，跨 Windows/Linux/macOS · x64/arm64/x86）
dreamskills install  [--target claude|opencode|codex|all] [--project] [--dir <路径>] [--dry-run]
dreamskills update                        # 同 install（幂等，自动备份旧技能）
dreamskills uninstall [--target ...] [--project] [--commands] [--purge-dreamspec] [--force] [--dir <路径>] [--dry-run]
                                          # 卸载：默认备份式移除（可恢复）；--force 永久删除；--commands 连斜杠命令一起卸载
dreamskills commands [--target claude|opencode|all]   # 生成 /dream-* 斜杠命令
dreamskills doctor                        # 环境与安装自检（OS/架构/Node/技能/代理/治理文件）

# 规格生命周期
dreamskills init                          # 初始化治理骨架（.dreamspec 等）
dreamskills propose "用户登录"            # 创建变更提案（编号自动递增）
dreamskills status                        # 查看提案状态（proposed/implementing/archived）
dreamskills validate 001                  # 校验提案（结构 + Given-When-Then 可验证性）
dreamskills archive 001                   # 归档提案到 archive/（实施完成且验证通过后）
dreamskills verify                        # 打印当前强度模式下的验证门清单（提醒用）

# 等价形式：node scripts/dream.mjs <同上命令>（无 npm 全局安装时）
```

> CLI 只做文件生命周期管理与部署（创建/移动/登记/校验/自检）；技能内容与验证执行仍由 agent 完成——**CLI 是辅助，SKILL.md 是主体**，这也符合"spec 用纯 Markdown 即可、不绑架工具链"的设计。

---

## 5. 三档强度模式的裁剪规则速查

| 环节 | rigorous | balanced | light |
|---|---|---|---|
| spec 提案 | 所有变更 | 功能/行为变更 | 可跳过（plan 一句话说明） |
| brainstorm | 强制 | 需求含糊时 | 跳过 |
| TDD | 全量 | 核心路径 | 可选 |
| E2E 浏览器验证 | 全量关键+边界 | 关键流程 | 冒烟即可 |
| 性能审计 | 每次交付 | 性能敏感变更 | 跳过 |
| 安全清单 | 每次交付 | 涉输入/权限/数据时 | 高危目测 |
| 验证门证据 | 全套证据 | 测试+构建+E2E | 构建+运行 |

---

## 7. 多平台操作差异（Claude Code / OpenCode / Codex）

| 事项 | Claude Code | OpenCode | Codex CLI |
|---|---|---|---|
| 触发技能 | 自然语言（自动识别触发词）或 `/dream-*` 命令 | 自然语言或 `/dream-*` 命令（参数经 `$ARGUMENTS` 注入） | 仅自然语言："用 dream-xxx 做……"（技能是模型工具，无斜杠命令） |
| 斜杠命令 | `.claude/commands/dream-*.md`（`node scripts/build-commands.mjs` 生成） | `.opencode/commands/dream-*.md`（同上） | 无（勿用 `~/.codex/prompts/`，v0.117.0 已移除） |
| 项目记忆 | `CLAUDE.md` | `AGENTS.md`（项目+全局合并；也兼容 CLAUDE.md） | `AGENTS.md`（项目根 + `~/.codex/AGENTS.md`） |
| 技能目录 | `.claude/skills/` 或 `~/.claude/skills/` | `.opencode/skills/`（复数！）或 `~/.config/opencode/skills/` | `.codex/skills/` 或 `~/.codex/skills/` |
| references 加载 | 按需读取（SKILL.md"进阶资料"显式指示） | 同左（资源相对路径解析有 bug，失败时用绝对路径） | 同左 |

> 完整兼容性设计、坑点清单与安装后验证方法见 `docs/multi-platform.md`；安装命令见 README 第五节。

## 8. 常见问题

**Q：agent 没有自动触发技能怎么办？**
A：SKILL.md 的 description 含触发关键词（如"先写 spec""宣称完成前"），Claude Code 会自动识别；其他代理可显式说"遵循 skills/dream-verify/SKILL.md"。也可在 CLAUDE.md 写入工作流引用（模板已含）。

**Q：Dreamskills 与项目已有规范冲突？**
A：Dreamskills 遵循"最小侵入"：DESIGN.md / CLAUDE.md 只合并、不覆盖；冲突时以项目既有规范为准并在 SKILLS.md 注明豁免。

**Q：想新增一个技能？**
A：用 dream-skill-creator，产物直接放入 skills/ 目录，格式与官方 Agent Skills 规范完全一致，可随时共享给团队。
