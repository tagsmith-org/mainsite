import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import { useStructuredData } from './composables/useStructuredData'
import { useGoogleAnalytics } from './composables/useGoogleAnalytics'
import { analyticsConfig } from './config/analytics'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize structured data
const { addOrganizationSchema, addWebSiteSchema } = useStructuredData()

// Initialize Google Analytics
const { initialize: initializeAnalytics, trackPageView } = useGoogleAnalytics()
if (!window.__PRERENDER__) {
  initializeAnalytics({
    measurementId: analyticsConfig.measurementId,
    debugMode: analyticsConfig.debugMode,
  })
}

// Add global structured data
addOrganizationSchema()
addWebSiteSchema()

if (!window.__PRERENDER__) {
  trackPageView()
}

app.mount('#app')

router.isReady().then(async () => {
  await nextTick()
  document.documentElement.dataset.prerenderReady = '1'
  document.dispatchEvent(new Event('app-rendered'))
})

