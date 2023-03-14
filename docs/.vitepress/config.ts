import { resolve } from "path";
// import type { DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";
import { defaultSidebar } from "./defaultSidebar";
// import { generateFileSidebar } from "./file-sidebar";

const r = (p: string) => resolve(__dirname, p);

// generateFileSidebar(r('../useForm'))
export default defineConfig({
  base: "",
  title: "首页",
  description: "composition api form validator for vue",
  // appearance: false,
  lastUpdated: true,


  markdown: {
    anchor: {},
    toc: { level: [1, 2, 3] },
    theme: {
      light: "min-dark",
      dark: "one-dark-pro",
    },
    lineNumbers: true,
  },
  themeConfig: {
    outline: [1, 3],
    sidebar: defaultSidebar,
    nav: [
      ...defaultSidebar.slice(1, 5),
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/W-xiaowei/web" },
    ],
    footer: {
      copyright: "Start from today © 2023-present",
    },
    editLink: {
      pattern: "https://github.com/W-xiaowei/web",
      text: "Edit this page on Gitlab",
    },
    lastUpdatedText: "Last Updated",
    localeLinks: {
      text: "English",
      items: [{ text: "简体中文", link: "https://netlify.app" }],
    },
  },
});
