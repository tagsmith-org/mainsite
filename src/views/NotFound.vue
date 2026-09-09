<template>
    <section class="mx-auto max-w-xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <p class="text-xs font-semibold uppercase tracking-wide text-amber-400">404</p>
        <h1 class="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">Page not found</h1>
        <p class="mt-4 text-sm leading-relaxed text-neutral-400">
            This address is not a page. The home, services, and work pages are still here.
        </p>
        <RouterLink to="/" class="btn-primary mt-8 inline-flex w-full sm:w-auto">Back to home</RouterLink>
    </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useSEO } from '../composables/useSEO'

useSEO({
    title: 'Page not found — WebSmith',
    description: 'This page does not exist. Open home, services, or work instead.',
    canonical: 'https://websmith-shop.com/404',
})

onMounted(() => {
    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
        robots = document.createElement('meta')
        robots.setAttribute('name', 'robots')
        document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex, follow')
})
</script>
