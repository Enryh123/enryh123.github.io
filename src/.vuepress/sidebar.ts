import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/solutions/":[
    {
      text: "参考题解",
      children: "structure",
    },
  ],
  "/math/":[
    {
      text: "数学",
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
