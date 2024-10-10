import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/algorithm/",
  "/solutions/",
  {
    text:"数学",
    icon:"wave-square",
    link: "/math/"
  },
  {
    text: "向导",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "Level-1",
        icon: "lightbulb",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "Level-2",
        icon: "lightbulb",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
