import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],

    // SEC-2: GEMINI_API_KEY eliminado del bundle del cliente.
    // Solo GOOGLE_MAPS_PLATFORM_KEY (clave de cliente restringida por dominio) se mantiene.
    // Las llamadas a Gemini deben ir siempre a través del endpoint /api/ai/chat en server.ts.
    define: {
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
  };
});
