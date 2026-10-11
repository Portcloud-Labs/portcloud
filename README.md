# Portcloud

纯静态品牌与服务目录主页，使用现有 Portcloud Logo、原生 HTML/CSS 和响应式布局。少量浏览器 JavaScript 用于中英文切换；没有服务端代码、数据库或框架。Portcloud 提供开箱即用的服务，不是为每位用户部署容器或实例的应用托管平台。

## 本地预览

需要 Node.js 22 或更新版本。

```sh
npm ci
npm run dev
```

打开终端输出的本地地址，默认是 `http://localhost:8787`。`npm run dev` 先复制静态文件再启动 Wrangler；修改源文件后重新运行命令，以更新预览。

## 文件结构

- `index.html`：主页内容和样式。
- `assets/`：主页使用的 Logo 与 `language.js` 语言切换脚本。
- `portcloud-logo/`：原始 Logo，保留不变。
- `scripts/build.mjs`：只将主页、使用到的 Logo 和语言切换脚本打包到 `dist/`。
- `wrangler.jsonc`：Workers Static Assets 配置，Worker 名称为 `portcloud`。
- `.github/workflows/deploy.yml`：验证与部署工作流。

Node.js 和 Wrangler 仅用于开发、打包和部署，不参与页面运行。部署目录不包含项目配置、依赖或 GitHub 工作流。未知路径返回 404，不使用 SPA 回退。

## GitHub Actions 一键部署

1. 将项目上传到 GitHub 仓库，默认分支使用 `main`。
2. 在 Cloudflare 创建 API Token。使用官方 **Edit Cloudflare Workers** 模板，并限制到目标账户；部署目标是该账户下名为 `portcloud` 的 Worker。已有同名 Worker 时会更新它，必要时先修改 `wrangler.jsonc` 中的 `name`。
3. 在 GitHub 仓库 **Settings → Secrets and variables → Actions → Repository secrets** 添加：
   - `CLOUDFLARE_ACCOUNT_ID`：目标 Cloudflare 账户 ID。
   - `CLOUDFLARE_API_TOKEN`：用于部署的 API Token。
4. 打开 **Actions → Deploy Portcloud → Run workflow**，选择 `main` 后点击运行。

推送到 `main` 也会自动部署。PR 仅执行打包验证，不读取部署凭据、不部署。手动选择非 `main` 分支时也只验证，避免误发布。

工作流先执行 `npm ci` 和 `npm run deploy:check`，通过后执行 `npm run deploy`。部署地址见 Wrangler 日志；默认开启 `workers.dev`。自定义域名可在 Cloudflare Dashboard 的 Worker **Settings → Domains & Routes** 中配置。

凭据只能存入 GitHub Secrets，不要提交到代码或粘贴到聊天中。

## 本地部署和打包检查

```sh
npm run deploy:check
```

此命令执行 Wrangler dry-run，仅验证打包与配置，不发布到 Cloudflare，也不能证明远程账户权限正确。

如果需要从本地发布，先通过 `npx wrangler login` 完成授权，然后运行：

```sh
npm run deploy
```

## 页面范围

首屏介绍面向独立开发者与创业团队的开箱即用服务平台，采用居中的品牌 slogan 与平台主张，不以当前上线的产品限定平台定位。五个具名服务与一张「敬请期待」卡片放在同一个目录中；两个已上线服务的整张卡片可点击，在新标签页中打开各自的线上网站，原主页保留。链接使用 `noopener noreferrer` 隔离新页面：

- [Portcloud VPN](https://vpn.portcloud.online/)：全球节点代理服务。
- [Portcloud Notify](https://notify.portcloud.online/)：API 多渠道消息推送，支持 Agent 接入。

AI Gateway（多租户 LLM 网关）、Proxy（面向中国大陆优化线路的 API 反向代理）、Chat（多租户 Open WebUI，需要自行接入 AI 后端）在同一目录中标为「规划中」，最后一张卡片仅展示「敬请期待」，不预告具体产品。这些卡片是不可点击的静态内容，没有链接、键盘焦点或上线日期承诺。

主页本身不提供统一登录、计费或创建服务实例的功能；使用与接入在对应服务网站完成。价格、免费政策以及未确认的功能不在主页中承诺。新增服务时，更新 `index.html` 中的服务信息与状态，再运行打包和部署命令。

## 中英文切换

导航栏的 `EN` / `中文` 按钮切换整页文案、无障碍标签、页面语言与描述。首次访问默认中文，用户选择保存在浏览器的 `localStorage` 中，刷新后保留；浏览器禁止存储时仍可切换，但不记忆选择。

中文文案直接保存在 HTML 中，对应英文写在 `data-en` 属性里；无障碍标签使用 `data-en-label`。品牌名称与英文 slogan 不随语言变化。JavaScript 不可用时仍可阅读完整中文页面，切换按钮隐藏。修改双语文案时请同步更新两种语言。

## 参考

- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/get-started/)
- [Cloudflare GitHub Actions 部署指南](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)
