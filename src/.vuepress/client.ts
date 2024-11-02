// import { defineRevealJsConfig } from "@vuepress/plugin-revealjs/client";

// defineRevealJsConfig({
//   // 在此设置 reveal.js 选项
// });

import { defineClientConfig } from "vuepress/client";
import PrintControl from "./components/PrintControl.vue";

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.component("PrintControl", PrintControl);
  },
});
