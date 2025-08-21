<template>
    <div class="w-full min-h-screen bg-neutral-900 text-white">
        <!-- 1. Главный заголовок + оффер -->
        <header class="relative py-16 border-b border-neutral-800 overflow-hidden">
            <div class="absolute inset-0 w-full h-full">
                <img src="../../src/assets/site-images/image2.png" alt="Hero background"
                    class="w-full h-full object-cover object-center opacity-100 hero-image-enhanced" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-b from-neutral-900/20 via-neutral-900/10 to-neutral-900/30">
                </div>
            </div>
            <div class="relative max-w-5xl mx-auto px-6 text-center flex flex-col items-center z-10">
                <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg">
                    Modern websites built right, fast, honest, and clean
                </h1>
                <p class="text-lg text-neutral-200 max-w-2xl mx-auto mb-6 drop-shadow">
                    I craft microsites, landing pages, and promo sites using Vue 3 / Nuxt — no templates, no CMS. Just
                    clean code, responsive layouts, and an engineer's precision.
                </p>
                <!-- Кнопка "View Services" удалена -->
            </div>
        </header>

        <!-- 2. Что ты предлагаешь (3 формата сайтов) -->
        <section id="formats" class="py-20 bg-neutral-800">
            <div class="max-w-5xl mx-auto px-6">
                <h2 class="text-2xl font-semibold text-center mb-12 text-amber-400">Site Formats</h2>
                <div class="grid md:grid-cols-3 gap-6">

                    <div class="bg-neutral-900 p-6 rounded-lg shadow hover:shadow-md transition">
                        <h3 class="font-semibold text-lg mb-2 text-white">Landing Page</h3>
                        <p class="text-neutral-300 text-sm">
                            A single-page site designed to present a service or product.
                            Maximum clarity, maximum conversions.
                        </p>
                    </div>

                    <div class="bg-neutral-900 p-6 rounded-lg shadow hover:shadow-md transition">
                        <h3 class="font-semibold text-lg mb-2 text-white">Business Card Site</h3>
                        <p class="text-neutral-300 text-sm">
                            A compact site for a professional or business.
                            Everything about you and your services — clear and simple.
                        </p>
                    </div>

                    <div class="bg-neutral-900 p-6 rounded-lg shadow hover:shadow-md transition">
                        <h3 class="font-semibold text-lg mb-2 text-white">Microsite</h3>
                        <p class="text-neutral-300 text-sm">
                            An informational site for a product, service, or idea.
                            Clean code, fast loading, modern design.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        <!-- 3. Почему именно ты (блок преимуществ) -->
        <section id="advantages1" class="py-20">
            <div class="max-w-5xl mx-auto px-6">
                <h2 class="text-2xl font-semibold text-center mb-12 text-amber-400">Why Work With Me</h2>
                <div class="grid md:grid-cols-3 gap-6">

                    <div class="bg-neutral-800 p-6 rounded-lg shadow flex flex-col items-center">
                        <span class="text-3xl mb-2">⚡️</span>
                        <h3 class="font-semibold mb-1 text-white">Fast & Reliable</h3>
                        <p class="text-neutral-300 text-sm text-center">
                            I deliver on time — no delays, no excuses. Clear process, steady communication, and zero
                            surprises.
                        </p>
                    </div>

                    <div class="bg-neutral-800 p-6 rounded-lg shadow flex flex-col items-center">
                        <span class="text-3xl mb-2">🛠️</span>
                        <h3 class="font-semibold mb-1 text-white">Engineer's Mindset</h3>
                        <p class="text-neutral-300 text-sm text-center">
                            Clean code, modern stack, built with performance in mind. No templates, no outdated
                            shortcuts — ever.
                        </p>
                    </div>

                    <div class="bg-neutral-800 p-6 rounded-lg shadow flex flex-col items-center">
                        <span class="text-3xl mb-2">💬</span>
                        <h3 class="font-semibold mb-1 text-white">Transparent & Honest</h3>
                        <p class="text-neutral-300 text-sm text-center">
                            Flat pricing, clear terms, and no hidden fees. You'll always know what you're getting — and
                            when.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        <!-- 4. Как происходит работа (пошагово) -->
        <section id="process" class="py-20 bg-neutral-800">
            <div class="max-w-4xl mx-auto px-6">
                <h2 class="text-2xl font-semibold text-center mb-12 text-amber-400">How the Process Works</h2>
                <ol class="space-y-8">

                    <li class="flex items-start">
                        <span
                            class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-amber-500 text-neutral-900 rounded-full mr-4 font-bold">1</span>
                        <div>
                            <h4 class="font-semibold mb-1 text-white">We discuss your project</h4>
                            <p class="text-neutral-300 text-sm">
                                You tell me what you need, I ask the right questions and suggest the best path forward.
                            </p>
                        </div>
                    </li>

                    <li class="flex items-start">
                        <span
                            class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-amber-500 text-neutral-900 rounded-full mr-4 font-bold">2</span>
                        <div>
                            <h4 class="font-semibold mb-1 text-white">Agreement & terms</h4>
                            <p class="text-neutral-300 text-sm">
                                We confirm pricing, timeline, and deliverables — all clearly written down.
                            </p>
                        </div>
                    </li>

                    <li class="flex items-start">
                        <span
                            class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-amber-500 text-neutral-900 rounded-full mr-4 font-bold">3</span>
                        <div>
                            <h4 class="font-semibold mb-1 text-white">Development begins</h4>
                            <p class="text-neutral-300 text-sm">
                                I build the site, share progress updates, and fine-tune based on your feedback.
                            </p>
                        </div>
                    </li>

                    <li class="flex items-start">
                        <span
                            class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-amber-500 text-neutral-900 rounded-full mr-4 font-bold">4</span>
                        <div>
                            <h4 class="font-semibold mb-1 text-white">Launch & support</h4>
                            <p class="text-neutral-300 text-sm">
                                I help with hosting and domain setup, publish the site, and share tips for promotion.
                            </p>
                        </div>
                    </li>

                </ol>
            </div>
        </section>

        <!-- 5. Дополнительные услуги -->
        <section id="services" class="py-20">
            <div class="max-w-4xl mx-auto px-4 text-neutral-300 text-sm">
                <h2 class="text-2xl font-semibold text-center mb-12 text-amber-400">Optional Services & Support</h2>
                <div class="grid md:grid-cols-2 gap-6">

                    <div class="bg-neutral-800 p-6 rounded shadow">
                        <h4 class="text-cyan-400 font-bold mb-2">🚀 Hosting on my server</h4>
                        <p>$15/month — fast and reliable VPS hosting<br>Includes SSL, backups, and uptime monitoring</p>
                    </div>

                    <div class="bg-neutral-800 p-6 rounded shadow">
                        <h4 class="text-green-400 font-bold mb-2">🛠️ Setup on your hosting</h4>
                        <p>From $25 — I'll help you deploy to your server (FTP, cPanel, etc.) and ensure it's working as
                            intended</p>
                    </div>

                    <div class="bg-neutral-800 p-6 rounded shadow">
                        <h4 class="text-red-400 font-bold mb-2"> Full configuration</h4>
                        <p>From $45 — includes domain setup, email forwarding, analytics, cookie notices, etc.</p>
                    </div>

                    <div class="bg-neutral-800 p-6 rounded shadow">
                        <h4 class="text-violet-400 font-bold mb-2"> Delivery options</h4>
                        <p>GitHub repo or ZIP archive<br>Basic README with setup instructions</p>
                    </div>

                </div>
            </div>
        </section>

        <!-- 6. CTA-блок (призыв связаться) -->
        <section id="cta" class="py-16 bg-neutral-900 text-white">
            <div class="max-w-4xl mx-auto px-6 text-center">
                <h2 class="text-2xl font-semibold mb-4 text-amber-400">Ready to talk about your project?</h2>
                <p class="mb-8 text-neutral-300">
                    Get in touch however you prefer — I respond fast and to the point.
                </p>

                <!-- Кнопка для открытия модального окна -->
                <button @click="handleStartProjectClick"
                    class="inline-block bg-amber-500 text-neutral-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition">
                    Start Your Project
                </button>
            </div>
        </section>

        <!-- Модальное окно с формой -->
        <ProjectRequestModal :is-open="isModalOpen" @close="closeModal" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import ProjectRequestModal from '../components/ProjectRequestModal.vue'
