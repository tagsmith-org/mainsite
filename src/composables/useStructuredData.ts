export function useStructuredData() {
  function addStructuredData(data: object) {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
    existingScripts.forEach(script => script.remove())
    
    // Add new structured data
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }
  
  function addOrganizationSchema() {
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "WebSmith Shop",
      "url": "https://websmith-shop.com",
      "logo": "https://websmith-shop.com/src/assets/logos/i1.svg",
      "description": "WebSmith Shop delivers handcrafted landing pages, showcase sites, and microsites with clean code and lightning-fast performance.",
      "sameAs": [
        "https://github.com/websmith-shop"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "url": "https://websmith-shop.com/contact"
      },
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "55.7558",
          "longitude": "37.6176"
        },
        "geoRadius": "10000"
      }
    }
    
    addStructuredData(organizationData)
  }
  
  function addWebSiteSchema() {
    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "WebSmith Shop",
      "url": "https://websmith-shop.com",
      "description": "Professional web development services for custom websites, landing pages, and microsites.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://websmith-shop.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    
    addStructuredData(websiteData)
  }
  
  function addServiceSchema() {
    const serviceData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Website Development Services",
      "provider": {
        "@type": "Organization",
        "name": "WebSmith Shop"
      },
      "description": "Professional website development services including landing pages, corporate sites, portfolios, e-commerce, and custom solutions.",
      "areaServed": "Worldwide",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Website Development Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Landing Page Development",
              "description": "Single-page website focused on one service/product or event"
            },
            "price": "200",
            "priceCurrency": "USD"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corporate Website Development",
              "description": "3–5 pages: home, services/products, about, contacts, reviews"
            },
            "price": "600",
            "priceCurrency": "USD"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "E-commerce Storefront",
              "description": "Basic e-commerce package with catalog and online payment"
            },
            "price": "1000",
            "priceCurrency": "USD"
          }
        ]
      }
    }
    
    addStructuredData(serviceData)
  }
  
  return {
    addStructuredData,
    addOrganizationSchema,
    addWebSiteSchema,
    addServiceSchema
  }
}