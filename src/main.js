import { createApp } from 'vue'
import { router } from './router.js'
import { store } from './store/store.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {ElButton} from 'element-plus'
import { Delete} from '@element-plus/icons-vue'
import './assets/styles/main.scss'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus,Delete,ElButton)
app.use(router)
app.use(store)
app.mount('#app')
