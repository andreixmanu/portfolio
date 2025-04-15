import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import wasm from "vite-plugin-wasm";

export default defineConfig({
    plugins: [vue(), wasm()],
    build: {
        rollupOptions: {
            // Specifica i file esterni che non devono essere inclusi nel bundle
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
            strict: false, // Consenti percorsi esterni alla root
        },
    },
    optimizeDeps: {
        // Escludi i file WASM dall'ottimizzazione
        exclude: ["backend/decryptor/pkg/decryptor_bg.wasm"],
    },
});
