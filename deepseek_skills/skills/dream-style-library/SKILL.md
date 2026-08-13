---
name: dream-style-library
description: 当用户需要风格建议、项目 DESIGN.md 缺乏审美方向（设计关键词为空或未定）、需要配色/字体搭配/图标/图表/动效/落地页参考，或想"换个风格"时使用。从原创设计智能库（84 风格 × 192 产品 × 192 配色 × 74 字体搭配 × 161 推理规则 × 98 UX 指南 × 104 图标 × 25 图表 × 16 动效 × 35 落地页 × 950 款真实字体大目录，全部含关键词索引，可按产品类型/气质/场景检索）中推荐组合（风格+配色+字体+组件倾向），经用户确认后把组合值写入 DESIGN.md 成为项目契约；品牌定制优先于库。触发场景："换个风格"、"配色建议"、"字体搭配"、"图标规范"、"图表选型"、"动效规格"、"落地页结构"、"检索设计库"。
---

# 风格组合库（dream-style-library）

> 定位：设计层的审美来源。当项目缺审美方向时，从库中检索推荐组合；选定后写入 DESIGN.md，库本身永不修改项目。
> 吸收思想：ui-ux-pro-max（设计数据库 + 检索式"设计决策目录"——功能全量对标其 13 个主数据域（84 风格/192 产品/192 配色/74 字体/161 推理规则/98 UX 指南/104 图标/25 图表/16 动效/35 落地页/字体库）与 22 技术栈数据，数据为 Dreamskills 原创设计，以 references 索引先行按需加载替代其 CSV+脚本检索，三平台一致）。

## 何时使用（触发条件）

- 用户要风格建议："换个风格"、"配色建议"、"字体搭配"；
- DESIGN.md 设计关键词为空、缺乏审美方向；
- 新项目初始化时需确定视觉基调。

不适用：已有品牌规范或品牌色（品牌定制优先，只借鉴布局/排版思路）；DESIGN.md 已定风格且用户满意；纯功能变更。

## 核心原则

1. **库是参考不是约束**：推荐组合由用户确认后才生效，库不自动改变项目。
2. **品牌定制优先**：有品牌色/VI 时，只借鉴布局、排版与质感思路，不套用库配色。
3. **组合必须完整**：风格名 + 气质 + 适用场景 + 配色 tokens + 字体搭配 + 组件倾向，缺一不可。
4. **选定即契约**：确认后把组合值映射写入 DESIGN.md（字段名与 DESIGN.md.example 一致），成为后续所有 UI 的契约。
5. **库不改项目**：references/ 数据文件只读；选择只发生在项目文件里。

## 工作流程

### 步骤 0：读取强度模式

- 读取 `.dreamspec/SKILLS.md`，确定 rigorous / balanced / light 裁剪范围。

### 步骤 1：判断场景（输入）

- 有品牌规范/品牌色 → 跳过配色推荐，只给出布局/排版借鉴（如 Swiss 网格、Editorial 排版），并说明"品牌色优先于库"。
- 无品牌规范 → 进入检索。

### 步骤 2：关键词检索（动作）

- 检索顺序（索引先行、渐进披露，避免全量加载）：
  1. **产品类型定位**：加载 references/products.md 的索引，按产品类型找到该产品的推荐风格/配色/字体编号；
  2. **三要素精读**：加载 references/styles.md、palettes.md、font-pairings.md 的索引定位候选编号，再精读对应条目；
  3. 结合用户偏好（如"专业""活泼""科技感"）筛选；
- 产物：2–3 个候选组合，每个含完整六要素（风格+气质+场景+配色 tokens+字体+组件倾向）+ 推荐理由（可引用 products.md 的产品匹配依据）。

### 步骤 2b：专项规范检索（按需）

