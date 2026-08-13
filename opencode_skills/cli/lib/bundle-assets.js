'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, '..', 'dreamskills');
const dst = path.join(root, 'assets');
if (fs.existsSync(src)) {
  fs.rmSync(dst, { recursive: true, force: true });
  copyRecursive(src, dst);
  console.log(`[prepack] 已打包 dreamskills 资产 -> cli/assets (${countFiles(dst)} 文件)`);
} else {
  console.warn('[prepack] 未找到 ../../dreamskills，跳过资产打包');
}

function copyRecursive(s, d) {
  const st = fs.statSync(s);
  if (st.isDirectory()) {
    fs.mkdirSync(d, { recursive: true });
    for (const e of fs.readdirSync(s)) copyRecursive(path.join(s, e), path.join(d, e));
  } else fs.copyFileSync(s, d);
}
function countFiles(d) {
  let n = 0;
  for (const e of fs.readdirSync(d)) {
    const p = path.join(d, e);
    n += fs.statSync(p).isDirectory() ? countFiles(p) : 1;
  }
  return n;
}
