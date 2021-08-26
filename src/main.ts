import { createApp } from 'vue'
import { store, key } from './store'
import router from './router'
import App from './App.vue'
// import { ElButton, ElIcon } from 'element-plus'

const app = createApp(App)

// app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
// app.use(ElButton)
// app.use(ElIcon)

app.use(store, key)
app.use(router)

app.mount('#app')
