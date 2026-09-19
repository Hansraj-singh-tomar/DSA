import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['products.json'],
      manifest: {
        name: 'ShopKart — Offline Demo',
        short_name: 'ShopKart',
        description: 'E-commerce offline demo with Workbox + IndexedDB',
        theme_color: '#2563eb',
        background_color: '#f8fafc',
        display: 'standalone',
        icons: [
          {
            src: 'icon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg,json}'],
        runtimeCaching: [
          {
            // Product catalog API — try network first, fall back to cache when offline
            urlPattern: ({ url }) => url.pathname.endsWith('products.json'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'products-api',
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
              networkTimeoutSeconds: 3,
            },
          },
        ],
      },
      devOptions: {
        enabled: true, // Service worker works in dev too
      },
    }),
  ],
});
