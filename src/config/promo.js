// Promo Configuration
// Edit this file to change promo settings without server restart

export const promoConfig = {
  // Active promo (change to the one you need)
  activePromo: 'firstOrdersPromo',

  // Promo controlled via .env (left for reference)
  envPromo: {
    name: 'Env Promo',
    discount: (Number(import.meta.env.VITE_PROMO_DISCOUNT) || 0) / 100, // Convert percentages to decimal
    startDate: import.meta.env.VITE_PROMO_START,
    endDate: import.meta.env.VITE_PROMO_END,
    label: import.meta.env.VITE_PROMO_LABEL,
    description: import.meta.env.VITE_PROMO_DESCRIPTION,
    enabled: import.meta.env.VITE_PROMO_ENABLED === 'true'
  },

  // No discount
  noDiscount: {
    name: 'No Discount',
    discount: 0,
    label: 'No discount',
    description: 'No discount applied'
  },

  // Examples of other promos (can be left for reference)
  summerPromo: {
    name: 'Summer Sale',
    discount: 0.1,
    startDate: '2025-08-01',
    endDate: '2025-09-01',
    label: '10% until September 1',
    description: 'Get 10% off on all website orders until September 1st!'
  },
  firstOrdersPromo: {
    name: 'Launch Special',
    discount: 0.5,
    maxOrders: 5,
    ordersTaken: 2, // Already taken 2 orders, 3 remaining
    startDate: '2025-07-15T00:00:00.000Z', // Start of promo (July 15, 2025)
    endDate: '2025-10-15T23:59:59.999Z', // End of promo (October 15, 2025)
    label: '50% OFF - Launch Special',
    description: 'Launch Special: 50% discount for first 5 orders!'
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