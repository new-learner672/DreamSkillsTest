# 技术栈样式指南（整合自 UI UX Pro Max ui-styling skill）

## 三层核心栈

1. **组件层 shadcn/ui**：Radix 原语之上、copy-paste 分发、TypeScript-first、CLI 管理（`npx shadcn@latest init/add`）
2. **样式层 Tailwind**：utility-first、构建时处理零运行时、移动优先、自动死代码清除；纯 Tailwind 方案用 `@tailwindcss/vite` + `@import "tailwindcss"`
3. **视觉层 Canvas**：视觉沟通优先于文字、最简文字最大化视觉冲击、系统化模式与精炼美学

## shadcn 组件目录速查

- 表单：input/select/checkbox/radio/switch/slider/form（react-hook-form + zod）
- 布局导航：breadcrumb/menubar/navigation-menu/pagination/tabs/sheet
- 浮层：dialog/alert-dialog/dropdown-menu/popover/tooltip/command
- 反馈：alert/progress/skeleton/toast
- 展示：card/table/badge/avatar/accordion/carousel

## shadcn 主题化

- CSS 变量挂 `:root` 与 `.dark`；next-themes 管理主题切换
- 组件变体定制：改 token 变量或扩 cva 变体，禁止直接改 Radix 内部

## shadcn 可访问性（必须）

- 键盘：Enter/Space 触发、方向键导航、Esc 关闭浮层
- 焦点：focus ring 可见、Dialog 打开时焦点陷阱、关闭后焦点归还
- ARIA：role/aria-expanded/aria-selected 由 Radix 自动处理，勿手写覆盖
- 读屏：aria-label 补全纯图标按钮

## Tailwind 要点

- 断点：sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536；移动优先书写
- 容器查询（@container）用于组件级响应式
- 定制：`@theme` 指令定义 token（映射设计系统）；`@layer base/components/utilities` 分层；`@apply` 仅复用模式时用
- 响应式铁律：无横向滚动、触控目标 ≥44×44、导航小屏折叠

## Canvas 视觉设计原则

- 视觉沟通优先于文字；哲学驱动（每个设计决定有意图）
- 最简文字、最大化视觉冲击；系统化模式与精炼美学
- 自带开源字体库（Arsenal SC、Big Shoulders、Bricolage Grotesque、Crimson Pro、DM Mono、Gloock、IBM Plex Mono/Serif、Instrument Sans/Serif、JetBrains Mono、Jura、Libre Baskerville、Lora、National Park、Outfit、Pixelify Sans、Red Hat Mono、Silkscreen、Tektur、Work Sans、Young Serif 等，均 OFL 许可）

## 10 条最佳实践

1. 组件组合优先（composition over 大组件）
2. utility-first，仅真正重复才抽组件
3. 移动优先
4. 无障碍优先（Radix 原语 + 焦点态 + 语义 HTML）
5. token 一致（无裸值）
6. 暗色模式全元素 `dark:` 变体
7. 性能（自动 purge、禁止动态拼接类名）
8. TypeScript 全类型
9. 视觉层级清晰
10. 把 UI 当手艺（细节即品质）
