---
name: dream-ui
description: Full-spectrum UI/UX design intelligence. Use when the user wants to design pages, components, color palettes, typography, icons, logos, banners, slides, brand guidelines, design tokens, or audit visual quality. Triggers on "设计页面/美化界面/UI/UX/配色/字体/图标/Logo/横幅/幻灯片/品牌/设计系统/设计审计/视觉".
license: MIT
metadata:
  author: dreamskills
  version: "2.0.0"
  upstream: UI UX Pro Max (full integration) + Taste-Skill dials + Hallmark slop gates
---

# dream-ui：全谱系 UI/UX 设计智能

**核心思想**：数据驱动 + 品味约束。整合 UI UX Pro Max 全套设计资产（84 风格 / 192 产品 / 192 配色 / 74 字体 / 161 行业推理规则 / 98 UX 指南 / 22 技术栈），保留三旋钮与反 slop 门。数据与检索脚本全部本地化，opencode/codex 开箱即用。

## 0. 设计任务路由（先分流）

| 任务 | 去向 |
|---|---|
| 页面/组件/视觉决策/UX 审查 | 本技能主流程（下方 Step 1-6） |
| Logo 创建与 AI 生成 | `references/design-routing.md#logo` |
| 横幅/封面/社媒尺寸图 | `references/design-routing.md#banner`（含尺寸表） |
| 图标/图标集（SVG） | `references/design-routing.md#icon` |
| 品牌指南/声音/一致性 | `references/brand-guide.md` |
| 设计 token/组件规范 | `references/design-tokens.md` |
| shadcn/Tailwind/Canvas 样式 | `references/stack-guides.md` |
| 演示幻灯片（Chart.js） | `references/design-tokens.md#slide` |
| 完成后视觉审计 | `references/audit-guide.md`（7 阶段） |

## 1. 分析需求（Step 1）

- 提取：产品类型（SaaS/e-commerce/portfolio/dashboard…）、目标受众、风格关键词
- **检测技术栈**：查 `package.json`（react/next/vue/svelte/nuxt/@angular）、`pubspec.yaml`（Flutter）、`*.xcodeproj`（SwiftUI）、`composer.json`（Laravel）、`app.json`+react-native（RN）。检测不到就问用户，默认 `html-tailwind`；**绝不假设**
- 设计滑杆（用户可指定，默认 5/3/5）：
  `DESIGN_VARIANCE`（1 极简…10 大胆）、`MOTION_INTENSITY`（1 微动…10 复杂编排）、`VISUAL_DENSITY`（1 宽松…10 密集）

## 2. 生成设计系统（Step 2，新页面/项目必需）

优先用检索脚本（Python 3 标准库，零依赖）：

```bash
python scripts/search.py "<product> <industry> <keywords>" --design-system [-p "项目名"]
# 滑杆: [--variance 1-10] [--motion 1-10] [--density 1-10]
# 持久化: [--persist] [--page "页面名"] [--output-dir .] [--force] [-f markdown|ascii] [--json]
# 单域: --domain product|style|color|typography|google-fonts|chart|ux|landing|icons|gsap|react|web
# 技术栈: --stack react|nextjs|vue|svelte|astro|nuxtjs|nuxt-ui|angular|laravel|swiftui|react-native|flutter|jetpack-compose|html-tailwind|shadcn|threejs|javafx|wpf|winui|avalonia|uno|uwp
```

**无 Python 降级路径**（opencode/codex 通用）：直接按类别读 `data/*.csv`——
产品→`products.csv`（含推荐风格/落地页模式）、风格→`styles.csv`（含配色/动效/适配清单）、配色→`colors.csv`（语义 token 全套）、字体→`typography.csv`、规则→`ui-reasoning.csv`、UX→`ux-guidelines.csv`、动效→`motion.csv`、图表→`charts.csv`、技术栈→`data/stacks/<stack>.csv`。用 grep 按关键词筛选后读取匹配行。

**持久化模式（MASTER + Overrides）**：`--persist` 生成 `design-system/<项目>/MASTER.md`（唯一事实源）与 `pages/<页面>.md`（页面级覆盖）。MASTER 已存在时默认**跳过不覆盖**（保护既有决策）；取用规则：先读页面覆盖，存在则覆盖 Master。

**0 结果策略（禁止编造）**：① 换更宽泛关键词重试一次；② 仍空则用内置默认（Hero+Features+CTA / Minimalism / Professional），并**明确告知用户**建议来自默认而非数据命中。

## 3. 补充细化检索（Step 3）

按需加搜：`--domain chart`（图表选型）、`--domain gsap`（动效片段）、`--domain react`（React 性能）、`--domain web`（原生/移动界面）。跑题时显式传 `--domain`。

## 4. 实现（Step 4-5）

- Macrostructure 先行（先骨架后风格，禁止同模板换色）
- 按设计系统编码；CSS 变量承载 token；组件四态（Default/Hover/Active/Disabled）
- 硬规则：禁 em-dash 破折号、禁 emoji 当图标、hover 150-250ms、reduced-motion、对比度 4.5:1

## 5. 交付前自检（Step 6）

1. 逐项过 `references/ui-slop-checklist.md`（40 门反 AI 味）
2. 界面改动完成后主动跑 `references/audit-guide.md` 的 7 阶段审计（375/768/1024/1440 视口、焦点环、对比度、console 错误）

## 优先级规则（冲突时从上到下）

1. Accessibility（对比度 4.5:1、键盘、aria）> 2. Touch（44×44px、8px 间距、反馈）> 3. Performance（WebP/AVIF、懒加载、CLS<0.1）> 4. 风格匹配产品 > 5. 响应式（移动优先、无横向滚动）> 6. 排版配色（16px 基准、语义 token）> 7. 动效（150-300ms、有意义）> 8. 表单反馈 > 9. 导航（≤5 项、深链）> 10. 图表（图例、tooltip、色盲友好）

## 红线

- 禁止假设技术栈（必须先检测）
- 禁止 0 结果冒充数据命中
- 禁止跳过 40 门清单与审计直接交付
- 禁止像素级克隆参考站点
- 禁止 em-dash 破折号、emoji 当图标、AI 紫粉渐变（金融/企业场景）
