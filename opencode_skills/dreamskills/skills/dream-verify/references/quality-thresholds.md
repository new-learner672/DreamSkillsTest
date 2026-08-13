# Web 质量数值阈值表（来源：Lighthouse / Core Web Vitals / WCAG 2.2）

## Core Web Vitals 硬阈值

| 指标 | 优秀 | 需改进 | 差 | 说明 |
|---|---|---|---|---|
| LCP | ≤ 2.5s | ≤ 4.0s | > 4.0s | 最大内容绘制（首屏主内容） |
| INP | ≤ 200ms | ≤ 500ms | > 500ms | 交互到响应（替代 FID） |
| CLS | ≤ 0.1 | ≤ 0.25 | > 0.25 | 累计布局偏移 |

## 性能预算表

| 资源 | 预算 | 理由 |
|---|---|---|
| 首屏 JS | < 300KB（压缩后） | 中端手机 4G 下可交互时间可控 |
| 首屏 CSS | < 50KB | 渲染阻塞最小化 |
| 页面总重 | < 1.5MB | 移动网络友好 |
| 图片 | 单张 < 200KB，优先 WebP/AVIF | 视觉质量与体积平衡 |
| 字体 | 只加载使用子集，font-display: swap | 防 FOIT 与浪费 |

## Lighthouse 目标分

| 类别 | 目标 |
|---|---|
| Performance | ≥ 90 |
| Accessibility | 100 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

## 可访问性（WCAG 2.2 四原则抽查）

1. **可感知**：对比度 4.5:1；信息不只靠颜色；alt 文本；字幕
2. **可操作**：纯键盘可达；focus 可见；无 2s 以上自动动效（可暂停）；目标尺寸 ≥ 24px
3. **可理解**：语言声明；错误提示明确；导航一致
4. **健壮**：语义化 HTML；ARIA 正确使用（无 ARIA 优于错误 ARIA）

## 性能优化优先级（按收益排序）

1. 关键渲染路径：减少阻塞资源、内联关键 CSS
2. 分包/懒加载：路由级 code splitting、动态 import
3. 图片：现代格式 + 尺寸适配 + loading=lazy + 预加载首屏图
4. 字体：子集化 + swap + 复用
5. 缓存：静态资源长缓存 + 指纹命名
6. 渲染层：防布局抖动、防长任务（50ms 内）

## SEO 技术要点

- 语义化结构 + 唯一 title/description；canonical 防重复
- 结构化数据 JSON-LD（产品/文章/面包屑）
- sitemap.xml + robots.txt；移动友好（响应式）
