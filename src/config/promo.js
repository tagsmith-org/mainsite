// Promo Configuration
// Edit this file to change promo settings without server restart

export const promoConfig = {
  // Активная акция (измените на нужную)
  activePromo: 'firstOrdersPromo',

  // Акция, управляемая через .env (оставлена для справки)
  envPromo: {
    name: 'Env Promo',
    discount: (Number(import.meta.env.VITE_PROMO_DISCOUNT) || 0) / 100, // Конвертируем проценты в десятичную дробь
    startDate: import.meta.env.VITE_PROMO_START,
    endDate: import.meta.env.VITE_PROMO_END,
    label: import.meta.env.VITE_PROMO_LABEL,
    description: import.meta.env.VITE_PROMO_DESCRIPTION,
    enabled: import.meta.env.VITE_PROMO_ENABLED === 'true'
  },

  // Без скидки
  noDiscount: {
    name: 'No Discount',
    discount: 0,
    label: 'No discount',
    description: 'No discount applied'
  },

  // Примеры других акций (можно оставить для справки)
  summerPromo: {
    name: 'Summer Sale',
    discount: 0.1,
    startDate: '2025-08-01',
    endDate: '2025-09-01',
    label: '10% until September 1',
    description: 'Get 10% off on all website orders until September 1st!'
  },
  firstOrdersPromo: {
    name: 'First Orders',
    discount: 0.5,
    maxOrders: 3,
    label: '50% for first 3 orders',
    description: 'First 3 orders get 50% discount!'
  },
  defaultPromo: {
    name: 'Default',
    discount: 0.1,
    label: '10% discount',
    description: 'Standard 10% discount'
  }
}

export function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

export function isDateInRange(startDate, endDate) {
  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)
  return now >= start && now <= end
} 