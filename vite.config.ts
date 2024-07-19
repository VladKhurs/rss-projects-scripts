import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  define: {
    global: 'window',
  },
  build: {
    sourcemap: true,
    target: 'esnext',
    chunkSizeWarningLimit: 6600,
  },
  resolve: {
    alias: {
      // '@scss': './src/scss',
      '@scss': path.resolve(__dirname, 'src/scss'),
    },
  },
  server: {
    port: 3500
  }
});
