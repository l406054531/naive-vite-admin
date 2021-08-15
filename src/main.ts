import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./router/beforeEach"
import { loadAllPlugins } from './plugins'
import { setupStore } from './store';
import { createPinia } from 'pinia'
import MakeitCaptcha from 'makeit-captcha'
import 'makeit-captcha/dist/captcha.min.css'
const app = createApp(App)
app.use(createPinia())

loadAllPlugins(app)
setupStore(app)

app.use(MakeitCaptcha)
app.use(router).mount('#app')



