# Core Web Vitals 阈值与诊断对照（dream-perf-audit 的 references）

> 指标口径遵循 Google web.dev 标准。测量工具：Lighthouse、PageSpeed Insights、Chrome DevTools Performance 面板。

## 一、CWV 阈值表

| 指标 | 含义 | 良好（绿） | 需改进（黄） | 差（红） |
|---|---|---|---|---|
| **LCP**（Largest Contentful Paint） | 最大内容绘制（首屏加载感） | ≤ 2.5s | 2.5~4.0s | > 4.0s |
| **INP**（Interaction to Next Paint） | 交互响应延迟（替代 FID） | ≤ 200ms | 200~500ms | > 500ms |
| **CLS**（Cumulative Layout Shift） | 布局偏移（页面跳动） | ≤ 0.1 | 0.1~0.25 | > 0.25 |
| **Lighthouse 性能分** | 综合性能评分 | ≥ 90 | 50~89 | < 50 |
| **接口时延**（自定义） | 关键接口 P95 响应 | ≤ 300ms（项目约定） | — | 超约定 |

## 二、诊断对照：指标超标 → 常见原因 → 修复手段（从高 ROI 开始）

### LCP 超标（首屏慢）
- 原因：首屏大图未压缩、字体加载阻塞、JS/CSS 未分包、无预加载、服务端慢
- 修复：图片压缩/换 WebP·AVIF → 关键字体 preload + font-display: swap → 代码分包 + 关键路径内联 → 首屏资源预加载 → 后端加缓存/CDN

### INP 超标（交互卡顿）
- 原因：主线程长任务（重计算/大渲染）、事件处理器重、无虚拟列表
- 修复：长任务拆分（requestIdleCallback / Web Worker）→ 事件节流/防抖 → 列表虚拟化 → 减少不必要的 re-render

### CLS 超标（页面跳动）
- 原因：图片/广告无尺寸占位、动态注入内容、字体切换抖动
- 修复：img/video 预留宽高（aspect-ratio）→ 动态内容预留占位 → 字体度量稳定（size-adjust）

### 接口时延超标（接口慢）
- 原因：无缓存、串行请求、未分页、N+1 查询
- 修复：HTTP 缓存/条件请求 → 请求并行化 → 分页/游标 → 查询优化/索引

## 三、审计记录模板（写入 changes/<id>/perf-report.md）

```markdown
# 性能审计报告 <id>
- 目标：<页面/接口清单>
- 工具：<Lighthouse 版本 / DevTools>

## 基线（优化前）
| 指标 | 数值 | 等级 |

## 优化动作
1. <动作> → <预期收益>

## 复测（优化后）
| 指标 | 基线 | 复测 | delta | 等级 |

## 结论
- 达标：是 / 否
- 性能债务（如有）：<项，rigorous 档不允许>
```
