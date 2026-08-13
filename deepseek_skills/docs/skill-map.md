# 上游技能 → Dreamskills 映射对照表（取长补短）

> 依据：`../vibecoding-skills-analysis.md` 调研报告。本表展示每个上游项目的**核心优势**如何被 Dreamskills 吸收、其**已知弱点**如何被规避。

## 1. 整体映射

| 上游项目（星数约值） | 核心优势 | 吸收为 Dreamskills 技能/机制 | 已知弱点的规避机制 |
|---|---|---|---|
| obra/superpowers（20-27万★） | 方法论即代码；brainstorm/plan/TDD/调试/验证全套流程技能；工件即记忆 | `dream-brainstorm`、`dream-plan`、`dream-tdd`、`dream-debug`、`dream-verify`、`dream-skill-creator` | 费 token/僵硬 → 三档强度模式；计划分块；技能声明触发条件 |
| anthropics/skills（13.5-17万★） | SKILL.md 官方格式；渐进式披露；frontend-design 结构化设计规范；webapp-testing 真实浏览器验证 | 全部 20 个技能的格式与结构；`dream-design-system`；`dream-webapp-test`；references/ 渐进披露 | 无编排无强制 → 上下游衔接声明 + verify 验证门收口 |
| github/spec-kit（10-11.5万★） | spec 机器可校验（JSON Schema 思想）；bundles 渐进采纳；跨 30+ agent | `dream-spec-propose`（spec-delta 结构化 + GWT 可验语句）；CLI 生命周期管理 | 规格过重、学习成本 → 纯 Markdown 最小模板、CLI 兜底 |
| nextlevelbuilder/ui-ux-pro-max-skill（7.8-11.1万★） | 设计系统先行、tokens 派生组件；**13 主 CSV 设计数据库（84 风格/192 产品/192 配色/74 字体/161 推理规则/98 UX 指南/104 图标/25 图表/16 动效/35 落地页/1924 字体库）+ 22 技术栈 CSV**；Design System Generator；关键词搜索引擎；子技能拆分绕过上下文上限；专项子技能 ckm:slides / ckm:banner-design / ckm:ui-styling | **全数据域对等整合**：`dream-style-library`（13 数据域原创库：84/192/192/74/161/98/104/25/16/35/950 款真实字体，全带关键词索引）、`dream-design-system`（tokens 契约 + 设计系统生成器 + 22 技术栈落地）、`dream-ui-polish`（pro-rules 专业级规则）、**`dream-slide-design`（对标 ckm:slides 幻灯片设计）、`dream-banner-design`（对标 ckm:banner-design 横幅设计）**；架构等价：references 索引先行按需加载替代 CSV+脚本检索（纯 markdown 三平台一致） | 体积大、深度定制弱 → 索引先行渐进披露（不占上下文）+ 品牌定制优先 + 数据全部原创（不搬运其 CSV，规避版权与臃肿）；字体库 950 款零虚构（上游 1924，预留联网补录接口） |
| shadcn-ui/ui（8.3-11万★） | 组件即资产（代码归你所有）；registry 分发协议 | `dream-design-system` 的"优先复用 registry 组件"规则；`dream-execute` 的复用优先原则 | 只是组件层无美学 → 上方补 DESIGN.md 设计规范层 |
| mattpocock/skills（8万★） | 经验即技能、关键节点轻量注入 | `dream-tdd`/`dream-debug` 的"复现再猜根因"原则 | 无编排无强制门 → 纳入完整技能链 + 验证门 |
| Fission-AI/OpenSpec（5.7-6万★） | spec 即事实源；propose→implement→archive 生命周期；ADR 式变更管理 | `.dreamspec/` 目录结构；`dream-spec-propose/implement` 三阶段 | 无跨 agent 集成层 → spec 纯 Markdown 平台中立 + tasks.md 桥接执行 |
| kesslerio/taste-skill（4.1-6万★） | 反 slop 门控、do/don't 显式清单 | `dream-ui-polish` 的反 slop 自检清单 | 审美个人化 → 清单绑定 DESIGN.md tokens，可度量可评审 |
| wshobson/agents（3.8万★） | 角色即边界、子代理委派、编排层 | `dream-execute` 的可选子代理委派模式 | 角色僵硬/token 贵 → 委派设为可选、默认单代理顺序执行 |
| VoltAgent/awesome-claude-code-subagents（2.2万★） | 单职责子代理、目录即分类 | `dream-execute` 委派模式的角色模板参考 | 无编排层 → 由主代理按计划块编排 |
| sentinel / vibetest / vibetest-use（数百~数千★） | 判决式 QA（pass/fail）；对话即需求；真实浏览器验证 | `dream-verify` 的 PASS/FAIL 判决输出 | 判决靠 LLM → 判决必须附证据（命令输出/指标数值） |
| semgrep guardian（~千★） | 安全左移、语义扫描嵌入编码流程 | `dream-security-check` 清单 + 交付前必查 | 单维度 → 并入统一验证门 |
| performance-audit-skill / Speed-Guardrails | Lighthouse/CWV 指标护栏 | `dream-perf-audit` 基线→复测闭环 | 单维度 → 并入统一验证门 |

## 2. 逐维度的"取长补短"结论

| 维度 | 各家擅长 | Dreamskills 的整合决策 |
|---|---|---|
| 架构/规格 | spec-kit 重而全、OpenSpec 轻而专 | **取 OpenSpec 之轻（目录+Markdown），取 spec-kit 之严（结构化可验语句）**，用 CLI 兜底生命周期 |
| 流程/开发 | superpowers 纪律强但僵硬，mattpocock 轻但不编排 | **取 superpowers 之方法论内核，加三档强度模式解决僵硬**，mattpocock 式轻注入用于 light 档 |
| UI 设计 | anthropics 规范通用但保守；ui-ux-pro-max 丰富但臃肿；taste 直击痛点但主观 | **DESIGN.md tokens 为契约（可度量），设计系统生成器（关键词→全 tokens），13 数据域原创设计智能库（84/192/192/74/161/98/104/25/16/35/950 款真实字体，功能全量对等 ui-ux-pro-max 的 13 主 CSV、数据原创）+ 22 技术栈落地，反 slop 清单为门（有标准），pro-rules 高级规则（有深度）**，reference-first 为流程（不绑平台） |
| 测试验证 | superpowers 流程门 + sentinel 判决 + lighthouse 指标护栏 | **统一为 dream-verify 验证门：证据驱动的 PASS/FAIL 判决**，上游各家作为证据来源 |

## 3. 一句话总结

> Dreamskills = OpenSpec 的骨架 + spec-kit 的严谨 + superpowers 的纪律（减去僵硬）+ anthropics 的格式与设计规范 + **ui-ux-pro-max 的全量设计数据库（13 数据域：84 风格/192 产品/192 配色/74 字体/161 推理规则/98 UX 指南/104 图标/25 图表/16 动效/35 落地页/950 款真实字体库 + 22 技术栈，数据全部原创）** + taste-skill 的门控（减去主观）+ shadcn 的组件资产观 + sentinel 的判决制 + lighthouse/semgrep 的护栏——用统一的验证门收口。
