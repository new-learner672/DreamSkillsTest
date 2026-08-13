# 设计系统生成器工作流（references）

> 本文件由 dream-design-system 的"步骤 3：设计系统生成器"按需加载。
> 功能对等 ui-ux-pro-max 的 Design System Generator：从品牌关键词推导完整设计 tokens；全部推导规则与数据均为 Dreamskills 原创。

## 1. 输入与输出

| | 内容 |
|---|---|
| 输入 | 品牌关键词（2–4 个形容词）+ 产品类型 + 目标用户（可选）+ 平台栈（Web/移动端） |
| 中间产物 | 风格 × 配色 × 字体组合（来自 dream-style-library 检索，经用户确认） |
| 输出 | DESIGN.md 全字段 tokens：设计关键词、色彩 8 字段+语义色、字体与排版、间距、圆角阴影、动效、组件清单 |

## 2. 生成流程（5 步）

1. **定风格**：按气质关键词在 styles.md 索引中定位 1–2 个候选风格，确认后以该风格的"布局/组件/避坑"作为 DESIGN.md「组件清单与用法」与「反 AI-slop 红线」的输入。
2. **定配色**：按气质/场景在 palettes.md 索引中定位候选，确认后将其 8 字段写入色彩 Tokens；语义色按下方规则推导。
3. **定字体**：按场景在 font-pairings.md 索引中定位候选，确认后写入字体与排版（含中文回退）。
4. **推导其余 tokens**：间距/圆角/阴影/动效按下方"推导规则"从风格特征生成。
5. **落盘确认**：写入 DESIGN.md，标注「生成自：风格 X + 配色 Y + 字体 Z」；呈现给用户确认后方可作为契约。

## 3. Token 推导规则

### 3.1 语义色（success/warning/danger）
- 从 accent 的色相出发：accent 偏暖 → danger 用暖红系；accent 偏冷 → danger 用正红系；
- success 一律低饱和绿（#16A34A 基准，暗底用 #4ADE80）；warning 一律琥珀（#F59E0B 基准）；
- 规则：语义色不随主色变化，保证可识别性；色盲友好需辅以图标。

### 3.2 间距（8pt 网格）
- 全部风格共用刻度 4/8/16/24/32/48/64；
- 密度：Data-dense 类风格组件内边距取 8/12；内容/奢华类取 24/32；页面区块间距一律 32–48。

### 3.3 圆角
| 风格特征 | 圆角方案 |
|---|---|
| 理性/网格/工业（Swiss、Industrial） | small 2–4 |
| 商务/通用（Soft Corporate、SaaS 类） | small 6 / medium 10 |
| 温暖/活泼/亲和（Warm Craft、Playful、Claymorphism） | medium 12 / large 16–20 |
| 玻璃/未来（Glassmorphism、Aurora） | large 16–24 |

### 3.4 阴影
- 扁平/瑞士/单色类：无阴影或极淡 sm；
- 商务/通用：sm + md 两级；
- 玻璃/卡片悬浮类：md + lg，配 8%–12% 黑色透明度；
- 暗底：阴影改用"边框提亮 + 微弱光晕"替代（暗底阴影不可见）。

### 3.5 动效
- 时长 150–300ms；进入 ease-out、过渡 ease-in-out；
- 活泼/游戏类可 200–300ms + 弹性缓动；理性/商务/数据类一律 ≤200ms 无弹性；
- 尊重 prefers-reduced-motion；动效只服务反馈与引导。

## 4. 多栈落盘

生成结果统一写入 DESIGN.md（平台中立）；落地到代码时按 tokens-spec.md 第 8 节的映射表转换：
- Web：CSS 变量 / Tailwind config；
- React / Vue：语义 token 引用 + 主题对象；
- Flutter：ThemeData + 常量表；
- SwiftUI：Design Tokens 常量扩展。

## 5. 示例（节选）

输入：品牌关键词"专业 · 克制 · 可信"，产品"B2B 数据 SaaS"，平台 Web。

生成：风格 = Swiss 瑞士网格（理性秩序）；配色 = 石墨冷灰 Graphite Cool（专业中性）；字体 = 商务稳重 Corporate（IBM Plex Sans 系）。

推导出的 DESIGN.md 关键行：
```markdown
## 0. 设计关键词
专业 · 克制 · 可信（生成自：Swiss + Graphite Cool + Corporate）

## 1. 色彩 Tokens
| primary | #3B5BDB |   ← 用户品牌色（若用户提供则覆盖配色库 primary）
| surface | #FFFFFF / surface-alt #F5F7FA / text #1B2430 / text-secondary #5A6675 / border #E2E8F0
| 语义色 | success #16A34A / warning #F59E0B / danger #DC2626

## 3. 间距（8pt 网格）
组件内边距 16/24；区块 32；密度中等偏紧凑（数据产品）

## 4. 圆角与阴影
圆角 small 4；阴影无或 sm（Swiss 类扁平化）
```

> 注意：用户提供品牌色时，品牌色覆盖配色库 primary，其余 token 仍从库推导——品牌定制永远优先（与 dream-style-library 原则一致）。
