import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  // Relative asset paths, so the build also works under a sub-path such as GitHub Pages
  base: './',
  plugins: [react(), svgr()],
  server: { port: 3000 },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
