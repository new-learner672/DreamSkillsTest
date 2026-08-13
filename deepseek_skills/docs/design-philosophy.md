# Dreamskills 设计思路（Design Philosophy）

> 本文档回答三个问题：**为什么这样设计？每条理念吸收自谁？如何避开上游项目的已知弱点？**
> 上游项目分析依据：`../vibecoding-skills-analysis.md`（GitHub 高星 vibecoding skills 全景调研报告）。

---

## 0. 问题定义：Vibe Coding 的五大痛点

调研所有头部项目后，可归纳出纯"氛围编程"（vibe coding）的五个系统性缺陷。Dreamskills 的每一项设计都对应其中至少一个痛点：

| # | 痛点 | 表现 | 对症的上游思想 |
|---|---|---|---|
| P1 | **无据可依** | 需求在对话里漂移，AI 和人对"要做成什么"认知不一致 | spec-first（spec-kit / OpenSpec） |
| P2 | **无流程** | AI"想到哪写到哪"，长任务上下文漂移、中途跑偏 | 方法论即代码（superpowers） |
| P3 | **无审美** | 界面"AI 味"重：模板感、灰蒙蒙、间距失控 | 结构化设计规范 + 反 slop（anthropics / taste-skill） |
| P4 | **无验证** | AI 宣称"完成"但没跑过测试，甚至没启动过应用 | trust but verify、判决式 QA（superpowers / sentinel） |
| P5 | **无积累** | 每次从零开始，经验不沉淀、团队标准不可复用 | 技能即文件、元技能自进化（anthropics / superpowers） |

---

## 1. 九大设计支柱

### 支柱 1：规格即契约 —— Spec as Source of Truth

- **吸收自**：OpenSpec（spec 与代码同仓、propose→implement→archive 生命周期）+ spec-kit（规格机器可校验、渐进采纳）。
- **Dreamskills 做法**：`.dreamspec/` 目录三阶段生命周期；`spec-delta.md` 强制 Given-When-Then 验收语句；CLI（`scripts/dream.mjs`）管理提案/归档。
- **改进上游弱点**：spec-kit 被批评"90% 的工程师只用它解决了 10% 的问题"（规格过重、学习成本高）→ Dreamskills 用 OpenSpec 式**纯 Markdown + 最小模板**降低门槛；OpenSpec 被批评"无跨 agent 集成层"→ Dreamskills 的 spec 格式同时兼容任意 agent 阅读，并以 `tasks.md` 作为执行层桥接（spec-kit 的 bundle 思想）。
- **对应痛点**：P1、P5。

### 支柱 2：计划落盘 —— 工件即记忆（Externalized Memory）

- **吸收自**：superpowers 的 writing-plans/executing-plans（plan 必须写文件）。
- **Dreamskills 做法**：`dream-plan` 强制把计划写入 `.dreamspec/changes/<id>/tasks.md` 并**分块**（每块 ≤ 半天工作量、含验收点），执行时逐块加载。
- **改进上游弱点**：superpowers 被诟病"费 token、计划冗长"→ 分块 + 渐进式披露只加载当前块；三档强度模式下 light 档计划简化为任务清单。
- **对应痛点**：P2（上下文漂移的根本应对：工件不依赖上下文窗口）。

### 支柱 3：状态机式流程 —— 有纪律但不僵硬

- **吸收自**：superpowers 的状态机流程（Brainstorm→Plan→Execute→Verify 不可跳步）+ anthropics 的"建议式"轻量。
- **Dreamskills 做法**：流程定义为"技能触发条件 + 必须产物 + 验收标准"，agent 不能跳步；但引入 **rigorous / balanced / light 三档强度模式**（声明于 `.dreamspec/SKILLS.md`），每档裁剪哪些步骤有明确规则。
- **改进上游弱点**：superpowers 被实测批评"全部启用时行为僵硬、小任务过度工程、选错组合让 AI 精神分裂"→ 三档模式 + 每个技能内标注"light 可跳过"，把"裁剪决策"从用户凭感觉变为项目级一次声明。
- **对应痛点**：P2。

### 支柱 4：红-绿-重构为默认路径

- **吸收自**：superpowers 的 TDD loop（强制）+ anthropics 官方 TDD（限制单次变更规模）+ mattpocock（TDD 先行、轻量注入）。
- **Dreamskills 做法**：`dream-tdd` 规定"先写失败测试→最小实现→重构"，并附测试坏味道清单（references/）；balanced 模式覆盖核心路径，light 模式可豁免。
- **改进上游弱点**：superpowers 全量强制被批"重"→ 覆盖范围分级（rigorous 全量 / balanced 核心 / light 可选）。
- **对应痛点**：P4。

