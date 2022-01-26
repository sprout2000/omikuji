import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: './src',
  build: {
    emptyOutDir: true,
    outDir: '../public',
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: 'お神籤',
        name: 'お神籤',
        description: 'お神籤アプリ PWA',
        lang: 'ja',
        icons: [
          {
            src: './icons/manifest-icon-144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: './icons/manifest-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './icons/manifest-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: '.',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#007aff',
        background_color: '#efeff4',
      },
    }),
  ],
});
