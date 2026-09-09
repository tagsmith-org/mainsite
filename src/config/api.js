// API Configuration
const API_CONFIG = {
  // Development
  development: {
    baseURL: 'http://localhost:3000',
    endpoints: {
      contact: '/api/email/contact',
      order: '/api/email/order',
      unsubscribe: '/api/unsubscribe'
    }
  },
  
  // Production
  production: {
    baseURL: 'https://api.websmith-shop.com',
    endpoints: {
      contact: '/api/email/contact',
      order: '/api/email/order',
      unsubscribe: '/api/unsubscribe'
    }
  }
}

// Get current environment
const environment = import.meta.env.MODE || 'development'

// Export current config
export const apiConfig = API_CONFIG[environment]

// Helper functions
export function getApiUrl(endpoint) {
  return `${apiConfig.baseURL}${apiConfig.endpoints[endpoint]}`
}

export function getContactUrl() {
  return getApiUrl('contact')
}

export function getOrderUrl() {
  return getApiUrl('order')
}

export function getUnsubscribeUrl() {
  return getApiUrl('unsubscribe')
}

// Log current configuration
console.log(`API Config: ${environment}`, apiConfig)
