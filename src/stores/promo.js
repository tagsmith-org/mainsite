import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { promoConfig, isDateInRange } from '../config/promo.js'

export const usePromoStore = defineStore('promo', () => {
  // Promo configuration from external file
  const config = ref(promoConfig)

  // Current active promo - загружаем из localStorage или используем дефолт
  const activePromo = ref(localStorage.getItem('activePromo') || config.value.activePromo)

  // Computed values
  const currentPromo = computed(() => config.value[activePromo.value])
  
  const isPromoActive = computed(() => {
    const promo = currentPromo.value
    // noDiscount всегда неактивен
    if (promo.name === 'No Discount') return false
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

  // Countdown timer
  const countdown = ref({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0
  })

  // Remaining orders
  const remainingOrders = computed(() => {
    const promo = currentPromo.value
    if (promo.maxOrders && promo.ordersTaken) {
      return Math.max(0, promo.maxOrders - promo.ordersTaken)
    }
    return promo.maxOrders || 0
  })

  // Update countdown timer
  function updateCountdown() {
    const promo = currentPromo.value
    if (promo.endDate) {
      const now = new Date()
      const end = new Date(promo.endDate)
      const diff = end.getTime() - now.getTime()

      if (diff > 0) {
        // Calculate months
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44)) // Average days per month
        const remainingDays = diff % (1000 * 60 * 60 * 24 * 30.44)
        
        const days = Math.floor(remainingDays / (1000 * 60 * 60 * 24))
        const hours = Math.floor((remainingDays % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((remainingDays % (1000 * 60 * 60)) / (1000 * 60))

        countdown.value = { months, days, hours, minutes }
      } else {
        countdown.value = { months: 0, days: 0, hours: 0, minutes: 0 }
      }
    }
  }

  // Start countdown timer
  let countdownInterval
  onMounted(() => {
    updateCountdown()
    countdownInterval = setInterval(updateCountdown, 60000) // Update every minute instead of every second
  })

  // Cleanup interval on unmount
  function cleanupCountdown() {
    if (countdownInterval) {
      clearInterval(countdownInterval)
    }
  }

  // Actions
  function setActivePromo(promoName) {
    if (config.value[promoName]) {
      activePromo.value = promoName
      // Сохраняем выбор в localStorage
      localStorage.setItem('activePromo', promoName)
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
      // Не сбрасываем активную promotion при перезагрузке
      // activePromo.value = config.value.activePromo
    })
  }

  function resetToDefault() {
    activePromo.value = config.value.activePromo
    localStorage.setItem('activePromo', config.value.activePromo)
  }



  // PromoManager visibility (only for admin)
  const isAdmin = ref(false)
  
  // Проверяем IP клиента при загрузке
  if (import.meta.env.VITE_PROMO_MANAGER === 'true') {
    if (import.meta.env.DEV) {
      isAdmin.value = true
    } else {
      // Получаем IP клиента через API
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          const clientIP = data.ip
          const adminIPs = import.meta.env.VITE_ADMIN_IPS?.split(',') || []
          isAdmin.value = adminIPs.includes(clientIP)
        })
        .catch(() => {
          isAdmin.value = false
        })
    }
  }
  
  const showPromoManager = computed(() => {
    return import.meta.env.VITE_PROMO_MANAGER === 'true' && isAdmin.value
  })

  return {
    config,
    activePromo,
    currentPromo,
    isPromoActive,
    currentDiscount,
    discountLabel,
    promoDescription,
    countdown,
    remainingOrders,
    setActivePromo,
    calculateDiscountedPrice,
    updatePromoConfig,
    reloadConfig,
    resetToDefault,
    showPromoManager,
    cleanupCountdown
  }
}) 