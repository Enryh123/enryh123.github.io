import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/math/":[
    {
      text: "概念",
      children: "structure",
    },
    {
      text: "序列",
      prefix: "serial/",
      link: "serial/",
      children: "structure",
    },
  ],
  "/": [
    "",
    {
      text: "算法",
      icon: "shapes",
      prefix: "algorithm/",
      children: "structure"
    },
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    },
  ],
});
