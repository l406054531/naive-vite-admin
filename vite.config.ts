import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// import.meta.env.MODE
// https://cn.vitejs.dev/guide/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: '0.0.0.0',
        port: 8091,//运行端口
        strictPort: false,
    },
    // build:{
    //     // outDir:
    // },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        dedupe: ['vue'],
    },
     css: {
        preprocessorOptions: {
            scss: {
                modifyVars: {},
                javascriptEnabled: true,
                additionalData: `@import "src/styles/index.scss";`,
            },
        },
    },

})