<template>
    <section class="py-20 text-white bg-neutral-900 min-h-screen flex items-center justify-center">
        <div class="max-w-2xl w-full px-6">
            <h2 class="text-3xl font-bold mb-6 text-center text-amber-400">Site order description</h2>

            <!-- Contact and Project Info -->
            <div class="mb-8 space-y-4">
                <!-- Contact Information -->
                <div class="bg-neutral-800 p-4 rounded-lg">
                    <h3 class="text-lg font-semibold text-amber-400 mb-3">📞 Contact Information</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-neutral-400 mb-1">Your Name</label>
                            <input v-model="form.clientName" type="text" placeholder="John Doe"
                                class="w-full px-3 py-2 bg-neutral-700 text-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-neutral-400 mb-1">Your Email</label>
                            <input v-model="form.clientEmail" type="email" placeholder="you@example.com"
                                class="w-full px-3 py-2 bg-neutral-700 text-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
                        </div>
                    </div>
                </div>

                <!-- Project description -->
                <div>
                    <label class="block font-semibold mb-2">📝 Project description</label>
                    <textarea v-model="form.description" rows="4"
                        placeholder="Describe your project, business, or any additional information..."
                        class="w-full px-4 py-2 bg-neutral-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea>
                </div>
            </div>

            <form class="space-y-8" @submit.prevent>
                <!-- 1. Site type -->
                <div>
                    <label class="block font-semibold mb-2">1. Site type</label>
                    <div class="space-y-2">
                        <label v-for="option in siteTypeOptions" :key="option.value" class="flex items-center gap-2">
                            <input type="radio" v-model="form.siteType" :value="option.value"
                                class="accent-amber-500" />
                            <span>{{ option.label }}</span>
                            <span class="ml-2 text-xs text-neutral-400">+${{ option.price }}</span>
                        </label>
                    </div>
                </div>

                <!-- 2. Pages count -->
                <div>
                    <label class="block font-semibold mb-2">2. Number of pages</label>
                    <div class="space-y-2">
                        <label v-for="option in pagesOptions" :key="option.value" class="flex items-center gap-2">
                            <input type="radio" v-model="form.pages" :value="option.value" class="accent-amber-500" />
                            <span>{{ option.label }}</span>
                            <span class="ml-2 text-xs text-neutral-400" v-if="option.price > 0">+${{ option.price
                                }}</span>
                        </label>
                    </div>
                </div>

                <!-- 3. Design -->
                <div>
                    <label class="block font-semibold mb-2">3. Design</label>
                    <div class="space-y-2">
                        <label v-for="option in designOptions" :key="option.value" class="flex items-center gap-2">
                            <input type="radio" v-model="form.design" :value="option.value" class="accent-amber-500" />
                            <span>{{ option.label }}</span>
                            <span class="ml-2 text-xs text-neutral-400" v-if="option.price > 0">+${{ option.price
                                }}</span>
                        </label>
                    </div>
                </div>

                <!-- 4. Features -->
                <div>
                    <label class="block font-semibold mb-2">4. Features</label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <label v-for="option in featuresOptions" :key="option.value" class="flex items-center gap-2">
                            <input type="checkbox" v-model="form.features" :value="option.value"
                                class="accent-amber-500" />
                            <span>{{ option.label }}</span>
                            <span class="ml-2 text-xs text-neutral-400">+${{ option.price }}</span>
                        </label>
                    </div>
                </div>

                <!-- 5. Integrations -->
                <div>
                    <label class="block font-semibold mb-2">5. Integrations</label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <label v-for="option in integrationsOptions" :key="option.value"
                            class="flex items-center gap-2">
                            <input type="checkbox" v-model="form.integrations" :value="option.value"
                                class="accent-amber-500" />
                            <span>{{ option.label }}</span>
                            <span class="ml-2 text-xs text-neutral-400">+${{ option.price }}</span>
                        </label>
                    </div>
                </div>

                <!-- 6. Content -->
                <div>
                    <label class="block font-semibold mb-2">6. Content</label>
                    <div class="space-y-2">
                        <label v-for="option in contentOptions" :key="option.value" class="flex items-center gap-2">
                            <input type="radio" v-model="form.content" :value="option.value" class="accent-amber-500" />
                            <span>{{ option.label }}</span>
                            <span class="ml-2 text-xs text-neutral-400" v-if="option.price > 0">+${{ option.price
                                }}</span>
                        </label>
                    </div>
                </div>

                <!-- 7. Deadline -->
                <div>
                    <label class="block font-semibold mb-2">7. Deadline</label>
                    <div class="space-y-2">
                        <label v-for="option in deadlineOptions" :key="option.value" class="flex items-center gap-2">
                            <input type="radio" v-model="form.deadline" :value="option.value"
                                class="accent-amber-500" />
                            <span>{{ option.label }}</span>
                            <span class="ml-2 text-xs text-neutral-400" v-if="option.price > 0">+${{ option.price
                                }}</span>
                        </label>
                    </div>
                </div>

                <!-- 8. Cooperation variant -->
                <div>
                    <label class="block font-semibold mb-2">8. Cooperation variant</label>
                    <div class="space-y-2">
                        <label v-for="option in cooperationOptions" :key="option.value" class="flex items-center gap-2">
                            <input type="radio" v-model="form.cooperation" :value="option.value"
                                class="accent-amber-500" />
                            <span>{{ option.label }}</span>
                            <span class="ml-2 text-xs text-neutral-400">{{ option.comment }}</span>
                            <span class="ml-2 text-xs text-amber-400" v-if="option.price > 0">+${{ option.price
                                }}</span>
                            <span class="ml-2 text-xs text-amber-400" v-if="option.monthly > 0">+${{ option.monthly
                                }}/mo</span>
                        </label>
                    </div>
                </div>

                <!-- 9. Extra services -->
                <div>
                    <label class="block font-semibold mb-2">9. Extra services</label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <label v-for="option in extraOptions" :key="option.value" class="flex items-center gap-2">
                            <input type="checkbox" v-model="form.extra" :value="option.value"
                                class="accent-amber-500" />
                            <span>{{ option.label }}</span>
                            <span v-if="option.price > 0" class="ml-2 text-xs text-neutral-400">+${{ option.price
                            }}</span>
                            <span v-if="option.monthly > 0" class="ml-2 text-xs text-neutral-400">+${{ option.monthly
                            }}/mo.</span>
                        </label>
                    </div>
                </div>



                <!-- Result -->
                <div class="mt-8 p-4 rounded-lg bg-neutral-800 text-lg font-semibold flex flex-col gap-2">
                    <span>
                        💬 Minimal development cost:
                        <span v-if="isPromoEnabled" style="text-decoration: line-through;" class="text-neutral-400">${{
                            totalOneTime }}</span>
                        <span :class="isPromoEnabled ? 'ml-2 text-amber-400' : 'text-amber-400'">${{
                            discountedTotal }}</span>
                        <span v-if="isPromoEnabled" class="ml-2 text-green-400 text-sm">({{ promoLabel }})</span>
                    </span>
                    <span v-if="totalMonthly > 0">
                        ☁️ + Hosting & support: <span class="text-amber-400">${{ totalMonthly }}/mo</span>
                    </span>
                </div>


                <button type="submit" @click.prevent="submitOrder"
                    class="w-full bg-amber-500 text-neutral-900 font-bold py-2 rounded hover:bg-amber-600 transition mt-4">
                    Send request
                </button>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { generateOrderReport, sendOrderReport } from '../utils/orderReport.js'
