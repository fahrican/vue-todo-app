// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'

// Utilities
import {defineConfig, mergeConfig} from 'vite'
import {fileURLToPath, URL} from 'node:url'
import {configDefaults} from 'vitest/config'
import viteConfig from './vite.config'

// https://vitejs.dev/config/
export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      vue({
        template: {transformAssetUrls},
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
      vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss',
        },
      }),
      ViteFonts({
        google: {
          families: [
            {
              name: 'Roboto',
              styles: 'wght@100;300;400;500;700;900',
            },
          ],
        },
      }),
    ],
    define: {'process.env': {}, 'import.meta.vitest': 'undefined'},
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    server: {
      port: 3000,
    },
    test: {
      globals: true,
      setupFiles: "src/setupTests.ts",
      server: {
        deps: {
          inline: ['vuetify']
        }
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/]
      }
    }
  })
)

