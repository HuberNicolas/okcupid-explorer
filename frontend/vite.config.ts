import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // Relative asset paths, so the build works under any sub-path such as GitHub Pages
  base: './',
  plugins: [vue()],
  server: { port: 3000 },
  build: {
    // ECharts is about 580 kB (195 kB gzipped) in its own, separately cached chunk
    chunkSizeWarningLimit: 650,
    rolldownOptions: {
      output: {
        // Keep ECharts in its own chunk, so app updates do not invalidate it
        codeSplitting: { groups: [{ name: 'echarts', test: /node_modules[\\/](echarts|zrender)/ }] },
      },
    },
  },
  test: {
    environment: 'jsdom',
  },
});
