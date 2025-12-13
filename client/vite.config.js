import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "src/hooks/useRanking": path.resolve(
        __dirname,
        "cypress/support/mocks/useRankingMock.js"
      ),
    },
  },
});

