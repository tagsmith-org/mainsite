# Google Analytics Setup Guide

## Overview
This project has been configured with Google Analytics 4 (GA4) tracking. The implementation includes:

- Page view tracking for SPA navigation
- Form submission tracking
- Button click tracking
- Custom event tracking
- Scroll depth tracking
- Outbound link tracking

## Setup Instructions

### 1. Create Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use existing one
3. Set up a GA4 data stream for your website
4. Copy the Measurement ID (format: G-XXXXXXXXXX)

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Google Analytics Configuration
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 3. Update HTML Template

Update the Google Analytics script in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    send_page_view: false
  });
</script>
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 4. Verify Installation

1. Start the development server: `npm run dev`
2. Open browser developer tools
3. Check the Network tab for requests to `google-analytics.com`
4. Check the Console for analytics debug messages (in development mode)

## Available Tracking Functions

### Page Views
```typescript
const { trackPageView } = useGoogleAnalytics()
trackPageView('Custom Page Title', 'https://example.com/page')
```

### Events
```typescript
const { trackEvent } = useGoogleAnalytics()
trackEvent('custom_event_name', {
  event_category: 'engagement',
  event_label: 'button_click'
})
```

### Form Submissions
```typescript
const { trackFormSubmission } = useGoogleAnalytics()
trackFormSubmission('contact_form', true) // success
trackFormSubmission('contact_form', false) // failure
```

### Button Clicks
```typescript
const { trackButtonClick } = useGoogleAnalytics()
trackButtonClick('cta_button', 'https://example.com/page')
```

### Scroll Tracking
```typescript
const { trackScroll } = useGoogleAnalytics()
trackScroll(75) // 75% scroll depth
```

### Outbound Links
```typescript
const { trackOutboundLink } = useGoogleAnalytics()
trackOutboundLink('https://external-site.com', 'External Link Text')
```

## Custom Events

The following custom events are automatically tracked:

- `page_view` - Page navigation
- `button_click` - Button interactions
- `form_submit` - Form submissions
- `scroll` - Scroll depth
- `click` - Outbound link clicks
- `custom_event` - Custom events

## Debug Mode

Debug mode is automatically enabled in development. You can see analytics events in the browser console.

## Production Deployment

1. Ensure your `.env` file has the correct Measurement ID
2. Verify Google Analytics is receiving data in the GA4 dashboard
3. Set up conversion goals and audiences as needed

## Privacy Considerations

- The implementation respects user privacy
- No personally identifiable information is sent to Google Analytics
- Consider implementing cookie consent if required by your jurisdiction

## Troubleshooting

### No Data in Google Analytics
1. Check that the Measurement ID is correct
2. Verify the gtag script is loading
3. Check browser console for errors
4. Ensure ad blockers are disabled for testing

### Events Not Tracking
1. Verify the composable is properly imported
2. Check that `initialize()` was called
3. Look for console warnings about uninitialized analytics

### Development vs Production
- Debug mode is enabled in development
- Production builds should have debug mode disabled
- Use the environment variable to control debug mode
