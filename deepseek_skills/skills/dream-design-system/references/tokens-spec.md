# Design Tokens 完整规格（references）

> 本文件由 dream-design-system 按需加载。字段名与 DESIGN.md.example 一一对应，实现时保持命名一致。

## 1. Token 分类与字段名

| 分类 | 字段名（DESIGN.md） | 示例 | 必填 |
|---|---|---|---|
| 色彩 | primary / primary-hover / primary-fg / surface / surface-alt / text / text-secondary / border / success / warning / danger | #2563EB / #FFFFFF / … | 全部必填 |
| 字体 | font-family / font-size-scale / line-height / font-weight | Inter / 12…48px / 1.6 / 400–700 | 全部必填 |
| 间距 | spacing-scale | 4/8/16/24/32/48/64 | 必填 |
| 圆角 | radius-sm / radius-md / radius-lg | 6 / 10 / 14 | 必填 |
| 阴影 | shadow-sm / shadow-md / shadow-lg | 0 1px 2px rgba(0,0,0,.05) | 必填 |
| 动效 | duration / easing | 150–300ms / ease-out | 建议 |

## 2. 命名规范

- 语义命名优先于值命名：`color.primary` 而非 `color.blue-500`；`spacing.md` 而非 `spacing.16px`；
- 层级用语义后缀：`-hover`、`-active`、`-disabled`、`-alt`（次级）、`-fg`（前景文字）；
- 一个语义一个 token：不要 `color.text-primary` 与 `color.text-main` 并存。

## 3. 色彩 tokens 规则

- 主色 ≤2（品牌主色 + 一个强调色）；中性色（surface/text/border）构成骨架；
- 文字对比度 ≥ WCAG AA：正文 4.5:1、大文本与 UI 组件 3:1；
- 语义色（success/warning/danger）只用于反馈，不用于装饰。

## 4. 字体与排版规则

- 字号阶梯（px）：12 / 14 / 16 / 18 / 20 / 24 / 32 / 48；正文 ≥16px、行高 1.6、每行 60–75 字符；
- 字体族 ≤2；正文用无衬线（Inter / system-ui），标题可同族加粗或一个衬线；
- 中文回退：无衬线 → PingFang SC / Microsoft YaHei；衬线 → Songti SC / SimSun。

## 5. 间距（8pt 网格）

- 刻度：4 / 8 / 16 / 24 / 32 / 48 / 64；所有 padding/margin/gap 从刻度取值；
- 卡片内边距 24；区块间距 32–48；正文段落间距 1em。

## 6. 圆角与阴影

- 圆角按组件层级取一个值，勿混用：sm 6 / md 10 / lg 14；
- 阴影三级：sm / md / lg，透明度 0.05 / 0.08 / 0.12（示例见 DESIGN.md.example）。

## 7. 动效

- 时长 150–300ms；缓动 ease-out（进入）/ ease-in-out（过渡）；
- 尊重 prefers-reduced-motion；动效只服务反馈与引导，不做纯装饰。

## 8. 多平台映射示例

### CSS 变量（Web 基准）

```css
:root {
  --color-primary: #2563EB;
  --color-surface: #FFFFFF;
  --spacing-md: 16px;
  --radius-md: 10px;
  --shadow-md: 0 4px 12px rgba(0,0,0,.08);
}
```

### Tailwind 配置

```js
// tailwind.config.js —— 将 tokens 映射为语义工具类
theme: {
  colors: { primary: 'var(--color-primary)', surface: 'var(--color-surface)' },
  spacing: { md: 'var(--spacing-md)' },
  borderRadius: { md: 'var(--radius-md)' },
  boxShadow: { md: 'var(--shadow-md)' }
}
```

### React（组件内只引用语义 token）

```jsx
const button = { backgroundColor: 'var(--color-primary)' }; // 或主题对象 theme.color.primary
```

### Vue（CSS 变量 + 语义类）

```html
<style scoped>
.btn { background: var(--color-primary); padding: var(--spacing-md); border-radius: var(--radius-md); }
</style>
```

### Flutter（ThemeData + 常量表）

```dart
ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: Color(0xFF2563EB)),
  // spacing/radius 用常量表：AppTokens.spacing.md / AppTokens.radius.md
)
```

### SwiftUI（Design Tokens 常量）

```swift
enum AppTokens {
  static let primary = Color(hex: 0x2563EB)
  static let spacingMD: CGFloat = 16
  static let radiusMD: CGFloat = 10
}
// 使用：.background(AppTokens.primary)
```

## 9. 完整性自检清单（dream-design-system 步骤 2 用）

- [ ] 色彩 token ≥9 个（primary 族 + 中性族 + 语义色）齐全
- [ ] 字号阶梯 ≥6 级、含 16px 正文基准
- [ ] 间距刻度 ≥6 级、含 4 与 8 的倍数关系
- [ ] 圆角/阴影至少各 2 级
- [ ] 动效时长与缓动已声明
- [ ] 组件清单表已登记来源（registry / 自建）
