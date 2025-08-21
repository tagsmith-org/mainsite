import { ref, readonly } from 'vue'

interface GoogleAnalyticsConfig {
  measurementId: string
  debugMode?: boolean
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export function useGoogleAnalytics() {
  const isInitialized = ref(false)
  const analyticsConfig = ref<GoogleAnalyticsConfig | null>(null)

  function initialize(config: GoogleAnalyticsConfig) {
    if (isInitialized.value) return

    // Set configuration
    analyticsConfig.value = config

    // Create dataLayer
    window.dataLayer = window.dataLayer || []

    // Define gtag function
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }

    // Set timestamp
    window.gtag('js', new Date())

    // Configure gtag
    window.gtag('config', config.measurementId, {
      debug_mode: config.debugMode || false,
      send_page_view: false // We'll handle this manually for SPA
    })

    isInitialized.value = true

    if (config.debugMode) {
      console.log('Google Analytics initialized with ID:', config.measurementId)
    }
  }

  function trackPageView(pageTitle?: string, pageLocation?: string) {
    if (!isInitialized.value) {
      console.warn('Google Analytics not initialized')
      return
    }

    const title = pageTitle || document.title
    const location = pageLocation || window.location.href

    window.gtag('event', 'page_view', {
      page_title: title,
      page_location: location,
      page_path: window.location.pathname
    })

    if (analyticsConfig.value?.debugMode) {
      console.log('Page view tracked:', { title, location })
    }
  }

  function trackEvent(eventName: string, parameters?: Record<string, any>) {
    if (!isInitialized.value) {
      console.warn('Google Analytics not initialized')
      return
    }

    window.gtag('event', eventName, parameters)

    if (analyticsConfig.value?.debugMode) {
      console.log('Event tracked:', eventName, parameters)
    }
  }

  function trackCustomEvent(category: string, action: string, label?: string, value?: number) {
    trackEvent('custom_event', {
      event_category: category,
      event_action: action,
      event_label: label,
      value: value
    })
  }

  function trackButtonClick(buttonName: string, pageLocation?: string) {
    trackEvent('button_click', {
      button_name: buttonName,
      page_location: pageLocation || window.location.href
    })
  }

  function trackFormSubmission(formName: string, success: boolean = true) {
    trackEvent('form_submit', {
      form_name: formName,
      success: success
    })
  }

  function trackScroll(depth: number) {
    trackEvent('scroll', {
      scroll_depth: depth
    })
  }

  function trackOutboundLink(url: string, linkText?: string) {
    trackEvent('click', {
      link_url: url,
      link_text: linkText,
      outbound: true
    })
  }

  return {
    initialize,
    trackPageView,
    trackEvent,
    trackCustomEvent,
    trackButtonClick,
    trackFormSubmission,
    trackScroll,
    trackOutboundLink,
    isInitialized: readonly(isInitialized)
  }
}