import { useProjectModal } from '../composables/useProjectModal'
import { useSEO } from '../composables/useSEO'
import { useGoogleAnalytics } from '../composables/useGoogleAnalytics'

const { isModalOpen, openModal, closeModal } = useProjectModal()

// Initialize Google Analytics
const { trackButtonClick, trackScroll } = useGoogleAnalytics()

// SEO configuration for this page
const { updateMetaTags } = useSEO({
    title: 'WebSmith Shop - Custom Microsites Built Fast',
    description: 'WebSmith Shop delivers handcrafted landing pages, showcase sites, and microsites with clean code and lightning-fast performance. Professional web development services.',
    keywords: 'web development, landing pages, microsites, Vue.js, custom websites, fast websites, responsive design, professional web developer',
    ogTitle: 'WebSmith Shop - Custom Microsites Built Fast',
    ogDescription: 'WebSmith Shop delivers handcrafted landing pages, showcase sites, and microsites with clean code and lightning-fast performance. Professional web development services.',
    ogImage: '/src/assets/site-images/hero.png',
    canonical: 'https://websmith-shop.com/'
})

// Handle start project button click
function handleStartProjectClick() {
    trackButtonClick('start_project_cta')
    openModal()
}

// Track scroll depth
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.round((scrollTop / docHeight) * 100)

    // Track at 25%, 50%, 75%, and 100% scroll depths
    if (scrollPercent >= 25 && scrollPercent < 50) {
        trackScroll(25)
    } else if (scrollPercent >= 50 && scrollPercent < 75) {
        trackScroll(50)
    } else if (scrollPercent >= 75 && scrollPercent < 100) {
        trackScroll(75)
    } else if (scrollPercent >= 100) {
        trackScroll(100)
    }
}

// Update SEO on component mount
onMounted(() => {
    updateMetaTags({
        title: 'WebSmith Shop - Custom Microsites Built Fast',
        description: 'WebSmith Shop delivers handcrafted landing pages, showcase sites, and microsites with clean code and lightning-fast performance. Professional web development services.',
        keywords: 'web development, landing pages, microsites, Vue.js, custom websites, fast websites, responsive design, professional web developer',
        ogTitle: 'WebSmith Shop - Custom Microsites Built Fast',
        ogDescription: 'WebSmith Shop delivers handcrafted landing pages, showcase sites, and microsites with clean code and lightning-fast performance. Professional web development services.',
        ogImage: '/src/assets/site-images/hero.png',
        canonical: 'https://websmith-shop.com/'
    })

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
})

// Clean up scroll listener on component unmount
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
<style scoped>
.hero-image-brightened {
    filter: brightness(1.3) contrast(1.1) saturate(1.1);
}

.hero-image-soft-brightened {
    filter: brightness(1.2) contrast(1.05);
}

.hero-image-enhanced {
    filter: brightness(1.95) contrast(1.1) saturate(5.85);
}
</style>