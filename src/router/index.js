import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Services from '../views/Services.vue'
import Portfolio from '../views/Portfolio.vue'
import Contact from '../views/Contact.vue'
import WhatWeDo from '../views/WhatWeDo.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import Terms from '../views/Terms.vue'
import Cookies from '../views/Cookies.vue'
import { useGoogleAnalytics } from '../composables/useGoogleAnalytics'

const routes = [
  { 
    path: '/', 
    component: Home,
    meta: {
      title: 'WebSmith Shop - Modern Web Development with Astro & Vue.js',
      description: 'Professional web development using modern technologies (Astro, Vue.js) for lightning-fast websites. Free hosting options, 70-100% cost savings vs WordPress. Custom landing pages, corporate sites, and web applications.',
      keywords: 'modern web development, Astro framework, Vue.js development, fast websites, free hosting, Netlify, Vercel, Cloudflare, WordPress alternative, static site generation, JAMstack, web performance, cost-effective web development, landing pages, corporate websites, custom web applications',
      ogTitle: 'WebSmith Shop - Modern Web Development with Astro & Vue.js',
      ogDescription: 'Professional web development using modern technologies (Astro, Vue.js) for lightning-fast websites. Free hosting options, 70-100% cost savings vs WordPress. Custom landing pages, corporate sites, and web applications.',
      ogImage: '/src/assets/site-images/hero.png',
      canonical: 'https://websmith-shop.com/'
    }
  },
  { 
    path: '/what-we-do', 
    component: WhatWeDo,
    meta: {
      title: 'Modern Web Development: Astro, Vue.js & Free Hosting - WebSmith Shop',
      description: 'Discover how modern web technologies (Astro, Vue.js) beat WordPress with lightning-fast performance, free hosting (Netlify, Vercel, Cloudflare), and 70-100% cost savings. Seamless scaling from static sites to complex applications.',
      keywords: 'Astro framework, Vue.js development, modern web technologies, WordPress alternative, free hosting, Netlify, Vercel, Cloudflare, static site generation, JAMstack, web performance, cost-effective web development, website migration, WordPress to Astro, modern vs traditional web development',
      ogTitle: 'Modern Web Development: Astro, Vue.js & Free Hosting - WebSmith Shop',
      ogDescription: 'Discover how modern web technologies (Astro, Vue.js) beat WordPress with lightning-fast performance, free hosting (Netlify, Vercel, Cloudflare), and 70-100% cost savings. Seamless scaling from static sites to complex applications.',
      ogImage: '/src/assets/site-images/hero.png',
      canonical: 'https://websmith-shop.com/what-we-do'
    }
  },
  { 
    path: '/services', 
    component: Services,
    meta: {
      title: 'Website Development & Migration Services - WebSmith Shop',
      description: 'Professional website development services with modern technologies (Astro, Vue.js). Website migration from WordPress/Joomla/Drupal to modern stack. Transparent pricing from $200 to $2500+. Free hosting options available.',
      keywords: 'website development, website migration, WordPress to Astro, Joomla migration, Drupal migration, modern web development, Astro development, Vue.js development, free hosting, Netlify, Vercel, Cloudflare, web design, landing pages, corporate websites, portfolio sites, e-commerce, custom web development, web development pricing, cost-effective web solutions',
      ogTitle: 'Website Development & Migration Services - WebSmith Shop',
      ogDescription: 'Professional website development services with modern technologies (Astro, Vue.js). Website migration from WordPress/Joomla/Drupal to modern stack. Transparent pricing from $200 to $2500+. Free hosting options available.',
      ogImage: '/src/assets/site-images/hero.png',
      canonical: 'https://websmith-shop.com/services'
    }
  },
  //{ path: '/portfolio', component: Portfolio },
  { 
    path: '/contact', 
    component: Contact,
    meta: {
      title: 'Contact WebSmith Shop - Modern Web Development & Migration Services',
      description: 'Ready to modernize your web presence? Contact WebSmith Shop for Astro/Vue.js development, WordPress migration, and cost-effective web solutions. Free consultation and transparent pricing.',
      keywords: 'contact web developer, website migration consultation, Astro development quote, Vue.js development, WordPress to Astro migration, modern web development contact, free web development consultation, website redesign quote',
      ogTitle: 'Contact WebSmith Shop - Modern Web Development & Migration Services',
      ogDescription: 'Ready to modernize your web presence? Contact WebSmith Shop for Astro/Vue.js development, WordPress migration, and cost-effective web solutions. Free consultation and transparent pricing.',
      ogImage: '/src/assets/site-images/hero.png',
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
      ogImage: '/src/assets/site-images/hero.png',
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
      ogImage: '/src/assets/site-images/hero.png',
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
      ogImage: '/src/assets/site-images/hero.png',
      canonical: 'https://websmith-shop.com/cookies'
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
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