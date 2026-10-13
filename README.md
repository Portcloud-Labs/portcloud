<p align="center">
  <img src="assets/logo.svg" alt="Portcloud" width="320">
</p>

<p align="center"><strong>Need a port. Not a server.</strong></p>

<p align="center"><a href="https://portcloud.online">portcloud.online ↗</a></p>

<p align="center"><a href="https://github.com/portcloud-labs">GitHub</a></p>

## 关于 Portcloud

Portcloud 是面向独立开发者与创业团队的开箱即用服务平台。

你需要的是一个服务，不是一台服务器。配置你需要的服务，其余基础设施交给 Portcloud，无需从零搭建和维护。

**如果只需要一个端口，不要为整台主机付费。**

我们提供可以直接使用、接入应用与工作流的能力，让你把时间留给产品和创造，而不是服务器与运维。

所有服务均支持 Agent 接入。我们将为每项服务陆续提供对应的 Skill，让 Agent 在任务与工作流中使用服务能力。首页设有独立的 Agent 能力介绍区块。

Portcloud NAT VPS 是基于共享服务器、通过 NAT 提供网络连接的服务，并非独享整台主机，目前处于规划中。

**开发者需要的是服务，不是服务器。**

## 首页语言

首页默认使用中文，语言按钮可切换中英文；选择保存在浏览器的 `localStorage` 中（键名 `portcloud-language`）。

`index.html` 在解析正文前读取保存的语言，通过 `<html lang>` 和 CSS 选择预置的双语文案及按钮文字，首屏展示不依赖 `assets/language.js` 下载完成。该脚本负责按钮交互、无障碍标签和页面描述的切换。浏览器存储不可用时，默认使用中文，仍可切换语言，但不保存选择。

修改文案时同步维护 `.localized` 内的 `lang="zh-CN"` 和 `lang="en"` 子元素；中文换行可保留 `<br>`。
