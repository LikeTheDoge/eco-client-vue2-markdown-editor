import { AxiosAdapter, ERequest } from 'e-request'
import { createApp } from 'vue'
import App from './App.vue'
import { auth } from './auth'
import axios from 'axios'
import EIcon from './components/EIcon.vue'

import './style/overload.scss'
import './style/base.scss'
import './style/markdown/index.scss'

import router from './router'

const app = createApp(App)
app.component('EIcon',EIcon)
app.use(router);
app.mount('#app')

ERequest.adapter = new AxiosAdapter(axios as any)
ERequest.fetchToken = () => Promise.resolve(auth.getToken() || undefined)
ERequest.errorAlert = (e) => alert(e.message)
ERequest.authDeal = (e) => console.error(e)
