import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src', // Example alias for cleaner imports
    },
  },
  server: {
    port: 3000, // Customize the port if needed
  },
});