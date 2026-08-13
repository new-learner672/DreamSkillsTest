---
name: dream-ui-polish
description: 在界面功能已正确、需要提升视觉质感时使用，或在交付前做视觉自检时使用。按"先布局层次、再细节质感"分层打磨界面；动手前先找参考（现有设计/优质组件/风格库）锚定审美而非凭空生成；打磨后对照反 slop 清单逐项自检并注明豁免；兼顾响应式、深色模式与无障碍（WCAG AA）。触发场景："打磨界面"、"界面像 AI 生成的"、"反 slop 自检"、"视觉优化"、"界面不好看"。
---

# 界面渐进打磨（dream-ui-polish）

> 定位：设计层的质感执行者。功能正确之后，用"分层打磨 + 参考锚定 + 反 slop 门控"把界面从"能用"推到"好看且不油腻"。
> 吸收思想：taste-skill（反 slop 门控，绑定 DESIGN.md tokens 使其可度量）+ anthropics progressive refinement（渐进打磨）+ magic-mcp（reference-first 流程化）。

## 何时使用（触发条件）

- 界面功能已正确、需提升视觉质感；
- "界面像 AI 生成的"：模板感、灰蒙蒙、间距失控；
- 交付前（dream-verify 之前）的视觉自检。

不适用：功能尚未正确（先实现功能再打磨）；无 UI 的变更；light 模式下的临时脚本页面（冒烟即可）。

## 核心原则

1. **分层打磨**：先功能正确 → 再布局与视觉层次 → 最后细节质感；不追求一次成型"精美但跑不通"。
2. **reference-first**：动手前先找参考（项目现有设计/优质组件/风格库），用参考锚定审美，而非凭空生成。
3. **反 slop 门控**：打磨后对照清单逐项自检；任何未达标项要么修复、要么注明豁免理由。
4. **尊重 tokens**：打磨只调整 DESIGN.md token 派生值，不引入新的硬编码。
5. **三端兼顾**：响应式（≥2 断点）、深色模式（若项目支持）、无障碍（WCAG AA）。

## 工作流程

### 步骤 0：读取强度模式

- 读取 `.dreamspec/SKILLS.md`，确定 rigorous / balanced / light 裁剪范围。

### 步骤 1：前置检查（输入）

- 功能是否已正确（测试/冒烟通过）？未通过 → 回退到功能实现，不进入打磨。
- DESIGN.md 是否就绪？缺失 → 先调用 dream-design-system。

### 步骤 2：找参考（动作）

- 检索：项目现有页面、registry 优质组件、dream-style-library 风格库；
- 记录参考来源与借用的具体点（间距节奏/层级方式/组件样式）；
- 产物：参考清单（来源 + 借用点）。

### 步骤 3：打磨 pass 1 —— 布局与视觉层次（动作）

- 对齐 8pt 网格、统一间距节奏；建立明确视觉重心（标题层级/主次区块）；
- 检查留白呼吸感：不是每块内容都塞卡片。

### 步骤 4：打磨 pass 2 —— 细节质感（动作）

- 色彩克制（主色 ≤2、语义色不乱用）；排版层级三档（标题/正文/辅助）；
- 圆角阴影按 token 分级使用；图标同源同尺寸（规范细节按需加载 dream-style-library 的 references/icon-guide.md：104 条图标规范）；图表样式按 chart-guide.md（25 种选型与样式）；动效服务反馈、时长 150–300ms（规格按 motion-guide.md 16 种模式）；
- 加载 references/pro-rules.md，按需执行高级规则：动效/数据可视化/深色模式/状态设计/hero 模式/间距节奏/微交互/响应式进阶/性能友好。

### 步骤 5：反 slop 自检（产物）

- 加载 references/anti-slop-checklist.md 逐项检查；
- 产物：自检清单（每项标记 通过 / 豁免+理由）。

### 步骤 6：响应式与无障碍（动作）

- 加载 references/a11y-checklist.md；≥2 断点检查、深色模式核对、关键 a11y 项（对比度/焦点/语义/键盘可达）。

## 验收标准

- [ ] 反 slop 清单逐项通过或注明豁免理由
- [ ] a11y 清单关键项通过（文本对比度 ≥4.5:1、focus 可见、语义正确）
- [ ] ≥2 断点响应式可用；深色模式无硬编码浅色值（若项目支持深色）
- [ ] 打磨记录（参考清单 + pass1/pass2 改动 + 自检结果）已写入变更提案目录
- [ ] 无新增硬编码颜色/间距值
- [ ] light 模式：pass 1 + 反 slop 快速自检即可（跳过 a11y 全量）

## 与其他技能的衔接

- 上游：dream-design-system（tokens 契约）、dream-style-library（风格方向，可选）
- 下游：dream-review（审查打磨记录与豁免）、dream-webapp-test（真实浏览器验证打磨结果）、dream-verify（验证门收口）
- 强度模式：rigorous 全量（含 a11y 全项与深色核对）；balanced 关键流程；light pass 1 + 快速自检

## 进阶资料

- references/anti-slop-checklist.md：AI 味信号 do/don't 清单（打磨完成后逐项自检时加载）
- references/pro-rules.md：专业级打磨规则（动效/数据可视化/深色模式/状态设计/hero 模式/间距节奏/微交互/响应式/性能——pass 2 细节质感时按需加载）
- references/a11y-checklist.md：WCAG AA 关键项清单（响应式/无障碍检查时加载）
