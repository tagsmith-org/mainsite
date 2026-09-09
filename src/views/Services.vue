<template>
    <div class="mx-auto max-w-6xl px-4 py-12 text-white sm:px-6 sm:py-16">
        <header class="mb-10 text-center sm:mb-12">
            <h1 class="font-display text-3xl font-extrabold sm:text-4xl">What we can build</h1>
            <p class="mx-auto mt-4 max-w-2xl text-base text-neutral-300">
                Start with the outcome. The tools come second. Figures below are starting
                points, then by agreement — every project is different. Domain is paid separately.
            </p>
            <nav class="mt-8 flex flex-wrap justify-center gap-2 text-sm sm:gap-3">
                <a v-for="offer in offers" :key="offer.id" :href="`#${offer.id}`"
                    class="inline-flex min-h-11 items-center rounded-full border border-neutral-700 px-4 py-2 text-neutral-300 hover:border-amber-400 hover:text-amber-400">
                    {{ offer.title }}
                </a>
                <a href="#care"
                    class="inline-flex min-h-11 items-center rounded-full border border-neutral-700 px-4 py-2 text-neutral-300 hover:border-amber-400 hover:text-amber-400">Care</a>
            </nav>
        </header>

        <section id="simple-sites" class="scroll-mt-28 border-t border-neutral-800 py-10 sm:scroll-mt-32 sm:py-14">
            <h2 class="font-display text-2xl font-semibold text-amber-400">Simple sites</h2>
            <p class="mt-2 max-w-2xl text-sm text-neutral-400">{{ offers[0].stack }}</p>

            <div class="mt-8 hidden overflow-hidden rounded-xl border border-neutral-700 md:block">
                <table class="min-w-full divide-y divide-neutral-700 text-sm">
                    <thead class="bg-neutral-800">
                        <tr>
                            <th class="px-4 py-3 text-left font-semibold text-neutral-300">Type</th>
                            <th class="px-4 py-3 text-left font-semibold text-neutral-300">For you</th>
                            <th class="px-4 py-3 text-left font-semibold text-neutral-300">Best for</th>
                            <th class="px-4 py-3 text-left font-semibold text-neutral-300">From</th>
                            <th class="px-4 py-3 text-left font-semibold text-neutral-300">Demo</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-800">
                        <tr v-for="siteType in siteTypes" :key="siteType.id">
                            <td class="px-4 py-3 font-medium text-white">{{ siteType.name }}</td>
                            <td class="px-4 py-3 text-neutral-300">{{ siteType.description }}</td>
                            <td class="px-4 py-3 text-neutral-400">{{ siteType.bestFor }}</td>
                            <td class="whitespace-nowrap px-4 py-3 text-amber-400">{{ siteType.price }}</td>
                            <td class="px-4 py-3">
                                <button v-if="siteType.demoUrl !== '#'" type="button"
                                    class="bg-transparent text-amber-400 hover:underline"
                                    @click="openDemo(siteType.demoUrl)">demo</button>
                                <span v-else class="text-neutral-600">—</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-6 space-y-4 md:hidden">
                <div v-for="siteType in siteTypes" :key="siteType.id"
                    class="rounded-xl border border-neutral-700 bg-neutral-800 p-4">
                    <div class="flex items-start justify-between gap-3">
                        <h3 class="font-display font-semibold text-white">{{ siteType.name }}</h3>
                        <button v-if="siteType.demoUrl !== '#'" type="button"
                            class="inline-flex min-h-11 items-center text-sm text-amber-400"
                            @click="openDemo(siteType.demoUrl)">demo</button>
                    </div>
                    <p class="mt-2 text-sm text-neutral-300">{{ siteType.description }}</p>
                    <p class="mt-2 text-xs text-neutral-500">{{ siteType.bestFor }}</p>
                    <p class="mt-3 text-sm font-semibold text-amber-400">{{ siteType.price }}</p>
                </div>
            </div>
            <p class="mt-6 text-sm text-neutral-500">{{ PRICE_NOTE }}</p>
        </section>

        <section id="web-systems" class="scroll-mt-28 border-t border-neutral-800 py-10 sm:scroll-mt-32 sm:py-14">
            <h2 class="font-display text-2xl font-semibold text-amber-400">Web systems</h2>
            <p class="mt-3 max-w-2xl text-neutral-300">{{ offers[1].owner }}</p>
            <p class="mt-2 text-sm text-neutral-500">{{ offers[1].stack }}</p>
            <p class="mt-6 font-semibold text-amber-400">{{ offers[1].price }} · by agreement</p>
        </section>

        <section id="mobile" class="scroll-mt-28 border-t border-neutral-800 py-10 sm:scroll-mt-32 sm:py-14">
            <h2 class="font-display text-2xl font-semibold text-amber-400">Mobile</h2>
            <div class="mt-8 grid gap-6 md:grid-cols-2">
                <div class="rounded-xl border border-neutral-700 bg-neutral-800 p-6">
                    <h3 class="font-display font-semibold text-white">Works on the phone</h3>
                    <p class="mt-2 text-sm text-neutral-300">The site or system is comfortable on a small screen. Not a
                        store listing.</p>
                    <p class="mt-4 text-sm font-semibold text-amber-400">Included in the site or system</p>
                </div>
                <div class="rounded-xl border border-neutral-700 bg-neutral-800 p-6">
                    <h3 class="font-display font-semibold text-white">Native app</h3>
                    <p class="mt-2 text-sm text-neutral-300">A real Android and/or iOS app: install, notifications,
                        camera, offline, store listing.</p>
                    <p class="mt-4 text-sm font-semibold text-amber-400">from $5,000+ · by agreement</p>
                </div>
            </div>
        </section>

        <section id="backend" class="scroll-mt-28 border-t border-neutral-800 py-10 sm:scroll-mt-32 sm:py-14">
            <h2 class="font-display text-2xl font-semibold text-amber-400">Backend</h2>
            <p class="mt-3 max-w-2xl text-neutral-300">{{ offers[3].owner }}</p>
            <p class="mt-2 text-sm text-neutral-500">{{ offers[3].stack }}</p>
            <p class="mt-6 font-semibold text-amber-400">{{ offers[3].price }} · by agreement</p>
        </section>

        <section id="automations" class="scroll-mt-28 border-t border-neutral-800 py-10 sm:scroll-mt-32 sm:py-14">
            <h2 class="font-display text-2xl font-semibold text-amber-400">Automations</h2>
            <p class="mt-3 max-w-2xl text-neutral-300">{{ offers[4].owner }}</p>
            <p class="mt-2 text-sm text-neutral-500">{{ offers[4].stack }}</p>
            <ul class="mt-6 space-y-2 text-sm text-neutral-300">
                <li>A first flow (form to CRM or table to a message for you) — from $400+</li>
                <li>Care: we watch the flows, fix breaks, small changes — from $30/mo+</li>
            </ul>
            <p class="mt-4 text-sm text-neutral-500">{{ PRICE_NOTE }}</p>
        </section>

        <section id="care" class="scroll-mt-28 border-t border-neutral-800 py-10 sm:scroll-mt-32 sm:py-14">
            <h2 class="font-display text-2xl font-semibold text-amber-400">Care</h2>
            <div class="mt-8 grid gap-6 md:grid-cols-2">
                <div class="rounded-xl border border-neutral-700 bg-neutral-800 p-6">
                    <h3 class="font-display font-semibold text-white">You own the files</h3>
                    <p class="mt-2 text-sm text-neutral-300">Code is yours: GitHub or a zip, with notes on how it goes
                        live.</p>
                </div>
                <div class="rounded-xl border border-neutral-700 bg-neutral-800 p-6">
                    <h3 class="font-display font-semibold text-white">We can host it</h3>
                    <p class="mt-2 text-sm text-neutral-300">Hosting and light support: updates, monitoring, small
                        fixes. From $15/mo+ on top of the build, by agreement.</p>
                </div>
            </div>
        </section>

        <section class="border-t border-neutral-800 py-10 text-center sm:py-14">
            <h2 class="font-display text-2xl font-semibold text-amber-400">Not sure which of these you need?</h2>
            <p class="mx-auto mt-3 max-w-xl text-neutral-300">Describe the result. We will map it to a site, a system,
                an app, or an automation — or a mix — and agree the price before work starts.</p>
            <button type="button" class="btn-primary mt-8 w-full sm:w-auto" @click="openModal">Get a quote</button>
        </section>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectModal } from '../composables/useProjectModal'
import { useSEO } from '../composables/useSEO'
import { PRICE_NOTE, offers, siteTypes } from '../content/offers'

const route = useRoute()
const { openModal } = useProjectModal()

useSEO({
    title: 'Services and pricing — WebSmith',
    description:
        'Landing pages from $200+. Company sites, shops, web systems, native apps, and automations. Price by agreement.',
    ogTitle: 'Services and pricing — WebSmith',
    ogDescription:
        'Landing pages from $200+. Company sites, shops, web systems, native apps, and automations. Price by agreement.',
    canonical: 'https://websmith-shop.com/services',
})

function scrollToHash() {
    if (!route.hash) {
        return
    }
    const target = document.querySelector(route.hash)
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

onMounted(scrollToHash)
watch(() => route.hash, scrollToHash)

function openDemo(url: string) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile) {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            window.location.href = url
        }
    } else {
        window.open(url, '_blank', 'noopener,noreferrer')
    }
}
</script>
