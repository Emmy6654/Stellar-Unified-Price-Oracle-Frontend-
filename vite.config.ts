/// <reference types="vitest" />
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// Dumps each output chunk's source-module list next to the Vite manifest so the
// bundle budget guard can verify which npm packages actually landed in which
// vendor chunk, instead of trusting chunk names.
function chunkModulesManifest(): Plugin {
  return {
    name: 'chunk-modules-manifest',
    generateBundle(_options, bundle) {
      const chunks: Record<string, unknown> = {}
      for (const [fileName, output] of Object.entries(bundle)) {
        if (output.type !== 'chunk') continue
        chunks[fileName] = {
          name: output.name,
          isEntry: output.isEntry,
          isDynamicEntry: output.isDynamicEntry,
          modules: Object.keys(output.modules).filter((id) => !id.startsWith('\0')),
        }
      }
      this.emitFile({
        type: 'asset',
        fileName: '.vite/chunk-modules.json',
        source: JSON.stringify(chunks, null, 2),
      })
    },
  }
}

export default defineConfig({
  plugins: [
    chunkModulesManifest(),
    react(),
    tailwindcss(),
    ...(process.env.ANALYZE === 'true'
      ? [
          visualizer({
            filename: 'reports/bundle-stats.html',
            open: false,
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : []),
  ],
  base: '/Stellar-Unified-Price-Oracle-Frontend-/',
  build: {
    // Emits dist/.vite/manifest.json so the budget guard can tell statically
    // imported (initial-load) chunks from dynamically imported (lazy) ones.
    manifest: true,
    rollupOptions: {
      output: {
        // Assign every third-party library to a named vendor chunk. Without
        // this, a heavy dependency silently inflates a chunk that reviewers
        // read as "just React", which is exactly the hole budgets fail to close.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'vendor-react'
          if (/node_modules\/(react-router|react-router-dom|@remix-run)\//.test(id)) {
            return 'vendor-router'
          }
          if (/node_modules\/(recharts|victory-vendor|d3-[a-z]+|decimal\.js-light)\//.test(id)) {
            return 'vendor-charts'
          }
          return undefined
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    exclude: ['e2e/**', 'node_modules/**'],
  },
})
