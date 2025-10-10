import { defineConfig } from 'weapp-vite/config'
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite'

export default defineConfig({
    weapp: {
        srcRoot: 'src',
        generate: {
          extensions: {
            js: 'ts',
            wxss: 'scss',
          },
          dirs: {
            component: 'src/components',
            page: 'src/pages',
          },
          // 假如你想让默认生成的组件命名为 HelloWorld/index 而不是 HelloWorld/HelloWorld 可以下列选项
          filenames: {
            component: 'index',
            page: 'index',
          },
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            silenceDeprecations: ['legacy-js-api', 'import'],
          },
        },
      },
    plugins: [
        uvwt({
            rem2rpx: true,
        }),
    ],
})
