import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/math/":[
    {
      text: "数学",
      children: "structure",
    },
  ],
  // "/solutions/":[
  //   {
  //     text: "题解",
  //     children: "structure"
  //   }
  // ],
  "/reference/": [
    {
      text: "语法",
      icon: "shapes",
      prefix: "grammar/",
      children: "structure",
      expanded: true,
    },
    {
      text: "基础算法",
      icon: "shapes",
      prefix: "basic/",
      children: "structure",
      expanded: true,
    },
    {
      text: "其他",
      icon: "font-awesome",
      prefix: "others/",
      children: "structure",
      expanded: true,
    },
  ],
});