import { createOrder } from '../utils/sqliteStorage.js'
import { sendOrderEmails } from '../utils/emailService.js'

// Option interfaces
interface Option {
    value: string
    label: string
    price: number
    monthly?: number
    comment?: string
}

// All options
const siteTypeOptions: Option[] = [
    { value: 'landing', label: 'Landing page', price: 400 },
    { value: 'catalog', label: 'Catalog/menu', price: 700 },
    { value: 'shop', label: 'E-commerce', price: 1500 },
    { value: 'portfolio', label: 'Portfolio', price: 600 },
    { value: 'company', label: 'Company/blog', price: 900 },
]

const pagesOptions: Option[] = [
    { value: '1', label: '1', price: 0 },
    { value: '2-3', label: '2–3', price: 100 },
    { value: '4-6', label: '4–6', price: 250 },
    { value: '7+', label: '7+', price: 500 },
]

const designOptions: Option[] = [
    { value: 'template', label: 'Template', price: 0 },
    { value: 'custom', label: 'Custom design', price: 300 },
    { value: 'figma', label: 'Your mockup (Figma, PDF)', price: 200 },
]

const featuresOptions: Option[] = [
    { value: 'gallery', label: 'Gallery/portfolio', price: 100 },
    { value: 'cart', label: 'Cart/orders', price: 300 },
    { value: 'payment', label: 'Online payment', price: 200 },
    { value: 'feedback', label: 'Feedback form', price: 50 },
    { value: 'map', label: 'Map/location', price: 50 },
    { value: 'blog', label: 'Blog/articles', price: 150 },
    { value: 'multilang', label: 'Multilanguage', price: 150 },
]

