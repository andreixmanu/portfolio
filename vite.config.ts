import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig({
    base: '/portfolio/',

    plugins: [vue(), wasm()],
    build: {
        rollupOptions: {
            // Specifica i file esterni che non devono essere inclusi nel bundle
            // Potrebbe non essere necessario con vite-plugin-wasm, valuta se serve ancora
            external: ["backend/decryptor/pkg/decryptor_bg.wasm"],
        },
        target: "esnext", // Necessario per supportare i moduli WASM
    },
    resolve: {
        alias: {
            "@": "/src", // Alias per semplificare le importazioni
        },
    },
    server: {
        port: 4200, // Specifica la porta
        // Forza il tipo MIME corretto per i file .wasm
        fs: {
            strict: false, // Consenti percorsi esterni alla root (utile in dev)
        },
    },
    optimizeDeps: {
        // Escludi i file WASM dall'ottimizzazione
        exclude: ["backend/decryptor/pkg/decryptor_bg.wasm"],
    },
});