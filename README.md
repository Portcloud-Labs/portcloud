<p align="center">
  <img src="assets/logo.svg" alt="Portcloud" width="320">
</p>

<p align="center"><strong>Need a port. Not a server.</strong></p>

<p align="center"><a href="https://portcloud.online">portcloud.online ↗</a></p>

<p align="center"><a href="https://github.com/portcloud-labs">GitHub</a></p>

## 关于 Portcloud

Portcloud 是面向开发者的服务云（Developer Service Cloud）：开箱即用的云服务，为独立开发者和创业团队而设计。

你需要的是一个服务，不是一台服务器。选择你需要的能力，域名、HTTPS 和基础设施交给 Portcloud，无需从零搭建和维护。

**如果只需要一个端口，不要为整台主机付费。**

**从需求开始，而不是从部署开始。** 配置你需要的服务，拿到 endpoint 或凭据即可使用——而不是创建主机、安装、部署、配置 DNS 与 SSL、再持续维护。

所有服务默认支持 Agent 接入（Agent-ready by default）：每项服务都提供 API 与接入凭据，Agent 可以直接在任务与工作流中使用；对应 Skill 将陆续提供。

服务目录末尾的“敬请期待”卡片为后续服务预留位置，不提供跳转入口，并支持中英文切换。

Portcloud Runtime（规划中）是共享主机上的轻量运行环境，通过 NAT 提供网络连接，按需取用，无需独享整台主机。

## 首页语言

首页默认使用中文。点击右下角「文 A」翻译图标，在按钮左侧展开的面板中选择「中文」或「English」；当前语言高亮，选择后关闭面板。支持外点、Escape 关闭及键盘选择；选择保存在浏览器的 `localStorage` 中（键名 `portcloud-language`）。

`index.html` 在解析正文前读取保存的语言，通过 `<html lang>` 和 CSS 选择预置的双语文案及按钮文字，首屏展示不依赖 `assets/language.js` 下载完成。该脚本负责按钮交互、无障碍标签和页面描述的切换。浏览器存储不可用时，默认使用中文，仍可切换语言，但不保存选择。

修改文案时同步维护 `.localized` 内的 `lang="zh-CN"` 和 `lang="en"` 子元素；中文换行可保留 `<br>`。

## 账号入口

右下角另一圆形按钮提供统一账号入口：未登录时前往认证中心，已登录时显示头像缩写，点击展开用户名、账号中心和退出登录。菜单支持外点和 Escape 关闭，不列出各服务控制台；服务入口保留在服务目录。浮动控件与顶部导航分离，长用户名不会挤占导航空间。


## 品牌命名

- 对外主品牌、版权署名统一为 **Portcloud**，不使用 `Portcloud Labs`、`Portcloud Network` 等其他主体名称。
- 具体产品保留完整名称，例如 **Portcloud Notify**、**Portcloud VPN**、**Portcloud Notify Toolkit**；账号中心使用「Portcloud 账号」或「Portcloud 统一认证」等功能性称呼。
- GitHub 组织 `portcloud-labs`、仓库名、域名、API 路径、环境变量、包名和部署标识是实际技术标识，不按显示文案替换；历史归档不重写。

## 本地工作区

官网源码位于统一工作区的 `portcloud/portcloud-homepage/`。本次仅调整本地目录，GitHub 仓库保持为 [`portcloud-labs/portcloud`](https://github.com/portcloud-labs/portcloud)，线上域名和部署配置不变。

