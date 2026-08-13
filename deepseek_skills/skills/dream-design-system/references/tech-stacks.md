# 技术栈落地指南（references）—— 22 栈

> 用途：把 DESIGN.md 设计 tokens 落地到具体技术栈（与 tokens-spec.md 的 6 栈示例互补：本文件覆盖 22 栈全谱）。全部为 Dreamskills 原创撰写。
> 覆盖四类：Web 框架（React/Vue/Angular/Svelte/SolidJS）、元框架（Next/Nuxt/Astro/Remix）、样式方案（Tailwind/Bootstrap/Chakra/MUI/AntD）、移动/桌面/低代码（React Native/Flutter/SwiftUI/Compose/Electron/Qt/WordPress/Webflow）。

## 关键词索引（框架 → 编号）

| 关键词 | 编号 |
|---|---|
| React / 组件 / 前端 | 1, 5, 14, 18 |
| Vue / 渐进式 | 2, 6 |
| Angular / 企业 | 3 |
| Svelte / 轻量 | 4, 22 |
| Next.js / SSR / 全栈 | 5 |
| Nuxt / Vite | 6 |
| Astro / 内容站 | 7 |
| Remix / 边界 | 8 |
| Tailwind / 原子化 | 9 |
| Bootstrap / 快速 | 10 |
| Chakra / 可访问 | 11 |
| MUI / Material | 12 |
| Ant Design / 中后台 | 13 |
| React Native / 跨端 | 14 |
| Flutter / Dart | 15 |
| SwiftUI / iOS | 16 |
| Compose / Android | 17 |
| Electron / 桌面 | 18 |
| Qt / QML / C++ | 19 |
| WordPress / PHP | 20 |
| Webflow / 低代码 | 21 |
| SolidJS / 细粒度 | 22 |

---

## 1. React（Web 框架）

- token 落地：`ThemeProvider` + CSS 变量；语义 token 经 `useTheme()` 引用，组件内禁止硬编码颜色/间距
- 组件库/资源：shadcn/ui（registry 组件即资产）、Radix UI（无样式原语）
- 布局方案：CSS Grid + Flexbox；栅格用 CSS 变量（`--grid-cols`）而非库内置
- 样式注意：避免 CSS-in-JS 运行时开销过大（可考虑编译期方案）；样式穿透（Portal/弹层）需携带 token 变量

## 2. Vue 3（Web 框架）

- token 落地：`:root` CSS 变量 + `unplugin-auto-import`；`useCssVars()` 响应式绑定；SCSS 中 `@use` token 映射
- 组件库/资源：Element Plus、Naive UI（可主题化）；Headless UI Vue
- 布局方案：Grid/Flex + 组合式 API 封装栅格组件
- 样式注意：`scoped` 样式下动态 class 用 `:deep()` 时要保留 token 变量继承；SSR 时避免运行时注入样式闪烁

## 3. Angular（企业框架）

- token 落地：全局 `styles.scss` 中 `:root` 变量；`@use 'tokens' as *` 预编译映射；Angular Material 主题函数（`mat.define-palette`）与设计 tokens 对齐
- 组件库/资源：Angular Material（官方，主题化完善）、NG-ZORRO（中后台）
- 布局方案：Flex Layout（已维护模式）/ CSS Grid；`@media` 断点常量化
- 样式注意：ViewEncapsulation 会隔离样式——token 变量定义在全局层；变更检测频繁时避免大量内联样式绑定

## 4. Svelte（轻量框架）

- token 落地：`:root` CSS 变量 + Svelte 5 的样式 `@layer` 分层；`--theme-*` 变量随组件树继承
- 组件库/资源：Skeleton（主题化 UI）、shadcn-svelte（registry 移植）
- 布局方案：原生 Grid/Flex，Svelte 无锁定；`container queries` 友好
- 样式注意：Svelte 编译期作用域样式是优势，但需把 token 定义在全局 `:root`；动画用 `transitions` 需注意 reduced-motion

## 5. Next.js（React 元框架）

- token 落地：App Router 下全局 `globals.css` 定义 `@theme` 变量；Tailwind 主题与 DESIGN.md 双向同步
- 组件库/资源：shadcn/ui（官方适配 Next）、next/font 加载字体（`font-display: swap`）
- 布局方案：Server Components 优先；栅格用 Tailwind `grid-cols-*`
- 样式注意：CSS 文件作用域（`*.module.css`）内引用 token 变量；图片/字体性能（next/image、next/font 子集化）与设计系统同时落地

## 6. Nuxt（Vue 元框架）

