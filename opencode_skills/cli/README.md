# dreamskills-cli — Dreamskills 终端部署工具

参考 OpenSpec（`npx @fission-ai/openspec`）的终端部署体验：一条命令安装、纯 Node.js 零依赖、解释执行架构无关，全平台全架构通用。

## 支持矩阵

| 维度 | 支持 |
|---|---|
| 操作系统 | Windows / Linux / macOS |
| CPU 架构 | x86_64 / arm64（及任何 Node 官方支持的架构） |
| Node 版本 | ≥18（纯标准库，零 npm 依赖，无需编译） |
| 目标宿主 | opencode / codex / claude code（全局或项目级） |

> 架构无关原理：CLI 是解释执行的纯 JavaScript（仅用 `fs/path/os/child_process` 标准库），不调用任何原生模块；架构差异由 Node 官方运行时承担。dream-ui 的可选 Python 检索脚本同为标准库实现，同样架构无关。

## 安装 CLI

```bash
# 方式一：npx 免安装执行（推荐，参考 OpenSpec 模式）
npx dreamskills-cli doctor

# 方式二：全局安装
npm install -g dreamskills-cli
dreamskills install

# 方式三：本地仓库直接运行
node cli/index.js doctor
# 或（在 opencodeskills 目录）
npm link   # 注册到全局
```

## 命令

```bash
dreamskills install                        # 项目级安装全部 13 技能（自动检测宿主目录）
dreamskills install --target codex         # 仅 codex
dreamskills install --global               # 全局（用户级目录）
dreamskills install --skill dream-ui       # 单个技能
dreamskills install --force                # 覆盖已安装

dreamskills init                           # 初始化 specs/ + constitution.md
dreamskills list                           # 技能清单
dreamskills doctor                         # 环境体检（OS/架构/宿主/Python/git）
dreamskills uninstall --target all         # 卸载项目级全部技能（opencode + codex + claude code）
dreamskills uninstall --target codex        # 仅卸载 codex
dreamskills uninstall --global              # 卸载全局安装
dreamskills uninstall --skill dream-ui      # 仅卸载单个技能
dreamskills uninstall --dir <项目路径>      # 指定项目目录
```

### 卸载保留策略

- 卸载仅删除宿主 skills/commands/hooks 中的技能文件
- 项目数据永久保留：`specs/`、`changes/`、`archive/`、`research/`、`brainstorm/`、`.dreamskills/learnings.md`、`design-system/`（可继续作普通文档或彻底手工删除）

## 宿主目录解析

| 宿主 | 全局 | 项目级 |
|---|---|---|
| opencode | `<XDG_CONFIG_HOME 或 APPDATA>/opencode/skills` | `<项目>/.opencode/skills` |
| codex | `~/.codex/skills` | `<项目>/.codex/skills` |
| claude code | `~/.claude/skills` | `<项目>/.claude/skills` |

## 开发

- 入口 `index.js`；检测 `lib/detect.js`；安装 `lib/install.js`；体检/初始化 `lib/doctor.js`
- 发布打包：`npm pack` 触发 `prepack`（`lib/bundle-assets.js` 把 `dreamskills/` 资产打进包内 `assets/`）
- 资产定位优先级：`DREAMSKILLS_HOME` 环境变量 > 仓库同级 `dreamskills/` > 包内 `assets/`
