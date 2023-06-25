import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: "0.0.0.0",
        port: 18000,
        open: false,
        https: false,
        proxy: {
            "/web": {
                target: "http://124.222.0.214:8000", // 使用您提供的后端 URL
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/web/, "/web"),
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@api": path.resolve(__dirname, "api"),
        },
    },
    plugins: [react()],
});
