import { App, createApp } from 'vue'

/**
 * @description 加载所有 Plugins
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
export function loadAllPlugins(app: App<Element>) {
    const files: any = import.meta.globEager('./*.ts')
    for (const path in files) {
        files[path].default(app) 
    }
}
