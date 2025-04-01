import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'color-functions', 'global-builtin'],
        // Чтобы предупреждения с устаревшими функциями не светились
      },
    },
  },
  base: '/KoperReact'
});