import { defineConfig } from "cypress";
import viteConfig from "./vite.config.js";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig,
    },
  },

  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      
    },
  },
});
