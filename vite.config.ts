import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
});

module.exports = {
    devServer: {
        proxy: 'http://localhost:8080',
    },
};
