import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), mkcert()],
  root: "./",
  publicDir: "src/public",

  server: {
    https: true,
    port: 3001,
    host: "local.mediappvlocal.tech",
    proxy: {
      "/api": {
        target: "http://localhost:9000",
      },
    },
  },
});
