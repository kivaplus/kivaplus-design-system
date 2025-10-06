import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { peerDependencies } from './package.json'

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    // Library build configuration
    return {
      plugins: [react()],
      css: {
        postcss: './postcss.config.js',
      },
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'KivaplusDesignSystem',
          formats: ['es'],
          fileName: 'index'
        },
        rollupOptions: {
          external: [
            ...Object.keys(peerDependencies),
            'react/jsx-runtime'
          ],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'react/jsx-runtime'
            }
          }
        },
        sourcemap: true,
        emptyOutDir: true
      }
    }
  }

  // Development configuration
  return {
    plugins: [react()],
    css: {
      postcss: './postcss.config.js',
    },
  }
})
