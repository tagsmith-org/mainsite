import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import { useStructuredData } from './composables/useStructuredData'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize structured data
const { addOrganizationSchema, addWebSiteSchema } = useStructuredData()

// Add global structured data
addOrganizationSchema()
addWebSiteSchema()

app.mount('#app')