### 支柱 5：结构化规范 > 自然语言审美 —— 设计系统化 + 全量设计智能

- **吸收自**：anthropics frontend-design（agent 听不懂"好看一点"，听得懂"8pt 网格、16px/1.6 行高、主色≤2"）+ ui-ux-pro-max 的**全部设计要素**（tokens 先行、Design System Generator、13 主 CSV 设计数据库、22 技术栈 CSV、pro-rules、子技能拆分架构）。
- **Dreamskills 做法**：
  - `DESIGN.md` 作为项目级结构化设计契约（色彩/字体/间距/圆角/动效 tokens）；
  - `dream-design-system`：tokens 先行 + **设计系统生成器**（品牌关键词 → 检索风格库 → 按推导规则生成完整 tokens，含语义色/圆角/阴影/动效分级规则）+ **22 技术栈落地指南**（对等其 22 技术栈 CSV）；
  - `dream-style-library`：**原创 13 数据域设计智能库**——84 风格 × 192 产品 × 192 配色 × 74 字体 × 161 推理规则 × 98 UX 指南 × 104 图标 × 25 图表 × 16 动效 × 35 落地页 × 950 款真实字体大目录（零虚构、可联网扩充至 1924），每个数据文件带**关键词索引**（可检索设计决策目录），功能规模全量对等 ui-ux-pro-max 的 13 主 CSV；
  - `dream-ui-polish`：分层打磨 + 反 slop 门控 + **pro-rules 专业级规则**（动效/数据可视化/深色模式/状态设计/hero 模式等）。
- **改进上游弱点**：ui-ux-pro-max 被批"体积大、选风格仍需人判断、深度定制弱"→ 用 **references 渐进式披露 + 索引先行**实现同等数据规模而不占上下文（替代其"子技能拆分绕过 12 技能上限"的技巧）；**品牌定制优先于风格库**（有品牌色时只借鉴布局/排版）；数据 100% 原创设计（风格名/色值/字体组合均不与上游重复）；anthropics 被批"避免丑而非追求惊艳"→ "反 slop 清单 + 参考锚定 + pro 规则"三件套追求质感。
- **对应痛点**：P3。

### 支柱 6：reference-first + 反 slop 门控

- **吸收自**：taste-skill（do/don't 显式对照、品味工程化）+ magic-mcp（先检索真实组件锚定审美再生成）+ shadcn（组件即资产、优先复用 registry）。
- **Dreamskills 做法**：`dream-ui-polish` 内置**反 slop 清单**（AI 味信号逐项自检）+ **pro-rules 专业级规则**（动效/数据可视化/深色模式/状态设计/hero 模式/间距节奏/微交互/响应式/性能）+ "先找参考/现成组件，再自己写"的强制顺序；`dream-design-system` 要求组件优先复用 registry（shadcn 等）。
- **改进上游弱点**：taste-skill 被批"品味标准偏作者个人化、无 token 支撑"→ Dreamskills 把审美规则绑定到项目 DESIGN.md tokens 上，可度量、可评审；magic-mcp 被批"依赖平台"→ 参考锚定是流程规则而非平台依赖。
- **对应痛点**：P3。

### 支柱 7：判决式验证门 —— 交付 = 证据通过

- **吸收自**：superpowers 的 verification-before-completion（完成前必须验证）+ sentinel（pass/fail 二元判决）+ webapp-testing（真实浏览器验证）+ Lighthouse 性能护栏。
- **Dreamskills 做法**：`dream-verify` 是**所有交付路径的收口**：按强度模式收集验证证据（测试通过、构建成功、浏览器 E2E、性能指标、安全检查），输出结构化 **PASS/FAIL 判决**；FAIL 必须列出缺口并回到对应技能修复。`dream-review` 前置把关。
- **改进上游弱点**：sentinel 被批"判决可信度依赖 LLM"→ 判决必须**附证据**（命令输出、指标数值），人只仲裁；webapp-testing 被批"建议式无强制"→ 在 Dreamskills 中 E2E 是 balanced 档的必选项。
- **对应痛点**：P4。

### 支柱 8：原子化技能 + 渐进式披露

