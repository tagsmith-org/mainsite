import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { promoConfig, isDateInRange } from '../config/promo.js'

export const usePromoStore = defineStore('promo', () => {
  // Promo configuration from external file
  const config = ref(promoConfig)

  // Current active promo
  const activePromo = ref(config.value.activePromo)

  // Computed values
  const currentPromo = computed(() => config.value[activePromo.value])
  
  const isPromoActive = computed(() => {
    const promo = currentPromo.value
    if (promo.enabled === false) return false
    if (promo.startDate && promo.endDate) {
      return isDateInRange(promo.startDate, promo.endDate)
    }
    return true
  })

  const currentDiscount = computed(() => {
    return isPromoActive.value ? currentPromo.value.discount : 0
  })

  const discountLabel = computed(() => {
    return isPromoActive.value ? currentPromo.value.label : ''
  })

  const promoDescription = computed(() => {
    return isPromoActive.value ? currentPromo.value.description : ''
  })

  // Actions
  function setActivePromo(promoName) {
    if (config.value[promoName]) {
      activePromo.value = promoName
    }
  }

  function calculateDiscountedPrice(originalPrice) {
    return Math.round(originalPrice * (1 - currentDiscount.value))
  }

  function updatePromoConfig(newConfig) {
    config.value = { ...config.value, ...newConfig }
  }

  function reloadConfig() {
    import('../config/promo.js').then(module => {
      config.value = module.promoConfig
      activePromo.value = config.value.activePromo
    })
  }

  // PromoManager visibility (only if VITE_PROMO_MANAGER === 'true')
  const showPromoManager = computed(() => import.meta.env.VITE_PROMO_MANAGER === 'true')

  return {
    config,
    activePromo,
    currentPromo,
    isPromoActive,
    currentDiscount,
    discountLabel,
    promoDescription,
    setActivePromo,
    calculateDiscountedPrice,
    updatePromoConfig,
    reloadConfig,
    showPromoManager
  }
}) 