<template>
    <!-- Cards: Development Only / Development + Maintenance -->
    <div class="grid gap-6 md:grid-cols-2">
        <!-- Development Only -->
        <div class="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 class="text-xl font-semibold text-amber-400">Development Only</h3>
            <p class="mt-1 text-sm text-gray-600">Source code and instructions — on your side.</p>
            <div class="mt-4 space-y-2 text-sm">
                <div class="flex items-start gap-2">
                    <span class="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span>Website development of selected type (Landing, multi-page, portfolio, store, etc.)</span>
                </div>
                <div class="flex items-start gap-2">
                    <span class="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span>Source code: archive or GitHub repository</span>
                </div>
                <div class="flex items-start gap-2">
                    <span class="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span>README with clear deployment steps</span>
                </div>
            </div>
            <div class="mt-6">
                <div class="text-2xl font-bold">from $200 to $2500+</div>
                <div class="text-xs text-gray-500">depending on type and complexity</div>
            </div>
            <div class="mt-6">
                <button @click="openModal"
                    class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                    Submit Request
                </button>
            </div>
        </div>

        <!-- Development + Maintenance -->
        <div class="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 class="text-xl font-semibold text-amber-400">Development + Maintenance</h3>
            <p class="mt-1 text-sm text-gray-600">I host and maintain your website.</p>
            <div class="mt-4 space-y-2 text-sm">
                <div class="flex items-start gap-2">
                    <span class="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                    <span>Everything from "Development Only" plan</span>
                </div>
                <div class="flex items-start gap-2">
                    <span class="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                    <span>Hosting on Hetzner VPS</span>
                </div>
                <div class="flex items-start gap-2">
                    <span class="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                    <span>Technical support: updates, monitoring, minor fixes</span>
                </div>
            </div>
            <div class="mt-6">
                <div class="text-2xl font-bold">+$15–30/mo</div>
                <div class="text-xs text-gray-500">additional to development cost</div>
            </div>
            <div class="mt-6">
                <button @click="openModal"
                    class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    Connect Maintenance
                </button>
            </div>
            <div class="mt-4 text-xs text-gray-500">
                Domain is paid by client separately (I can help register if needed).
            </div>
        </div>
    </div>

    <!-- Pricing Section -->
    <section class="mx-auto max-w-6xl px-4 py-12">
        <header class="mb-8 text-center">
            <h2 class="text-2xl font-semibold text-center text-amber-400">Website Development Pricing</h2>
            <p class="text-neutral-400">Transparent: code is yours. Hosting and support — optional.</p>
        </header>

        <!-- Таблица типов сайтов (десктоп) -->
        <div class="hidden md:block mb-12 overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-800">
            <table class="min-w-full divide-y divide-neutral-700">
                <thead class="bg-neutral-900">
                    <tr>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-300">Website Type</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-300">Description</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-300">Best For</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-300">Development Price</th>
                        <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-300">Demo</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-neutral-700 bg-neutral-800">
                    <tr v-for="siteType in siteTypes" :key="siteType.id">
                        <td class="px-4 py-3 text-sm font-medium text-white">{{ siteType.name }}</td>
                        <td class="px-4 py-3 text-sm text-neutral-300">{{ siteType.description }}</td>
                        <td class="px-4 py-3 text-sm text-neutral-400">{{ siteType.bestFor }}</td>
                        <td class="px-4 py-3 text-sm text-neutral-300">{{ siteType.devPrice }}</td>
                        <td class="px-4 py-3 text-sm">
                            <button v-if="siteType.demoUrl !== '#'" @click="openDemo(siteType.demoUrl)"
                                class="text-amber-400 hover:underline bg-transparent border-none cursor-pointer">demo</button>
                            <span v-else class="text-neutral-500">—</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Карточки для мобильных устройств -->
        <div class="md:hidden mb-12 space-y-4">
            <div v-for="siteType in siteTypes" :key="siteType.id"
                class="bg-neutral-800 border border-neutral-700 rounded-lg p-4 shadow-sm">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold text-white">{{ siteType.name }}</h3>
                    <button v-if="siteType.demoUrl !== '#'" @click="openDemo(siteType.demoUrl)"
                        class="text-amber-400 text-sm hover:underline bg-transparent border-none cursor-pointer">
                        demo
                    </button>
                    <span v-else class="text-neutral-500 text-sm">—</span>
                </div>
                <div class="space-y-2 text-sm text-neutral-300">
                    <div class="mb-2">
                        <p class="text-xs text-neutral-400">{{ siteType.description }}</p>
                    </div>
                    <div class="flex justify-between">
                        <span>Development:</span>
                        <span class="font-medium text-white">{{ siteType.devPrice }}</span>
                    </div>
                    <div class="pt-2 border-t border-neutral-700">
                        <p class="text-xs text-neutral-400">{{ siteType.bestFor }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Notices -->
        <div class="mt-6 space-y-2 text-sm text-neutral-400">
            <p>All prices are approximate and depend on design and integrations. Final estimate is fixed before work
                begins.</p>
            <p>Domain <span class="font-medium">not included</span> in cost: client pays separately (I can help register
                if needed).</p>
        </div>
    </section>

    <section id="tech-services" class="py-0 bg-neutral-900 text-white">
        <div class="max-w-5xl mx-auto px-6">
            <h2 class="text-2xl font-semibold text-center mb-12 text-amber-400">Technical Services</h2>
            <div class="grid md:grid-cols-2 gap-6 text-neutral-300 text-sm">
                <div class="bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition">
                    <h3 class="text-lg font-bold text-white mb-2">🖥️ Hosting on My Server</h3>
                    <p>Optional monthly hosting on my secure VPS. Fast, optimized, and maintained.</p>
                </div>
                <div class="bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition">
                    <h3 class="text-lg font-bold text-white mb-2">️ Installation Help</h3>
                    <p>I can assist with installing the site on your own hosting, or do it fully for you.</p>
                </div>
                <div class="bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition">
                    <h3 class="text-lg font-bold text-white mb-2"> Domain & DNS Setup</h3>
                    <p>I'll help configure your domain, DNS records, and optional email redirection.</p>
                </div>
                <div class="bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition">
                    <h3 class="text-lg font-bold text-white mb-2"> Ongoing Support</h3>
                    <p>Need minor edits or fixes later? I'm available for light support as needed.</p>
                </div>
                <div class="bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition">
                    <h3 class="text-lg font-bold text-white mb-2"> GitHub Delivery</h3>
                    <p>Code is delivered via GitHub with clear instructions. You're in full control.</p>
                </div>
                <div class="bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition">
                    <h3 class="text-lg font-bold text-white mb-2"> Tech Consulting</h3>
                    <p>Need feedback on your existing site or hosting setup? I'll review it and offer simple, actionable
                        suggestions.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Модальное окно с формой -->
    <ProjectRequestModal :is-open="isModalOpen" @close="closeModal" />
</template>

<script setup lang="ts">
import ProjectRequestModal from '../components/ProjectRequestModal.vue'
import { useProjectModal } from '../composables/useProjectModal'

const { isModalOpen, openModal, closeModal } = useProjectModal()

// Function to open demo links with proper mobile handling
function openDemo(url: string) {
    // Check if we're on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (isMobile) {
        // On mobile, try to open in new tab first, fallback to current window
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            window.location.href = url
        }
    } else {
        // On desktop, always open in new tab
        window.open(url, '_blank', 'noopener,noreferrer')
    }
}

