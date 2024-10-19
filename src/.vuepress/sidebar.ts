import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/math/":[
    {
      text: "数学",
      children: "structure",
    },
  ],
  "/solutions/":[
    {
      text: "题解",
      children: "structure"
    }
  ],
  "/": [
    {
      text: "语法",
      icon: "shapes",
      prefix: "grammar/",
      children: "structure",
      expanded: true,
    },
    {
      text: "算法",
      icon: "shapes",
      prefix: "algorithm/",
      children: "structure",
      expanded: true,
    },
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    // },
  ],
});
