# 设计 Token 架构与组件规范（整合自 UI UX Pro Max design-system skill）

## 三层 Token 结构

```
Primitive（原始值）        →  Semantic（用途别名）       →  Component（组件专用）
--color-blue-600: #2563EB;   --color-primary: var(--color-blue-600);   --button-bg: var(--color-primary);
```

- **Primitive**：只描述值（颜色/尺寸/字体），不含语义；来源是品牌指南
- **Semantic**：描述用途（primary/background/muted/border/destructive），支撑明暗主题切换
- **Component**：组件专用（--button-bg、--card-padding），支持逐组件定制

## 命名规范

- 颜色：`--color-{色相}-{深浅}`（primitive）、`--color-{角色}`（semantic，角色 ∈ primary/on-primary/secondary/accent/background/foreground/card/muted/border/destructive/ring）
- 间距：`--space-{1..96}`（4/8 倍数刻度，密度滑杆决定使用范围）
- 圆角：`--radius-{sm|md|lg|full}`；阴影：`--shadow-{sm|md|lg}`
- 每个 token 记录用途注释；HSL 便于透明度控制（`hsl(var(--primary) / 0.5)`）

## 组件状态规范（Default/Hover/Active/Disabled 四态）

| 属性 | Default | Hover | Active | Disabled |
|---|---|---|---|---|
| Background | primary | primary-dark | primary-darker | muted |
| Text | on-primary | on-primary | on-primary | muted-fg |
| Border | none | none | none | muted-border |
| Shadow | sm | md | none | none |

规则：状态用 token 表达（不许裸 hex）；语义层支撑暗色模式；CSS 变量在 `:root` 与 `.dark` 两个作用域定义。

## 验证

- 代码中禁止裸 hex（例外须注释说明）——审查点：`#[0-9a-fA-F]{3,8}` 出现在 CSS/组件中
- 生成的 tokens.css 必须通过校验：变量引用存在、命名合规、无未定义引用

## 品牌合规幻灯片（Slide 系统）

事实源：brand-guidelines.md + design-tokens.json + design-tokens.css + slide-animations.css。

### 上下文决策流

1. 解析演示目标（说服/汇报/教学）
2. 选 deck 结构（15 种策略：问题-方案、叙事弧、对比矩阵等，`slide-strategies` 思路）
3. 逐页决策：目标 → 布局（25 种：大标题/双栏/全屏图/图表页/引用页）→ 字体 → 色彩逻辑（情绪→色彩）→ 图表（25 种 + Chart.js 配置）→ 文案（25 公式：PAS/AIDA/FAB/STAR 等）
4. **Pattern Breaking（Duarte Sparkline）**：在 1/3、2/3 位置设计情绪反转点（frustration↔hope），打破单调节奏
5. 生成 HTML → token 校验

### 硬性要求（MUST）

- ① 导入 design-tokens.css；② 只用 `var()`；③ 图表用 Chart.js（禁止纯 CSS 条形）；④ 含键盘导航（方向键、点击、进度条）；⑤ 内容居中；⑥ 聚焦说服/转化

### 文案公式速查（25 式中高频）

- **PAS**：Problem（痛点）→ Agitate（放大）→ Solution（方案）
- **AIDA**：Attention → Interest → Desire → Action
- **FAB**：Feature → Advantage → Benefit
- **STAR**：Situation → Task → Action → Result
- 每页一个核心观点；标题 ≤8 词（中文 ≤15 字）；数据优先于形容词