const siteTypes = [
    {
        id: 'landing',
        name: 'Landing Page',
        description: 'Single-page website focused on one service/product or event. Sales copy, bright design, call-to-action.',
        bestFor: 'Product launches, promotions, events, quick online presence',
        devPrice: '$200–500',
        demoUrl: 'https://demo6.websmith-shop.com'
    },
    {
        id: 'corporate',
        name: 'Corporate Services Website',
        description: '3–5 pages: home, services/products, about, contacts, reviews. More informative than landing.',
        bestFor: 'Service companies, small businesses, brands',
        devPrice: '$600–1200',
        demoUrl: 'https://demo2.websmith-shop.com'
    },
    {
        id: 'portfolio',
        name: 'Portfolio / Personal Page',
        description: 'Showcase of works with project descriptions, photos/videos and contacts.',
        bestFor: 'Designers, photographers, architects, freelancers',
        devPrice: '$300–700',
        demoUrl: 'https://demo5.websmith-shop.com'
    },
    {
        id: 'ecommerce',
        name: 'E-commerce Storefront',
        description: 'Basic e-commerce package with catalog (up to 20 products) and online payment. Admin panel for product management.',
        bestFor: 'Stores with small to medium product range, basic e-commerce',
        devPrice: '$1000–2500',
        demoUrl: 'https://demo3.websmith-shop.com'
    },
    {
        id: 'blog',
        name: 'Blog / Content Site',
        description: 'Content management system with admin panel. From simple blog with categories to full news portal with API integration, external sources, and author management.',
        bestFor: 'Writers, journalists, content creators, news agencies, media companies',
        devPrice: '$1000–2500',
        demoUrl: 'https://demo1.websmith-shop.com'
    },
    {
        id: 'event',
        name: 'Event Campaign Site',
        description: 'Minimal page for specific event or offer.',
        bestFor: 'Promotion of a single product, service, or campaign',
        devPrice: '$200–400',
        demoUrl: 'https://demo4.websmith-shop.com'
    },
    {
        id: 'custom',
        name: 'Custom',
        description: 'Individual project with unique requirements and functionality. Discussed and priced individually.',
        bestFor: 'Complex projects, unique business needs, custom integrations',
        devPrice: '$2000+',
        demoUrl: '#'
    }
]
</script>

<style scoped>
.amber-filter {
    filter: sepia(1) hue-rotate(15deg) saturate(2.5) brightness(1.2);
}
</style>