- token 落地：`nuxt.config.ts` 中 `css` 引入 token 层；`@nuxtjs/tailwindcss` 或 UnoCSS 主题映射
- 组件库/资源：Nuxt UI（官方，Tailwind 驱动）、Nuxt Content（文档站）
- 布局方案：`<NuxtLayout>` 全局布局 + Grid；断点由 Tailwind/Uno 处理
- 样式注意：SSR 首屏样式内联，避免 token 变量加载延迟导致的 FOUC；`v-if` 过渡动画遵循 DESIGN.md 动效时长

## 7. Astro（内容优先）

- token 落地：全局 `global.css` `:root` 变量；每个 Island 组件引用同一变量集
- 组件库/资源：Astro 官方主题、shadcn/ui（astro 适配）、`@astrojs/tailwind`
- 布局方案：内容优先、静态生成；Grid/Flex 原生
- 样式注意：岛屿架构下样式隔离按需加载——token 变量必须定义在全局层；字体用 `@fontsource` 自托管防 CLS

## 8. Remix（边界框架）

- token 落地：Tailwind 主题（`tailwind.config` 映射 DESIGN.md）；CSS 变量贯穿 `root.tsx`
- 组件库/资源：shadcn/ui、Radix；`@remix-run/css-bundle`
- 布局方案：嵌套路由布局天然分区；Grid/Flex
- 样式注意：加载器/动作与样式解耦；弹层/表单错误态样式按 DESIGN.md 状态设计规则落地

## 9. Tailwind CSS（样式方案）

- token 落地：`tailwind.config.js` 的 `theme.extend.colors/spacing/fontFamily/borderRadius/boxShadow/transition` 全部从 DESIGN.md 映射（单一事实源）
- 组件库/资源：shadcn/ui、Headless UI、daisyUI
- 布局方案：`grid-cols-*`、`flex-*`、`container`；断点 `sm/md/lg/xl` 对齐设计网格
- 样式注意：禁止魔法值——一律用 config 中已映射的 token 类；`@layer` 分层控制优先级；深色模式用 `darkMode: 'class'` 而非媒体查询（项目可控）

## 10. Bootstrap（快速成型）

- token 落地：SCSS 变量覆盖（`$primary/$spacers/$font-sizes/$border-radius` 等）映射 DESIGN.md
- 组件库/资源：Bootstrap Icons、Bootstrap 官方组件
- 布局方案：12 列栅格 + `container/row/col`；断点 `sm/md/lg/xl/xxl`
- 样式注意：覆盖默认蓝色需全局替换 `$primary` 系列；深色模式用 `data-bs-theme` 属性；自定义组件避免与 `.btn/.card` 默认样式打架

## 11. Chakra UI（可访问组件）

- token 落地：`extendTheme({ colors, fonts, space, radii, shadows, transition })` 全量映射 DESIGN.md
- 组件库/资源：Chakra UI 官方组件（无障碍内建）
- 布局方案：`Grid/Stack/SimpleGrid`；断点 `sm/md/lg/xl`
- 样式注意：`colorMode`（明暗）与 DESIGN.md 深色模式规则联动；`chakra-petch` 风格覆盖用 `useToken` 保持单一来源

## 12. MUI / Material UI（企业 React）

- token 落地：`createTheme({ palette, typography, spacing, shape, shadows, transitions })` 对齐 DESIGN.md；`ThemeProvider` 全局
- 组件库/资源：MUI X（数据表格/图表）、MUI 图标
- 布局方案：`Grid`（12 列）、`Container`、`Box`
- 样式注意：Material 默认 8dp 阴影体系与 DESIGN.md 阴影分级对齐；`CssBaseline` 统一 reset；深色模式用 `colorSchemes` 双主题

## 13. Ant Design（中后台）

- token 落地：`ConfigProvider` + `theme.token`（`colorPrimary/fontSize/borderRadius` 等，CSS-in-JS 变量）映射 DESIGN.md
- 组件库/资源：Ant Design 官方组件（表格/表单/弹层丰富）、@ant-design/icons
- 布局方案：`Row/Col` 24 栅格 + `Layout`；断点 `xs/sm/md/lg/xl/xxl`
- 样式注意：`theme.token` 是设计系统入口，勿用 CSS 覆盖默认蓝；`style` 属性内联样式尽量用 token 引用；弹层（Modal/Dropdown）需在 ConfigProvider 作用域内

## 14. React Native（跨端移动）

- token 落地：TS 常量对象（`DesignTokens.ts`）导出 color/spacing/typography/radius/shadow；`ThemeContext` 分发
- 组件库/资源：React Native Paper（Material）、NativeBase（备选）、`react-native-svg`
- 布局方案：Flexbox（RN 原生）；`Dimensions`/`useWindowDimensions` 响应式
- 样式注意：阴影仅 iOS 支持（`shadow*`），Android 用 `elevation`——按 DESIGN.md 阴影规则双端映射；字体加载用 `react-native-asset` 方案

## 15. Flutter（跨端 UI）

