import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '..',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  plugins: [
    // Allows using React dev server along with building a React application with Vite.
    // https://npmjs.com/package/@vitejs/plugin-react-swc
    react(),
    // Allows using the compilerOptions.paths property in tsconfig.json.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths(),
  ],
  build: {
    target: 'esnext',
  },
  publicDir: './public',
  server: {
    // Exposes your dev server and makes it accessible for the devices in the same network
    host: true,
    // Use a specific port for consistency
    port: 5173,
    hmr: {
      clientPort: 443,
    },
    allowedHosts: ['.ngrok-free.app'],
  },
});

