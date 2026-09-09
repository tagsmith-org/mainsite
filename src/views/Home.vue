<template>
    <div class="w-full bg-neutral-800 text-white">
        <header class="border-b border-neutral-800 bg-neutral-800">
            <div class="mx-auto max-w-6xl px-4 sm:px-6">
                <div class="relative overflow-hidden bg-neutral-800 py-14 sm:py-20 md:py-28">
                    <div class="hero-bg pointer-events-none absolute inset-0"
                        :style="{ backgroundImage: `url(${heroImage})` }"></div>
                    <div class="relative z-10 flex flex-col items-center text-center">
                        <h1 class="font-display text-3xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
                            Sites, systems, and apps that do the work.
                        </h1>
                        <p class="mt-4 max-w-2xl text-base leading-relaxed text-neutral-100 drop-shadow-md sm:mt-5 sm:text-lg">
                            A page that brings inquiries. A system for staff or customers. An app in the stores.
                            Automations so tools stop living on copy-paste. Starting prices are below; the real
                            number is agreed before work starts.
                        </p>
                        <div class="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                            <button type="button" class="btn-primary w-full sm:w-auto" @click="handleStartProjectClick">
                                Get a quote
                            </button>
                            <RouterLink to="/services" class="btn-secondary w-full sm:w-auto">See what we build</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <section id="offers" class="bg-neutral-800 py-12 sm:py-20">
            <div class="mx-auto max-w-6xl px-4 sm:px-6">
                <h2 class="mb-3 text-center font-display text-2xl font-semibold text-amber-400">What we can build</h2>
                <p class="mx-auto mb-12 max-w-2xl text-center text-sm text-neutral-400">{{ PRICE_NOTE }}</p>
                <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <RouterLink v-for="offer in offers" :key="offer.id" :to="`/services#${offer.id}`"
                        class="rounded-xl border border-neutral-700 bg-neutral-900 p-6 transition-colors hover:border-amber-500/50">
                        <OfferIcon :name="offer.icon" />
                        <h3 class="mt-4 font-display text-lg font-semibold text-white">{{ offer.title }}</h3>
                        <p class="mt-2 text-sm leading-relaxed text-neutral-300">{{ offer.owner }}</p>
                        <p class="mt-3 text-xs text-neutral-500">{{ offer.stack }}</p>
                        <p class="mt-4 text-sm font-semibold text-amber-400">{{ offer.price }}</p>
                    </RouterLink>
                </div>
            </div>
        </section>

        <section id="process" class="py-12 sm:py-20">
            <div class="mx-auto max-w-3xl px-4 sm:px-6">
                <h2 class="mb-12 text-center font-display text-2xl font-semibold text-amber-400">How we work</h2>
                <ol class="space-y-8">
                    <li v-for="step in processSteps" :key="step.n" class="flex items-start">
                        <span
                            class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 font-display text-sm font-bold text-neutral-900">
                            {{ step.n }}
                        </span>
                        <div>
                            <h3 class="font-display font-semibold text-white">{{ step.title }}</h3>
                            <p class="mt-1 text-sm leading-relaxed text-neutral-300">{{ step.text }}</p>
                        </div>
                    </li>
                </ol>
            </div>
        </section>

        <section id="stack" class="border-y border-neutral-800 bg-neutral-800 py-10 sm:py-12">
            <div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
                <h2 class="mb-4 font-display text-lg font-semibold text-amber-400">How we build it</h2>
                <p class="text-sm leading-relaxed text-neutral-300">{{ STACK_STRIP }}</p>
            </div>
        </section>

        <section id="work" class="py-12 sm:py-20">
            <div class="mx-auto max-w-6xl px-4 sm:px-6">
                <h2 class="mb-12 text-center font-display text-2xl font-semibold text-amber-400">Recent work</h2>
                <div class="grid gap-6 md:grid-cols-3">
                    <component :is="isInternalLink(item.url) ? RouterLink : 'a'" v-for="item in workTeasers"
                        :key="item.title" v-bind="teaserLinkProps(item.url)"
                        class="rounded-xl border border-neutral-700 bg-neutral-800 p-6 transition-colors hover:border-amber-500/50">
                        <h3 class="font-display font-semibold text-white">{{ item.title }}</h3>
                        <p class="mt-2 text-sm text-neutral-400">{{ item.caption }}</p>
                        <span class="mt-4 inline-block text-sm text-amber-400">{{ item.cta || 'View demo' }}</span>
                    </component>
                </div>
                <p class="mt-8 text-center">
                    <RouterLink to="/work"
                        class="inline-flex min-h-11 items-center text-sm text-amber-400 hover:text-amber-300">See all
                        work</RouterLink>
                </p>
            </div>
        </section>

        <section id="cta" class="border-t border-neutral-800 px-4 py-12 sm:px-6 sm:py-16">
            <div class="mx-auto max-w-3xl text-center">
                <h2 class="font-display text-2xl font-semibold text-amber-400">Ready to talk through your project?</h2>
                <p class="mt-3 text-neutral-300">Describe the result. We will map it to a site, a system, an app, or an
                    automation — and agree the price before work starts.</p>
                <button type="button" class="btn-primary mt-8 w-full sm:w-auto" @click="handleStartProjectClick">Get a quote</button>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import OfferIcon from '../components/OfferIcon.vue'
import heroImage from '../assets/site-images/image2.png'
import { useProjectModal } from '../composables/useProjectModal'
import { useSEO } from '../composables/useSEO'
import { useGoogleAnalytics } from '../composables/useGoogleAnalytics'
import {
    PRICE_NOTE,
    STACK_STRIP,
    offers,
    processSteps,
    workTeasers,
} from '../content/offers'

const { openModal } = useProjectModal()
const { trackButtonClick } = useGoogleAnalytics()

useSEO({
    title: 'WebSmith — sites, systems, apps, and automations',
    description:
        'Custom websites, web systems, Android and iOS apps, backend, and business automations. Starting prices, then by agreement.',
    ogTitle: 'WebSmith — sites, systems, apps, and automations',
    ogDescription:
        'Custom websites, web systems, Android and iOS apps, backend, and business automations. Starting prices, then by agreement.',
    canonical: 'https://websmith-shop.com/',
})

function isInternalLink(url: string) {
    return url.startsWith('/')
}

function teaserLinkProps(url: string) {
    if (isInternalLink(url)) {
        return { to: url }
    }
    return { href: url, target: '_blank', rel: 'noopener noreferrer' }
}

function handleStartProjectClick() {
    trackButtonClick('start_project_cta')
    openModal()
}
</script>

<style scoped>
.hero-bg {
    background-color: #262626;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: brightness(1.95) contrast(1.1);
}
</style>