- token 落地：`ThemeData`（`ColorScheme/TextTheme`）+ 常量表（`AppSpacing/AppRadius/AppShadows/AppMotion`）
- 组件库/资源：Material 3 组件、Flutter 官方 widgets
- 布局方案：`Grid/Flex` + `LayoutBuilder`/`MediaQuery`；断点用 `Breakpoint` 自定义
- 样式注意：`ThemeData` 是单一事实源，组件禁止散落硬编码色值；动效时长用 `AppMotion` 常量（`Duration`）；`ThemeMode.dark` 与 DESIGN.md 深色规则联动

## 16. SwiftUI（iOS/macOS）

- token 落地：`DesignTokens.swift` 枚举/结构体（`Color/Spacing/Typography/CornerRadius/Shadow`）；`@Environment` 注入主题
- 组件库/资源：SwiftUI 原生组件、`Asset Catalog` 颜色资产
- 布局方案：`HStack/VStack/LazyVGrid` + `safeAreaInset`；`@Environment(\.sizeCategory)` 动态类型
- 样式注意：`Color` 资产与语义 token 一一对应；深色模式用 `Color(light:dark:)` 双值资产；动画时长统一 `withAnimation(AppMotion.fast)` 常量

## 17. Kotlin / Jetpack Compose（Android）

- token 落地：`DesignTokens.kt`（`Color/Shape/Dp/Typography`）+ `MaterialTheme`（`colorScheme/typography/shapes`）
- 组件库/资源：Material 3 Compose 组件、`compose-material3`
- 布局方案：`Row/Column/Box` + `LazyGrid`；`windowSizeClass` 自适应
- 样式注意：`MaterialTheme` 是主题入口，组件引用 `MaterialTheme.colorScheme.*`；深色用 `isSystemInDarkTheme()`；`elevation` 阴影与 DESIGN.md 对齐

## 18. Electron（桌面应用）

- token 落地：主进程共享 JSON（`design-tokens.json`）→ 渲染进程 CSS 变量/主题对象；双进程保持单一来源
- 组件库/资源：Electron Forge/Vite 模板、shadcn/ui（渲染层复用 Web 方案）
- 布局方案：渲染进程即 Web（Grid/Flex）；窗口自适应 `BrowserWindow` 尺寸联动
- 样式注意：系统外观（`nativeTheme`）与 DESIGN.md 深色模式联动；打包体积（字体/图标子集化）；菜单栏/原生对话框样式无法完全定制——设计上给原生层留白

## 19. Qt / QML（C++ 桌面）

- token 落地：`Theme.qml` 单例（`readonly property color`）+ `Qt.styleHints`；QSS 变量经 `Qt.lighter/darker` 派生
- 组件库/资源：Qt Quick Controls 2（`Material`/`Universal` 风格可主题化）
- 布局方案：`RowLayout/GridLayout` + `anchors`；`Screen` 尺寸自适应
- 样式注意：QML 单例属性是主题入口，控件勿散落色值；HiDPI 需提供 1x/2x 资源；字体回退 `font.families` 列表包含中文字体

## 20. WordPress（CMS/PHP）

- token 落地：主题 `theme.json`（`settings.color/spacing/typography`）映射 DESIGN.md——块主题的原生设计系统入口
- 组件库/资源：块主题（Block Theme）+ Gutenberg 核心块；ACF（字段）
- 布局方案：`wp:group` 布局区块 + `layout` 配置；`theme.json` 断点
- 样式注意：`theme.json` 是单一事实源（避免同时手写 CSS 造成双源）；全局样式 vs 块级样式分层；插件样式可能污染——用 `wp_add_inline_style` 统一注入 token 变量

## 21. Webflow（低代码）

- token 落地：Design System（样式选择器/色板/字体组合）在 Webflow 样式面板中建立，命名与 DESIGN.md 一致
- 组件库/资源：Webflow 官方组件 + 自建 Symbol/Component
- 布局方案：Flexbox/Grid 可视化布局 + Breakpoints（Desktop/Tablet/Mobile）
- 样式注意：样式选择器命名规范（`.token-primary` 等）保证与设计文档对账；全局色板（Swatches）集中管理；导出代码时检查交互动效与 DESIGN.md 时长一致

## 22. SolidJS（细粒度响应式）

- token 落地：CSS 变量（`:root`）+ `@solidjs/use` 的 `createMediaQuery`；样式方案用 Tailwind/UnoCSS 或原生 CSS
- 组件库/资源：Kobalte（无样式原语）、shadcn-solid（registry 移植）
- 布局方案：Grid/Flex 原生；细粒度响应式用 `createMemo` 派生样式
- 样式注意：细粒度更新让样式绑定高效，但避免在 render 中生成随机 class；`<style>` 标签作用域注意 token 继承；动画用 CSS 变量驱动（配合 `prefers-reduced-motion`）