const integrationsOptions: Option[] = [
    { value: 'telegram', label: 'Telegram/Email notifications', price: 100 },
    { value: 'crm', label: 'CRM (AmoCRM, Bitrix24)', price: 250 },
    { value: 'analytics', label: 'Analytics (GA, Meta Pixel)', price: 50 },
]

const contentOptions: Option[] = [
    { value: 'ready', label: 'All ready', price: 0 },
    { value: 'partial', label: 'Partially', price: 100 },
    { value: 'need', label: 'Need help', price: 250 },
]

const deadlineOptions: Option[] = [
    { value: 'no-rush', label: 'No rush', price: 0 },
    { value: '2-weeks', label: 'Within 2 weeks', price: 150 },
    { value: 'urgent', label: 'Urgent (less than 7 days)', price: 300 },
]

const cooperationOptions: Option[] = [
    {
        value: 'source',
        label: 'Source code + build',
        price: 0,
        monthly: 0,
        comment: 'No support, no SEO, all responsibility on client',
    },
    {
        value: 'hosting',
        label: 'Hosting + support',
        price: 250, // стартовая сумма (можно сделать диапазон)
        monthly: 30,
        comment: 'SEO, changes on request, technical control',
    },
]

const extraOptions: Option[] = [
    { value: 'domain', label: 'Domain registration/setup', price: 50 },
    { value: 'seo', label: 'SEO optimization (basic, internal)', price: 200 },
    { value: 'promotion', label: 'Promotion (ads, social, Google Business)', price: 100 }, // или 0, если бесплатно
    { value: 'support', label: 'Support & updates (subscription)', price: 0, monthly: 30 },
]

const route = useRoute()

// Form state with localStorage persistence
const form = ref({
    description: '', // Project description
    clientName: '', // Client name
    clientEmail: '', // Client email
    contact: '', // Primary contact (email or phone)
    siteType: '',
    pages: '',
    design: '',
    features: [] as string[],
    integrations: [] as string[],
    content: '',
    deadline: '',
    cooperation: '',
    extra: [] as string[],
})

// Load form data from localStorage and route query on mount
onMounted(() => {
    // Load from localStorage
    const saved = localStorage.getItem('siteOrderForm')
    if (saved) {
        try {
            const parsed = JSON.parse(saved)
            form.value = { ...form.value, ...parsed }
        } catch (e) {
            console.warn('Failed to parse saved form data:', e)
        }
    }

    // Load data from route query (overrides localStorage)
    if (route.query.description) {
        form.value.description = route.query.description as string
    }
    if (route.query.contact) {
        form.value.contact = route.query.contact as string
    }
    if (route.query.clientName) {
        form.value.clientName = route.query.clientName as string
    }
    if (route.query.clientEmail) {
        form.value.clientEmail = route.query.clientEmail as string
    }
})

// Save form data to localStorage on any change
watch(form, (newForm) => {
    localStorage.setItem('siteOrderForm', JSON.stringify(newForm))
}, { deep: true })

// Price calculation
const totalOneTime = computed(() => {
    let sum = 0
    // Main questions
    sum += siteTypeOptions.find(o => o.value === form.value.siteType)?.price || 0
    sum += pagesOptions.find(o => o.value === form.value.pages)?.price || 0
    sum += designOptions.find(o => o.value === form.value.design)?.price || 0
    sum += contentOptions.find(o => o.value === form.value.content)?.price || 0
    sum += deadlineOptions.find(o => o.value === form.value.deadline)?.price || 0
    sum += cooperationOptions.find(o => o.value === form.value.cooperation)?.price || 0
    // Features
    for (const f of form.value.features) {
        sum += featuresOptions.find(o => o.value === f)?.price || 0
    }
    // Integrations
    for (const i of form.value.integrations) {
        sum += integrationsOptions.find(o => o.value === i)?.price || 0
    }
    // Extra (one-time)
    for (const e of form.value.extra) {
        const opt = extraOptions.find(o => o.value === e)
        if (opt && !opt.monthly) sum += opt.price
    }
    return sum
})

