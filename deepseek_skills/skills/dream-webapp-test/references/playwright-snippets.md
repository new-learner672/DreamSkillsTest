# Playwright 常用代码片段（dream-webapp-test 的 references）

> 前提：项目已安装 playwright（`npm i -D @playwright/test`）。片段可直接在 E2E 脚本或 agent 的 bash 工具中使用；按需复制，勿整段注入。

## 启动与访问

```js
// 启动浏览器并打开页面
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle' });
```

## 常用断言

```js
await expect(page).toHaveURL(/\/home$/);                     // 跳转断言
await expect(page.locator('.alert-error')).toBeVisible();    // 错误提示可见
await expect(page.locator('h1')).toHaveText('登录');         // 文本断言
await expect(page.locator('.user-name')).toHaveCount(1);     // 数量断言
```

## 等待策略（避免竞态）

```js
await page.waitForSelector('.spinner', { state: 'hidden' }); // 等加载完成
await page.waitForResponse(r => r.url().includes('/api/login') && r.status() === 200); // 等接口返回
await page.waitForTimeout(500); // 兜底（少用，优先显式等待）
```

## 表单操作与提交（含错误路径断言）

```js
await page.fill('#username', 'alice');
await page.fill('#password', 'wrong-password');
await page.click('button[type="submit"]');
await expect(page.locator('.alert-error')).toContainText('密码错误'); // 错误路径断言
```

## 截图（失败证据）

```js
await page.screenshot({ path: 'e2e-artifacts/01-login-fail.png', fullPage: true });
```

## 移动端视口（响应式验证）

```js
await page.setViewportSize({ width: 375, height: 812 }); // iPhone 尺寸
await expect(page.locator('.nav')).toBeVisible();         // 移动端导航可见
```

## 控制台错误捕获（顺带发现运行时错误）

```js
const errors = [];
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
// 执行用例后：errors 非空 → 记录为发现项
```

## 完整最小用例模板

```js
const { test, expect } = require('@playwright/test');
test('登录成功跳转首页', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#username', 'alice');
  await page.fill('#password', 'correct-password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/home$/);
});
```
