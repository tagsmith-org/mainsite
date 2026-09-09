<template>
    <div class="min-h-dvh overflow-x-hidden bg-neutral-800 font-sans text-white">
        <a href="#main-content"
            class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-neutral-900">
            Skip to content
        </a>
        <PromoBanner />

        <header
            class="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-800/95 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
            <nav class="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
                <RouterLink to="/" class="flex min-h-11 min-w-0 items-center" aria-label="WebSmith home">
                    <img src="../../src/assets/logos/image.png" alt=""
                        class="h-9 w-auto flex-shrink-0 amber-filter sm:h-10" />
                    <span class="ml-2 truncate font-display text-lg font-semibold tracking-wide sm:text-xl">
                        WebSmith
                    </span>
                </RouterLink>

                <ul class="hidden items-center gap-6 text-sm font-medium text-neutral-300 lg:flex lg:gap-8">
                    <li>
                        <RouterLink to="/" class="nav-link" exact-active-class="nav-link-active">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/services" class="nav-link" active-class="nav-link-active">Services</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/work" class="nav-link" active-class="nav-link-active">Work</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/contact" class="nav-link" active-class="nav-link-active">Contact</RouterLink>
                    </li>
                    <li>
                        <button type="button" class="btn-primary py-2 text-xs uppercase tracking-wide"
                            @click="openModal">
                            Get a quote
                        </button>
                    </li>
                </ul>

                <button type="button"
                    class="relative flex h-11 w-11 flex-col items-center justify-center lg:hidden"
                    :aria-expanded="isOpen" :aria-label="isOpen ? 'Close menu' : 'Open menu'"
                    @click="isOpen = !isOpen">
                    <span class="block h-0.5 w-6 bg-white transition-transform duration-200"
                        :class="isOpen ? 'translate-y-2 rotate-45' : ''"></span>
                    <span class="mt-1.5 block h-0.5 w-6 bg-white transition-opacity duration-200"
                        :class="isOpen ? 'opacity-0' : ''"></span>
                    <span class="mt-1.5 block h-0.5 w-6 bg-white transition-transform duration-200"
                        :class="isOpen ? '-translate-y-2 -rotate-45' : ''"></span>
                </button>

                <ul v-if="isOpen"
                    class="absolute left-0 right-0 top-full z-50 flex max-h-[calc(100dvh-4rem)] flex-col items-stretch overflow-y-auto border-b border-neutral-800 bg-neutral-900 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
                    <li>
                        <RouterLink to="/" class="nav-link flex min-h-11 items-center" @click="isOpen = false">Home
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/services" class="nav-link flex min-h-11 items-center"
                            @click="isOpen = false">Services</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/work" class="nav-link flex min-h-11 items-center" @click="isOpen = false">Work
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/contact" class="nav-link flex min-h-11 items-center"
                            @click="isOpen = false">Contact</RouterLink>
                    </li>
                    <li class="pt-2">
                        <button type="button" class="btn-primary w-full" @click="openQuoteFromMobile">Get a quote</button>
                    </li>
                </ul>
            </nav>
        </header>

        <main id="main-content">
            <slot />
        </main>

        <footer
            class="border-t border-neutral-800 px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-center text-xs text-neutral-400 sm:px-6">
            <div class="mb-3 font-medium text-neutral-300">
                WebSmith — sites, systems, apps, automations.
            </div>
            <div class="mb-3">© 2026 WebSmith</div>
            <div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <RouterLink to="/privacy-policy" class="inline-flex min-h-11 items-center hover:text-amber-400">Privacy
                    Policy</RouterLink>
                <RouterLink to="/terms" class="inline-flex min-h-11 items-center hover:text-amber-400">Terms of
                    Use</RouterLink>
                <RouterLink to="/cookies" class="inline-flex min-h-11 items-center hover:text-amber-400">Cookie
                    Policy</RouterLink>
            </div>
        </footer>

        <PromoManager />
        <ProjectRequestModal :is-open="isModalOpen" @close="closeModal" />
    </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PromoBanner from './PromoBanner.vue'
import PromoManager from './PromoManager.vue'
import ProjectRequestModal from './ProjectRequestModal.vue'
import { useProjectModal } from '../composables/useProjectModal'

const isOpen = ref(false)
const route = useRoute()
const { isModalOpen, openModal, closeModal } = useProjectModal()

watch(() => route.fullPath, () => {
    isOpen.value = false
})

watch([isOpen, isModalOpen], ([menuOpen, modalOpen]) => {
    document.body.style.overflow = menuOpen || modalOpen ? 'hidden' : ''
})

onUnmounted(() => {
    document.body.style.overflow = ''
})

function openQuoteFromMobile() {
    isOpen.value = false
    openModal()
}
</script>

<style scoped>
.amber-filter {
    filter: brightness(0) saturate(100%) invert(84%) sepia(31%) saturate(638%) hue-rotate(359deg) brightness(103%) contrast(107%);
}
</style>