const totalMonthly = computed(() => {
    let sum = 0
    // Cooperation monthly
    sum += cooperationOptions.find(o => o.value === form.value.cooperation)?.monthly || 0
    // Extra monthly
    for (const e of form.value.extra) {
        const opt = extraOptions.find(o => o.value === e)
        if (opt?.monthly) sum += opt.monthly
    }
    return sum
})

// Прямое использование переменных окружения для скидки
const promoDiscount = computed(() => Number(import.meta.env.VITE_PROMO_DISCOUNT) || 0)
const isPromoEnabled = computed(() => import.meta.env.VITE_PROMO_ENABLED === 'true')
const promoLabel = computed(() => import.meta.env.VITE_PROMO_LABEL || 'Special Offer!')

const discountedTotal = computed(() => {
    return isPromoEnabled.value ? Math.round(totalOneTime.value * (1 - promoDiscount.value / 100)) : totalOneTime.value
})

// Debug info
const debugInfo = computed(() => {
    return {
        discount: promoDiscount.value,
        totalOneTime: totalOneTime.value,
        discountedTotal: discountedTotal.value,
        isPromoEnabled: isPromoEnabled.value,
        promoLabel: promoLabel.value
    }
})

// Функция отправки заказа
async function submitOrder() {
    // Собираем все данные заказа
    const orderData = {
        // Контактная информация
        contact: form.value.clientEmail || form.value.contact,
        clientName: form.value.clientName,
        clientEmail: form.value.clientEmail,
        description: form.value.description,

        // Выбранные опции
        siteType: siteTypeOptions.find(o => o.value === form.value.siteType)?.label || '',
        pages: pagesOptions.find(o => o.value === form.value.pages)?.label || '',
        design: designOptions.find(o => o.value === form.value.design)?.label || '',
        features: form.value.features.map(f => featuresOptions.find(o => o.value === f)?.label).filter(Boolean),
        integrations: form.value.integrations.map(i => integrationsOptions.find(o => o.value === i)?.label).filter(Boolean),
        content: contentOptions.find(o => o.value === form.value.content)?.label || '',
        deadline: deadlineOptions.find(o => o.value === form.value.deadline)?.label || '',
        cooperation: cooperationOptions.find(o => o.value === form.value.cooperation)?.label || '',
        extra: form.value.extra.map(e => extraOptions.find(o => o.value === e)?.label).filter(Boolean),

        // Цены
        originalPrice: totalOneTime.value,
        discountedPrice: discountedTotal.value,
        monthlyPrice: totalMonthly.value,
        discount: promoDiscount.value,
        isPromoActive: isPromoEnabled.value,

        // Метаданные
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    }

    // Генерируем отчет
    const report = generateOrderReport(orderData)

    // Отправляем отчет по email (вам и клиенту)
    const emailData = sendOrderReport(orderData, report)

    // Сохраняем в SQLite базу данных
    try {
        const result = await createOrder(orderData)
        console.log('✅ Order saved to database:', result.id)

        // Отправляем email уведомления
        await sendOrderEmails({ ...orderData, id: result.id })

    } catch (error) {
        console.error('❌ Failed to save to database:', error)
        // Fallback: сохраняем в localStorage
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
        savedOrders.unshift(orderData)
        localStorage.setItem('orders', JSON.stringify(savedOrders))
        console.log('📦 Order saved to localStorage as fallback')
    }

    // Показываем уведомление пользователю
    alert('Thank you! Your order has been submitted. We will contact you soon.')

    // Выводим отчет в консоль для проверки
    console.log('=== ORDER REPORT ===')
    console.log(report)
    console.log('=== EMAIL DATA ===')
    console.log(emailData)

    // Очищаем форму
    form.value = {
        description: '',
        clientName: '',
        clientEmail: '',
        contact: '',
        siteType: '',
        pages: '',
        design: '',
        features: [],
        integrations: [],
        content: '',
        deadline: '',
        cooperation: '',
        extra: [],
    }

    // Очищаем localStorage
    localStorage.removeItem('siteOrderForm')
}
</script>