import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GOOGLE_MAPS_PLATFORM_KEY': JSON.stringify(env.GOOGLE_MAPS_PLATFORM_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Heavy isolated libs first — no circular risk
            if (id.includes('node_modules/recharts') || id.includes('/node_modules/d3-')) {
              return 'vendor-charts';
            }
            if (id.includes('node_modules/motion/') || id.includes('node_modules/framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('node_modules/swiper')) {
              return 'vendor-swiper';
            }
            if (id.includes('node_modules/tesseract')) {
              return 'vendor-ocr';
            }
            if (id.includes('node_modules/jspdf') || id.includes('node_modules/html2canvas')) {
              return 'vendor-pdf';
            }
            if (id.includes('node_modules/firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('node_modules/@react-google-maps') || id.includes('node_modules/@vis.gl')) {
              return 'vendor-maps';
            }
            if (id.includes('node_modules/html5-qrcode') || id.includes('node_modules/qrcode') || id.includes('node_modules/jsbarcode')) {
              return 'vendor-qr';
            }
            // React core — Rollup resolves this correctly when put last
            if (id.includes('node_modules/react-dom')) return 'vendor-react';
            if (id.includes('node_modules/react/')) return 'vendor-react';
          },
        },
      },
    },
  };
});
