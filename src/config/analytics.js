export const analyticsConfig = {
  // Replace with your actual Google Analytics Measurement ID (G-XXXXXXXXXX)
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  
  // Enable debug mode in development
  debugMode: import.meta.env.DEV,
  
  // Custom dimensions and metrics
  customDimensions: {
    userType: 'cd1',
    pageType: 'cd2',
    contentCategory: 'cd3'
  },
  
  // Event names
  events: {
    PAGE_VIEW: 'page_view',
    BUTTON_CLICK: 'button_click',
    FORM_SUBMIT: 'form_submit',
    SCROLL: 'scroll',
    OUTBOUND_LINK: 'click',
    CUSTOM_EVENT: 'custom_event'
  }
}
