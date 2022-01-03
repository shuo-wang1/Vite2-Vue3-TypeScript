/*
 * @Author: Shuo Wang
 * @Date: 2021-12-20 09:52:17
 * @LastEditTime: 2021-12-27 09:38:48
 * @LastEditors: Shuo Wang
 * @Description:
 * @FilePath: /vite-vue3-ts-/vite.config.ts
 * 专业写bug，副业改bug
 */
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'; //      主要用于alias文件路径别名
import AutoImport from 'unplugin-auto-import/vite';
import {
  AntDesignVueResolver,
  ElementPlusResolver,
  ElementUiResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

//      加别名的函数
function pathResolve(dir) {
  return resolve(__dirname, '.', dir);
}

//      https://     vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    Components({
      // ui库解析器，也可以自定义
      resolvers: [
        ElementPlusResolver(),
        AntDesignVueResolver(),
        VantResolver(),
        ElementUiResolver(),
      ],
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // ui库解析器
      // resolvers: [ElementPlusResolver()],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: true,
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      dts: true,
      imports: ['vue', 'vue-router'],
    }),
  ], //       配置需要使用的插件列表，这里将vue添加进去
  //      配置文件别名 vite1.0是/@/  2.0改为/@
  //      这里是将src目录配置别名为 /@ 方便在项目中导入src目录下的文件
  resolve: {
    alias: {
      '/@': pathResolve('src'),
      '/config': pathResolve('public/config'),
      '/com': pathResolve('src/components'),
    },
  },
  //      base: 'vue3-blog', //  便于发布到gitee
  //      打包配置
  build: {
    target: 'modules',
    //      outDir: 'dist', //  指定输出路径
    //      assetsDir: 'assets', //   指定生成静态资源的存放路径
    minify: 'terser', //      混淆器，terser构建后文件体积更小
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  //      本地运行配置，及反向代理配置
  server: {
    cors: true, //      默认启用并允许任何源
    open: true, //      在服务器启动时自动在浏览器中打开应用程序
    https: false,
    //     反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '/api': {
        target: '', //     代理接口
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/scss/global.scss";', //       引入全局变量
      },
    },
  },
});
