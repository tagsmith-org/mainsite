import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Services from '../views/Services.vue'
import Portfolio from '../views/Portfolio.vue'
import Contact from '../views/Contact.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import Terms from '../views/Terms.vue'
import Cookies from '../views/Cookies.vue'
import Unsubscribe from '../views/Unsubscribe.vue'
import NotFound from '../views/NotFound.vue'
import { useGoogleAnalytics } from '../composables/useGoogleAnalytics'

const routes = [
  { 
    path: '/', 
    component: Home,
    meta: {
      title: 'WebSmith — sites, systems, apps, and automations',
      description: 'Custom websites, web systems, Android and iOS apps, backend, and business automations. Starting prices, then by agreement.',
      ogTitle: 'WebSmith — sites, systems, apps, and automations',
      ogDescription: 'Custom websites, web systems, Android and iOS apps, backend, and business automations. Starting prices, then by agreement.',
      ogImage: '/favicon_32x32.png',
      canonical: 'https://websmith-shop.com/'
    }
  },
  {
    path: '/what-we-do',
    redirect: '/services',
  },
  { 
    path: '/services', 
    component: Services,
    meta: {
      title: 'Services and pricing — WebSmith',
      description: 'Landing pages from $200+. Company sites, shops, web systems, native apps, and automations. Price by agreement.',
      ogTitle: 'Services and pricing — WebSmith',
      ogDescription: 'Landing pages from $200+. Company sites, shops, web systems, native apps, and automations. Price by agreement.',
      ogImage: '/favicon_32x32.png',
      canonical: 'https://websmith-shop.com/services'
    }
  },
  {
    path: '/work',
    component: Portfolio,
    meta: {
      title: 'Work — WebSmith',
      description: 'Live Pet Friends system, a contractor jobsite cabinet, lead outreach and site checks, plus demo sites.',
      ogTitle: 'Work — WebSmith',
      ogDescription: 'Live Pet Friends system, a contractor jobsite cabinet, lead outreach and site checks, plus demo sites.',
      ogImage: '/favicon_32x32.png',
      canonical: 'https://websmith-shop.com/work',
    },
  },
  {
    path: '/portfolio',
    redirect: '/work',
  },
  { 
    path: '/contact', 
    component: Contact,
    meta: {
      title: 'Get a quote — WebSmith',
      description: 'Tell us what you need: a site, a system, an app, or an automation. Reply within 24–48 hours.',
      ogTitle: 'Get a quote — WebSmith',
      ogDescription: 'Tell us what you need: a site, a system, an app, or an automation. Reply within 24–48 hours.',
      ogImage: '/favicon_32x32.png',
      canonical: 'https://websmith-shop.com/contact'
    }
  },
  { 
    path: '/privacy-policy', 
    component: PrivacyPolicy,
    meta: {
      title: 'Privacy Policy - WebSmith Shop',
      description: 'Privacy Policy for WebSmith Shop. Learn how we collect, use, and protect your personal data when you interact with our website.',
      keywords: 'privacy policy, data protection, personal data, cookies, GDPR, privacy rights, data collection, website privacy',
      ogTitle: 'Privacy Policy - WebSmith Shop',
      ogDescription: 'Privacy Policy for WebSmith Shop. Learn how we collect, use, and protect your personal data when you interact with our website.',
      ogImage: '/favicon_32x32.png',
      canonical: 'https://websmith-shop.com/privacy-policy'
    }
  },
  { 
    path: '/terms', 
    component: Terms,
    meta: {
      title: 'Terms of Use - WebSmith Shop',
      description: 'Terms of Use for WebSmith Shop. Learn about acceptable use, intellectual property rights, and service terms for our web development services.',
      keywords: 'terms of use, website terms, intellectual property, liability, service terms, web development terms, legal terms',
      ogTitle: 'Terms of Use - WebSmith Shop',
      ogDescription: 'Terms of Use for WebSmith Shop. Learn about acceptable use, intellectual property rights, and service terms for our web development services.',
      ogImage: '/favicon_32x32.png',
      canonical: 'https://websmith-shop.com/terms'
    }
  },
  { 
    path: '/cookies', 
    component: Cookies,
    meta: {
      title: 'Cookie Policy - WebSmith Shop',
      description: 'Cookie Policy for WebSmith Shop. Learn about how we use cookies to improve your browsing experience and website functionality.',
      keywords: 'cookie policy, cookies, website cookies, browser cookies, cookie management, privacy cookies, analytics cookies',
      ogTitle: 'Cookie Policy - WebSmith Shop',
      ogDescription: 'Cookie Policy for WebSmith Shop. Learn about how we use cookies to improve your browsing experience and website functionality.',
      ogImage: '/favicon_32x32.png',
      canonical: 'https://websmith-shop.com/cookies'
    }
  },
  {
    path: '/unsubscribe',
    component: Unsubscribe,
    meta: {
      title: 'Unsubscribe - WebSmith Shop',
      description: 'Unsubscribe from WebSmith outreach messages.',
      canonical: 'https://websmith-shop.com/unsubscribe'
    }
  },
  {
    path: '/404',
    component: NotFound,
    meta: {
      title: 'Page not found — WebSmith',
      description: 'This page does not exist. Open home, services, or work instead.',
      canonical: 'https://websmith-shop.com/404',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: {
      title: 'Page not found — WebSmith',
      description: 'This page does not exist. Open home, services, or work instead.',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, top: 96, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

// Global navigation guard to update meta tags and track analytics
router.beforeEach((to, from, next) => {
  if (to.meta) {
    // Update document title
    if (to.meta.title) {
      document.title = to.meta.title
    }
    
    // Update meta description
    if (to.meta.description) {
      updateMetaTag('description', to.meta.description)
    }
    
    // Update keywords
    if (to.meta.keywords) {
      updateMetaTag('keywords', to.meta.keywords)
    }
    
    // Update Open Graph tags
    if (to.meta.ogTitle) {
      updateMetaTag('og:title', to.meta.ogTitle)
    }
    if (to.meta.ogDescription) {
      updateMetaTag('og:description', to.meta.ogDescription)
    }
    if (to.meta.ogImage) {
      updateMetaTag('og:image', to.meta.ogImage)
    }
    updateMetaTag('og:url', `https://websmith-shop.com${to.path}`)
    
    // Update Twitter tags
    if (to.meta.ogTitle) {
      updateMetaTag('twitter:title', to.meta.ogTitle)
    }
    if (to.meta.ogDescription) {
      updateMetaTag('twitter:description', to.meta.ogDescription)
    }
    if (to.meta.ogImage) {
      updateMetaTag('twitter:image', to.meta.ogImage)
    }
    
    // Update canonical URL
    if (to.meta.canonical) {
      updateCanonicalLink(to.meta.canonical)
    } else {
      updateCanonicalLink(`https://websmith-shop.com${to.path}`)
    }
  }
  
  next()
})

// Track page views after navigation
router.afterEach((to) => {
  if (window.__PRERENDER__) {
    return
  }
  const { trackPageView } = useGoogleAnalytics()
  trackPageView(to.meta?.title || document.title)
})

function updateMetaTag(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      meta.setAttribute('property', name)
    } else {
      meta.setAttribute('name', name)
    }
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

function updateCanonicalLink(url) {
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = url
}

export default router