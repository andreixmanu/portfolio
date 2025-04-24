import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        vue(),
        wasm(),
        topLevelAwait()
    ],
    base: './',
    publicDir: 'public',
    assetsInclude: ['**/*.wasm'],
    define: {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
    build: {
        target: "esnext",
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            },
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name && assetInfo.name.endsWith('.wasm')) {
                        return 'assets/[name][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                }
            }
        }
    },
    optimizeDeps: {
        exclude: ['**/decryptor_bg.wasm']
    },
    server: {
        port: 4200,
        fs: {
            strict: false,
            allow: ['.', '..']
        },
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp"
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        }
    },

});
