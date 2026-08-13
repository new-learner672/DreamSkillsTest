# 7 阶段设计审计（整合自 UI UX Pro Max stack design-review）

**原则**：任何前端改动之后、UI 完成之前主动跑。每条发现 = 观察 → 原理 → 修复，附证据（截图/console）。无观察不写发现。

## 7 阶段

- **Phase 0 Setup**：1440×900 打开 + 基线截图 + 记录 console 错误
- **Phase 1 Interaction**：跑主流程；验证 hover/active/disabled 三态、危险操作防护、loading/empty/error 态
- **Phase 2 Responsiveness**：375/768/1024/1440/1920 五档截图；查横向滚动、裁切、触控目标 <44×44、导航不折叠
- **Phase 3 Visual polish**：间距节奏、字阶一致、圆角/阴影/边框 token 纪律
- **Phase 4 Accessibility**（WCAG 2.1 AA）：全页 Tab（焦点可见/无键盘陷阱）、语义结构（单 h1、地标）、控件标签、对比度（正文 ≥4.5:1，大字/UI ≥3:1）、reduced-motion
- **Phase 5 Robustness**：超长字符串、空数据、慢网络、非法输入
- **Phase 6 Console & health**：console/network 错误、404、CLS、包体积

## 质量底线（全过才算完成）

- 375/768/1024/1440 无横向滚动
- 每个交互元素 `:focus-visible`
- AA 对比度、语义地标、reduced-motion、无 CLS
- 懒加载、`font-display: swap`

## 报告格式

```markdown
## Design Review — <页面/URL>
**Verdict:** <Ship / Ship with fixes / Needs work>
### Blockers（破坏可用性或 AA，必改）
### High（合入前修）
### Medium（打磨）
### Nitpicks（前缀 "Nit:"）
### What's working
```

铁律：按严重度排序（先说修什么）；只有 Blockers/High 卡合入；页面打不开就明说只报启发式结果。

## 无浏览器环境降级

纯静态检查（无 Playwright 时）：读代码查焦点样式缺失、无尺寸媒体、对比风险、触控目标、横向溢出风险（overflow-x）、reduced-motion 支持；并在报告中声明"启发式审计，未经浏览器实测"。

## CI 集成

对每个 UI PR 自动跑审计脚本（截图多档视口 + 启发式报告），Blockers/High 阻断合并。
