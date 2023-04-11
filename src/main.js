import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Dropdown } from 'bootstrap'

createApp(App).use(router).mount('#app')
