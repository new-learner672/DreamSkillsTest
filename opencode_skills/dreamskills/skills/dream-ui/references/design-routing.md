# 设计任务路由与视觉资产工作流（整合自 UI UX Pro Max design/banner-design skill）

## 路由总表

| 任务 | 子能力 | 关键规则来源 |
|---|---|---|
| Logo | logo-design | 风格域 `styles.csv` 筛选 + 色彩心理学 + 行业指南 |
| 横幅/封面/头图 | banner-design | 22 种美术风格 + 平台尺寸表 + 安全区 |
| SVG 图标/图标集 | icon-design | 7 种风格参数 + 批量变体 |
| 企业识别计划（全套物料） | CIP | 交付物/风格/行业/场景四域检索 |
| 社媒图片 | social-photos | 8 步编排工作流 |
| 演示 PPT | slides | 见 `design-tokens.md#slide` |
| 品牌 | brand | 见 `brand-guide.md` |
| 组件/样式代码 | ui-styling | 见 `stack-guides.md` |

## Logo 设计工作流

1. 收集：产品类型、目标受众、行业、风格偏好（55+ 风格可查 `styles.csv` 的 Style Category）
2. 检索：按 domain 搜风格（style）/色彩（color）/行业（industry）
3. 生成简报：品牌名、意象关键词、色彩方向、风格方向、排除项
4. 生成规则：**始终白底输出**；一次多方案对比；失败直接修正而非放弃
5. 色彩心理学要点：蓝=信任/专业，绿=成长/健康，橙=活力/亲民，紫=创意/高端，黑=奢侈/权威，红=激情/警示

## 横幅设计（banner）工作流

1. 收集 6 项：目的、平台与尺寸、内容要点、品牌规范、风格方向、数量（默认 3）
2. 研究：2-3 个互补美术方向，各截 3-5 张参考
3. 设计：背景图案/主视觉（生成图提示注明 "no text"）→ HTML 叠加文字与 CTA/Logo
4. 导出：精确尺寸 PNG，命名 `assets/banners/<campaign>/<style>-<W>x{H}.png`（kebab-case；时效活动加 `YYMMDD-` 前缀）；>5MB 自动压缩
5. 展示：并列对比 + 迭代

### 平台尺寸表

| 平台 | 尺寸 |
|---|---|
| Facebook 封面 | 820×312 |
| X 头图 | 1500×500 |
| LinkedIn 封面 | 1584×396 |
| YouTube 频道 | 2560×1440 |
| IG Story | 1080×1920 |
| IG Post | 1080×1080 |
| Google Ads | 300×250 / 728×90 |
| 网站 Hero | 1920×600-1080 |

### 硬规则

- 安全区：核心内容居中 70-80% 区域
- 每横幅 1 个 CTA，右下角，高 ≥44px，动作动词
- 最多 2 种字体；正文 ≥16px；标题 ≥32px
- 广告文字占比 <20%（Meta 惩罚线）
- 印刷：300 DPI、CMYK、3-5mm 出血
- 始终注入品牌上下文（无品牌则先走 brand-guide）

## 图标设计（icon）

- 风格参数：`outlined / filled / duotone / rounded / sharp / flat / gradient`
- 批量：一次出 4 个变体；多尺寸导出 16/24/32/48
- 纯文本输出 SVG（无需图像 API）；同一图标集内风格统一、线宽一致、视口 24×24 基准

## CIP（企业识别计划）

- 四域检索：deliverables（50+ 交付物）/ styles / industries / mockup-contexts
- 流程：设计简报 → 检索 → 生成全套物料（可传入 Logo）→ HTML 演示渲染
- 交付物示例：名片、信纸、社媒模板、PPT 模板、品牌手册封面

## 社媒图片 8 步编排

1. 编排（项目管理 + 并行子代理）
2. 解析提示
3. 出 3-5 个概念（问用户选择）
4. 设计（brand → design-system → 风格检索）
5. 按精确 px 截图（2x scale）
6. 视觉核验并修复
7. 报告归档 `plans/reports/`
8. 资产整理