- 设计任务涉及以下专项时，加载对应库的索引并精读相关条目：

  | 任务 | 库文件 |
  |---|---|
  | 设计决策推导（无用户偏好时） | references/reasoning-rules.md（161 条 IF→THEN） |
  | 可用性/交互规范 | references/ux-guidelines.md（98 条） |
  | 图标风格与绘制 | references/icon-guide.md（104 条） |
  | 图表选型与样式 | references/chart-guide.md（25 种） |
  | 动效规格 | references/motion-guide.md（16 种） |
  | 营销/官网结构 | references/landing-patterns.md（35 种） |
  | 全量字体检索 | references/font-library.md（950 款真实字体，扩充中） |

- 产物：专项规范引用记录（条目编号 + 采用的决策）。

### 步骤 3：呈现与确认（动作）

- 向用户展示候选组合（含配色 token 预览与字体搭配说明）；
- 询问选择；必要时追问"更克制还是更有表现力？"。

### 步骤 4：写入 DESIGN.md（产物）

- 将选定组合映射到 DESIGN.md tokens 字段：
  - 配色 → 色彩 Tokens（primary/surface/text/border/语义色等）；
  - 字体 → 字体与排版（字体族/字号阶梯/行高字重）；
  - 组件倾向 → 组件清单与用法；
  - 更新「设计关键词」为组合气质词。
- 若风格影响面大（整站改版）→ 先走 dream-spec-propose 提案，确认后写入。

## 验收标准

- [ ] 推荐组合完整（风格名/气质/适用场景/配色/字体/组件倾向）
- [ ] 配色与字体已映射到 DESIGN.md 对应 token 字段（字段名与 DESIGN.md.example 一致）
- [ ] 字号阶梯符合 8pt 网格与排版规则（正文 ≥16px、行高 1.6）
- [ ] 用户已确认选择（有记录）
- [ ] 品牌定制场景未套用库配色（只借鉴布局/排版）
- [ ] light 模式：给出 1 组推荐并写入 DESIGN.md 即可

## 与其他技能的衔接

- 上游：dream-design-system（tokens 契约骨架；本技能为其提供审美方向）
- 下游：dream-ui-polish（依据新 tokens 打磨）、dream-spec-implement / dream-execute（UI 实现遵循新契约）
- 变更纪律：整站风格改版属行为变更，先走 dream-spec-propose
- 验证：dream-webapp-test / dream-verify（验证新风格落地）
- 强度模式：light 单组快速推荐；balanced 候选 2–3 组；rigorous 附候选对比矩阵

## 进阶资料

- references/styles.md：原创 **84 种**设计风格（气质/布局/组件/场景/避坑 + 关键词索引）——检索风格时先查索引再精读条目
- references/products.md：原创 **192 种**产品类型（每产品带推荐风格/配色/字体编号）——检索第一步按产品类型定位
- references/palettes.md：原创 **192 组**配色 tokens（8 token 字段 + 规则 + 关键词索引）——推荐配色时加载
- references/font-pairings.md：原创 **74 组**字体搭配（标题/正文/字号阶梯/气质/中文回退 + 关键词索引）——推荐字体时加载
- references/reasoning-rules.md：原创 **161 条**设计推理规则（IF→THEN）——无用户偏好时推导决策
- references/ux-guidelines.md：原创 **98 条** UX 指南——可用性/交互规范
- references/icon-guide.md：原创 **104 条**图标规范——图标风格与绘制
- references/chart-guide.md：原创 **25 种**图表类型——选型与样式
- references/motion-guide.md：原创 **16 种**动效模式——动效规格
- references/landing-patterns.md：原创 **35 种**落地页模式——营销/官网结构
- references/font-library.md：原创字体大目录（**950 款**真实开源/系统字体，9 分类检索，持续扩充接口已预留）——全量字体检索
- 技术栈落地（22 栈）见 dream-design-system 的 references/tech-stacks.md
- 容量说明：全部数据文件索引先行、按需加载——功能规模全量对等 ui-ux-pro-max 的 CSV 数据库，但以更轻的 references 渐进式披露实现，且为纯 markdown（无 CSV 解析依赖，三平台 Read 工具一致可用）
