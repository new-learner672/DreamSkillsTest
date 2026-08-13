# dream-ui 数据资产（全量整合自 UI UX Pro Max）

来源：nextlevelbuilder/ui-ux-pro-max-skill（MIT License），`src/ui-ux-pro-max/data/` 原样整合。

## 文件清单

| 文件 | 内容 | 行数（含表头） |
|---|---|---|
| styles.csv | 84 种 UI 风格（关键词/配色/动效/适用场景/实现清单/设计系统变量） | 85 |
| products.csv | 192 种产品类型（推荐风格/落地页模式/配色焦点） | 193 |
| colors.csv | 192 套配色（17 列语义 token：Primary/On Primary/Secondary/Accent/Background/Foreground/Card/Muted/Border/Destructive/Ring…） | 193 |
| typography.csv | 74 组字体配对（标题+正文/CSS Import/Tailwind Config） | 75 |
| ui-reasoning.csv | 161 条设计系统推理规则（模式/风格优先级/色彩/字体/动效/决策规则/反模式/严重度） | 162 |
| ux-guidelines.csv | 98 条 UX 指南（Do/Don't/正反代码示例/严重度） | 100 |
| icons.csv | 104 条图标条目（类目/库/导入/用法/风格） | 106 |
| charts.csv | 25 种图表（适用数据/何时用与不用/数据量阈值/无障碍等级/库推荐） | 26 |
| motion.csv | 16 个 GSAP 动效预设（强度 tier/触发/时长/缓动/代码片段） | 17 |
| landing.csv | 35 种落地页模式（区块顺序/CTA 位置/配色策略/转化优化） | 35 |
| app-interface.csv | 原生/移动界面指南（Do/Don't/正反代码） | 31 |
| react-performance.csv | React/Next.js 性能规则 | 45 |
| google-fonts.csv | 1924 款 Google Fonts 单字体库（分类/字重/轴/子集/流行度） | 1924 |
| stacks/*.csv | 22 个技术栈专属指南（Guideline/Do/Don't/Code Good/Bad/严重度/Docs URL） | 50-76/个 |

技术栈：react、nextjs、vue、svelte、astro、nuxtjs、nuxt-ui、angular、laravel、swiftui、react-native、flutter、jetpack-compose、html-tailwind、shadcn、threejs、javafx、wpf、winui、avalonia、uno、uwp

## 使用方式

1. **脚本检索**（推荐）：`python scripts/search.py "<query>" --domain <d> [--stack <s>]`
2. **无 Python 降级**：grep 关键词 → 读 CSV 匹配行（CSV 第 1 列是行号）
3. **人工查阅**：直接用表格编辑器/Excel 打开

## 与 SKILL.md 的关系

SKILL.md 是入口与流程；数据是知识库；`references/` 是工作流规则。三者共同构成"数据驱动 + 流程约束 + 品味门禁"的设计智能。
