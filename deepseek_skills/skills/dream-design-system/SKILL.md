---
name: dream-design-system
description: 在任何 UI 工作（新页面、新组件、样式修改、主题切换）开始之前使用，或在项目缺少设计规范/审美方向时使用。读取并补全项目 DESIGN.md 设计契约（色彩/字体阶梯/8pt 间距/圆角阴影/动效 tokens），确保组件全部由 tokens 派生、禁止硬编码；项目缺审美方向时可用"设计系统生成器"：输入品牌关键词 → 从风格库检索 → 推导完整 tokens 写入 DESIGN.md（多栈映射：CSS/Tailwind/React/Vue/Flutter/SwiftUI）；优先复用 registry 现成组件；tokens 变更需走提案流程。触发场景："任何 UI 工作前"、"遵循 DESIGN.md"、"先定设计 tokens"、"设计系统"、"tokens 先行"、"生成设计系统"。
---

# 设计系统契约（dream-design-system）

> 定位：设计层的入口技能。任何 UI 工作之前，先让项目拥有一份可执行的 DESIGN.md 设计契约，并保证所有界面从 tokens 派生。
> 吸收思想：anthropics frontend-design（结构化规范注入）+ ui-ux-pro-max（tokens 先行 + 设计系统生成器 + 多栈映射，功能全量对等、数据原创）+ shadcn（组件即资产、优先复用 registry）。

## 何时使用（触发条件）

- 任何 UI 工作开始之前：新页面、新组件、样式修改、主题切换；
- 项目缺少 DESIGN.md，或 tokens 不完整（缺字体阶梯/间距刻度/动效等章节）；
- 从零设计一个模块或产品时的第一步。

不适用：纯后端逻辑、无界面的一次性脚本、纯数据任务（不涉及视觉输出）。

## 核心原则

1. **tokens 先行**：先定契约后写界面；agent 执行 tokens 字段，而不是执行"好看一点"。
2. **组件从 tokens 派生**：禁止硬编码颜色、间距、圆角、阴影值——一律引用 DESIGN.md 字段名。
3. **组件即资产**：优先复用 registry/现成组件（如 shadcn/ui），代码归你所有、可读可改；确无合适者才自建。
4. **最小侵入**：已有 DESIGN.md 只合并缺失章节、不覆盖；品牌定制内容永远优先于通用默认。
5. **变更走提案**：tokens 的任何变更先 dream-spec-propose，确认后才更新 DESIGN.md。

## 工作流程

### 步骤 0：读取强度模式

- 读取 `.dreamspec/SKILLS.md`，确定 rigorous / balanced / light 裁剪范围。

### 步骤 1：读取 DESIGN.md（输入）

- 项目根目录存在 DESIGN.md → 读取并核对 tokens 章节完整性。
- 缺失或不完整 → 从 DESIGN.md.example 复制，引导用户填写 2–4 个设计关键词（气质宪法）与品牌色；记录缺失项。

### 步骤 2：校验 tokens 完整性（动作）

- 对照 references/tokens-spec.md 的完整性清单逐项核对：色彩（primary/surface/text/border/语义色）、字体阶梯、8pt 间距刻度、圆角阴影分级、动效时长缓动。
- 缺失项按 tokens-spec.md 默认建议补齐，并在 DESIGN.md 标注"默认值，待确认"。

### 步骤 3：设计系统生成器（可选：项目缺审美方向时）

- 触发条件：DESIGN.md 设计关键词为空，或用户要求"生成设计系统/定视觉基调"；
- 输入：品牌关键词 / 产品类型 / 目标气质（如"专业克制的 B2B SaaS"）；
- 动作：挂载 dream-style-library 检索风格、配色、字体候选 → 按 references/generator-workflow.md 的推导规则生成完整 tokens（色彩 8 字段+语义色 / 字体阶梯 / 间距 / 圆角阴影 / 动效）→ 写入 DESIGN.md 并标注"生成自：<风格+配色+字体组合>"；
- 产物：DESIGN.md 完整 tokens + 生成记录（组合来源与推导依据）；
- 生成结果须经用户确认后方可作为后续 UI 契约（与 dream-style-library 步骤 4 联动）。

### 步骤 4：优先复用（动作）

- 检索 registry/现成组件（shadcn/ui 等）与项目已有组件；
- 符合 tokens 的组件直接采用，登记来源；
- 组件视觉与 tokens 冲突时：优先调整选择（换组件或调 tokens），而不是绕过 tokens 硬编码。

### 步骤 5：自建组件派生自 tokens（产物）

确无合适组件时才自建，规则：

- 颜色/间距/圆角/阴影全部引用 DESIGN.md token 字段（CSS 变量或主题对象）；
- 组件名与用途登记到 DESIGN.md「组件清单与用法」表；
- 产物：组件代码 + 登记记录。

### 步骤 6：tokens 变更走提案（动作）

- 需要改 tokens（新增品牌色、调整间距刻度等）→ 走 dream-spec-propose 提案，确认后更新 DESIGN.md。

## 验收标准

- [ ] DESIGN.md 存在且 tokens 完整（色彩/字体阶梯/间距/圆角阴影/动效/组件清单）
- [ ] 若使用了设计系统生成器：DESIGN.md 标注了生成来源组合，且用户已确认
- [ ] 本次新增 UI 代码无硬编码颜色/间距/圆角值（grep 抽查通过）
- [ ] 组件来源已登记：registry 复用或自建（自建注明理由）
- [ ] tokens 变更已走提案流程并获得确认（若发生变更）
- [ ] light 模式：至少确认 DESIGN.md 存在且含色彩、间距两章

## 与其他技能的衔接

- 上游：dream-bootstrap（初始化 DESIGN.md）、dream-style-library（设计系统生成器与风格选择的审美来源，关键词检索 50 风格/21 配色/50 字体）
- 下游：dream-ui-polish（按 tokens 打磨）、dream-spec-implement / dream-execute（UI 实现时遵循本技能产物）
- 验证：dream-webapp-test（浏览器验证）、dream-verify（验证门收口）
- 强度模式：light 可跳过步骤 4–5 的完整登记，仅确认契约存在；balanced/rigorous 生成器可选

## 进阶资料

- references/tokens-spec.md：token 完整规格、命名规范、6 栈快速映射示例（CSS/Tailwind/React/Vue/Flutter/SwiftUI）（tokens 校验或快速跨平台实现时加载）
- references/tech-stacks.md：**22 个技术栈落地指南**（React/Vue/Angular/Svelte/Next.js/Nuxt/Flutter/SwiftUI/Jetpack Compose/Electron/WordPress/Webflow 等全谱：token 落地方式/组件库推荐/布局方案/坑点）（按目标栈落地 tokens 时加载）
- references/generator-workflow.md：设计系统生成器完整流程与 token 推导规则（从品牌关键词到 DESIGN.md 全字段，生成设计系统时加载）
