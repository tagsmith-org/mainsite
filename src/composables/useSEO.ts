import { watch } from 'vue'
import { useRoute } from 'vue-router'

interface SEOConfig {
  title: string
  description: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonical?: string
}

const defaultSEO: SEOConfig = {
  title: 'WebSmith Shop - Custom Microsites Built Fast',
  description: 'WebSmith Shop delivers handcrafted landing pages, showcase sites, and microsites with clean code and lightning-fast performance.',
  keywords: 'web development, landing pages, microsites, Vue.js, custom websites, fast websites',
  ogTitle: 'WebSmith Shop - Custom Microsites Built Fast',
  ogDescription: 'WebSmith Shop delivers handcrafted landing pages, showcase sites, and microsites with clean code and lightning-fast performance.',
  ogImage: '/src/assets/site-images/hero.png',
  ogUrl: 'https://websmith-shop.com',
  twitterCard: 'summary_large_image',
  twitterTitle: 'WebSmith Shop - Custom Microsites Built Fast',
  twitterDescription: 'WebSmith Shop delivers handcrafted landing pages, showcase sites, and microsites with clean code and lightning-fast performance.',
  twitterImage: '/src/assets/site-images/hero.png',
  canonical: 'https://websmith-shop.com'
}

export function useSEO(config?: Partial<SEOConfig>) {
  const route = useRoute()
  
  function updateMetaTags(seoConfig: SEOConfig) {
    const mergedConfig = { ...defaultSEO, ...seoConfig }
    
    // Update document title
    document.title = mergedConfig.title
    
    // Update meta description
    updateMetaTag('description', mergedConfig.description)
    
    // Update keywords
    if (mergedConfig.keywords) {
      updateMetaTag('keywords', mergedConfig.keywords)
    }
    
    // Update Open Graph tags
    updateMetaTag('og:title', mergedConfig.ogTitle || mergedConfig.title)
    updateMetaTag('og:description', mergedConfig.ogDescription || mergedConfig.description)
    updateMetaTag('og:image', mergedConfig.ogImage || defaultSEO.ogImage!)
    updateMetaTag('og:url', mergedConfig.ogUrl || `${defaultSEO.ogUrl}${route.path}`)
    updateMetaTag('og:type', 'website')
    updateMetaTag('og:site_name', 'WebSmith Shop')
    
    // Update Twitter Card tags
    updateMetaTag('twitter:card', mergedConfig.twitterCard || defaultSEO.twitterCard!)
    updateMetaTag('twitter:title', mergedConfig.twitterTitle || mergedConfig.title)
    updateMetaTag('twitter:description', mergedConfig.twitterDescription || mergedConfig.description)
    updateMetaTag('twitter:image', mergedConfig.twitterImage || defaultSEO.twitterImage!)
    
    // Update canonical URL
    if (mergedConfig.canonical) {
      updateCanonicalLink(mergedConfig.canonical)
    } else {
      updateCanonicalLink(`${defaultSEO.canonical}${route.path}`)
    }
  }
  
  function updateMetaTag(name: string, content: string) {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = name
      document.head.appendChild(meta)
    }
    meta.content = content
  }
  
  function updateCanonicalLink(url: string) {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }
  
  // Watch for route changes and update SEO
  watch(() => route.path, () => {
    if (config) {
      updateMetaTags(config)
    }
  }, { immediate: true })
  
  return {
    updateMetaTags
  }
}