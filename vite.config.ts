import {defineConfig} from 'vite';
import {vitePlugin as remix} from '@remix-run/dev';
import {resolve} from 'path';

export default defineConfig({
  plugins: [
    remix({
      serverModuleFormat: 'esm',
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './app'),
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
  optimizeDeps: {
    include: ['clsx', 'lucide-react'],
  },
});
