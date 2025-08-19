import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Services from '../views/Services.vue'
import Portfolio from '../views/Portfolio.vue'
import Contact from '../views/Contact.vue'

const routes = [
  { 
    path: '/', 
    component: Home,
    meta: {
      title: 'WebSmith Shop - Custom Microsites Built Fast',
      description: 'WebSmith Shop delivers handcrafted landing pages, showcase sites, and microsites with clean code and lightning-fast performance.',
      keywords: 'web development, landing pages, microsites, Vue.js, custom websites, fast websites, responsive design',
      ogTitle: 'WebSmith Shop - Custom Microsites Built Fast',
      ogDescription: 'WebSmith Shop delivers handcrafted landing pages, showcase sites, and microsites with clean code and lightning-fast performance.',
      ogImage: '/src/assets/site-images/hero.png',
      canonical: 'https://websmith-shop.com/'
    }
  },
  { 
    path: '/services', 
    component: Services,
    meta: {
      title: 'Website Development Services & Pricing - WebSmith Shop',
      description: 'Professional website development services including landing pages, corporate sites, portfolios, e-commerce, and custom solutions. Transparent pricing from $200 to $2500+.',
      keywords: 'website development, web design, landing pages, corporate websites, portfolio sites, e-commerce, custom web development, web development pricing',
      ogTitle: 'Website Development Services & Pricing - WebSmith Shop',
      ogDescription: 'Professional website development services including landing pages, corporate sites, portfolios, e-commerce, and custom solutions. Transparent pricing from $200 to $2500+.',
      ogImage: '/src/assets/site-images/hero.png',
      canonical: 'https://websmith-shop.com/services'
    }
  },
  //{ path: '/portfolio', component: Portfolio },
  { 
    path: '/contact', 
    component: Contact,
    meta: {
      title: 'Contact WebSmith Shop - Get Your Custom Website',
      description: 'Ready to start your website project? Contact WebSmith Shop for professional web development services. Fast, reliable, and transparent pricing.',
      keywords: 'contact web developer, website development contact, web design consultation, custom website quote',
      ogTitle: 'Contact WebSmith Shop - Get Your Custom Website',
      ogDescription: 'Ready to start your website project? Contact WebSmith Shop for professional web development services. Fast, reliable, and transparent pricing.',
      ogImage: '/src/assets/site-images/hero.png',
      canonical: 'https://websmith-shop.com/contact'
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global navigation guard to update meta tags
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