- **吸收自**：anthropics 官方规范第一原则（SKILL.md 简洁、细节放 references 按需加载）+ superpowers 的原子化组合。
- **Dreamskills 做法**：20 个技能各司其职；每个 SKILL.md ≤ 150 行，正文只含触发条件、原则、流程、验收、衔接；模板/清单/数据放 `references/`。技能间以"上游/下游"显式声明调用关系。
- **改进上游弱点**：anthropics 被批"技能间无编排、无强制门"→ Dreamskills 通过"上游/下游衔接 + 验证门收口"补上编排；superpowers 被批"技能组合靠用户摸索"→ 每个技能声明自己的触发条件与衔接关系。
- **对应痛点**：P5（可组合性保证经验可沉淀）。

### 支柱 9：可选的角色化委派与元技能自进化

- **吸收自**：wshobson/agents（角色即边界、子代理委派）+ VoltAgent（单职责子代理）+ superpowers 的 writing-skills（元技能）。
- **Dreamskills 做法**：`dream-execute` 内置**可选**子代理委派模式（复杂任务拆给 frontend/backend/tester 角色，主代理编排整合）——注意是可选，避免"角色边界僵硬、来回移交低效"的上游痛点；`dream-skill-creator` 元技能让团队把踩坑经验固化为新技能，持续进化。
- **对应痛点**：P5。

---

## 2. 取长补短总表

| 上游项目 | 核心优势（吸收） | 已知弱点（规避机制） |
|---|---|---|
| superpowers | 方法论即代码、工件即记忆、验证门 | 费 token/僵硬 → 三档强度模式；计划分块 |
| anthropics/skills | SKILL.md 规范、渐进披露、frontend-design | 无编排无强制 → 上下游衔接 + 验证门收口 |
| spec-kit | spec 机器可校验、跨 agent | 学习成本高 → 最小模板、CLI 兜底 |
| OpenSpec | 轻量同仓、变更生命周期 | 无跨 agent 层 → spec 文件平台中立 + tasks.md 桥接 |
| ui-ux-pro-max | tokens 先行、风格组合、设计系统生成器、多栈映射、CSV 设计数据库 | 体积大/定制弱 → 13 数据域（84/192/192/74/161/98/104/25/16/35/950 款真实字体）+ 22 技术栈功能全量对等（数据原创）+ 关键词检索渐进加载 + 品牌定制优先 |
| taste-skill | 反 slop 门控 | 审美个人化 → 绑定 DESIGN.md tokens 可度量 |
| shadcn/ui | 组件即资产、registry | 只是组件层 → 用设计规范层（DESIGN.md）补美学 |
| magic-mcp | reference-first 锚定 | 依赖平台 → 转成流程规则，不依赖具体平台 |
| mattpocock/skills | 轻量、经验即技能 | 无编排 → 纳入流程技能链 |
| sentinel/vibetest | 判决式 QA、验收闭环 | 判决靠 LLM → 判决必须附证据 |
| wshobson/agents | 角色委派、编排层 | 角色僵硬、token 贵 → 委派设为可选模式 |
| semgrep/lighthouse 系 | 安全左移、性能护栏 | 单维度、生态散 → 并入统一验证门 |

---

## 3. 边界与反模式（何时不用 Dreamskills）

1. **一次性脚本 / 10 分钟小任务**：直接用 light 模式的最小链路（plan→execute→verify 冒烟），不要走完整 spec 流程——纪律服务于目标，而非相反。
2. **已有成熟 CI/CD 与 PR 流程的团队**：Dreamskills 的验证门可与 CI 并存；避免双重流程，可用 verify 输出对接 CI 而非取代。
3. **纯探索性实验**（原型验证想法）：light 模式 + 跳过 spec，探索完成后再补提案归档。
4. **反模式警告**：不要"全技能常开"——20 个技能同时注入上下文是本末倒置；应随流水线按需触发（每个技能声明了触发条件）。

---

## 4. 与其他框架的定位差异（一句话）

- vs superpowers：**更省 token、更不僵硬**（三档模式 + 分块计划），但保留其方法论内核；
- vs spec-kit：**更轻、更易上手**（纯 Markdown 最小模板），保留 spec 契约思想；
- vs OpenSpec：**多了设计与验证两个完整维度**，不只是规格层；
- vs ui-ux-pro-max：**功能全量对等、数据原创精简**（13 数据域：84 风格/192 产品/192 配色/74 字体/161 推理规则/98 UX 指南/104 图标/25 图表/16 动效/35 落地页/950 款真实字体库（上游 1924，零虚构原则宁缺毋滥、可联网补录）+ 22 技术栈落地 + 关键词检索 + 设计系统生成器 + pro-rules 全部收录，数据自行设计而非搬运其 CSV），设计 tokens 为项目级契约；
- vs 官方 anthropics/skills：**从"参考实现"升级为"端到端治理体系"**，格式仍 100% 兼容官方规范。
