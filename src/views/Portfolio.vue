<template>
    <section class="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16">
        <h1 class="font-display text-3xl font-extrabold text-white sm:text-4xl">Work</h1>
        <p class="mx-auto mt-4 max-w-2xl text-neutral-400">
            Live systems, automations, and site-type demos. A native app or a custom cabinet is scoped from your brief.
            Simple examples are open to click; owner cabinets stay behind login.
        </p>

        <article v-for="item in featured" :id="item.anchor" :key="item.title"
            class="mt-10 scroll-mt-28 rounded-xl border border-amber-500/30 bg-neutral-800 p-5 text-left sm:mt-12 sm:p-8">
            <p class="text-xs font-semibold uppercase tracking-wide text-amber-400">
                {{ item.kind === 'screens' ? 'Custom cabinet' : 'Live system' }}
            </p>
            <h2 class="mt-2 font-display text-2xl font-semibold text-white">{{ item.title }}</h2>
            <p class="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-300">{{ item.caption }}</p>
            <ul v-if="item.features?.length" class="mt-6 space-y-2 text-sm text-neutral-300">
                <li v-for="feature in item.features" :key="feature" class="flex gap-2">
                    <span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400"></span>
                    <span>{{ feature }}</span>
                </li>
            </ul>
            <p v-if="item.note" class="mt-4 text-xs leading-relaxed text-neutral-500">{{ item.note }}</p>

            <div v-if="item.screenshots?.length" class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <button v-for="shot in item.screenshots" :key="shot.src" type="button"
                    class="group overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                    :aria-label="`Enlarge: ${shot.alt}`" @click="openShot(shot)">
                    <img :src="shot.src" :alt="shot.alt" width="1600" height="803" loading="lazy" decoding="async"
                        class="aspect-[16/8] w-full object-cover object-top transition-opacity group-hover:opacity-90" />
                </button>
            </div>

            <a v-if="item.kind === 'live' && item.url" :href="item.url" target="_blank" rel="noopener noreferrer"
                class="btn-primary mt-6 inline-flex w-full sm:w-auto">
                {{ item.cta || 'View live site' }}
            </a>
        </article>

        <div id="automations" class="mt-10 scroll-mt-28 sm:mt-12">
            <h2 class="font-display text-xl font-semibold text-white sm:text-2xl">Automations</h2>
            <p class="mx-auto mt-3 max-w-2xl text-sm text-neutral-400">
                Two examples from a larger set that already runs. You see the result — a draft, a send, a
                report — not the wiring.
            </p>
            <div class="mt-6 grid grid-cols-1 gap-6 text-left md:grid-cols-2">
                <article v-for="item in automations" :id="item.anchor" :key="item.title"
                    class="scroll-mt-28 rounded-xl border border-amber-500/30 bg-neutral-800 p-5 sm:p-6">
                    <p class="text-xs font-semibold uppercase tracking-wide text-amber-400">Automation</p>
                    <h3 class="mt-2 font-display text-xl font-semibold text-white">{{ item.title }}</h3>
                    <p class="mt-3 text-sm leading-relaxed text-neutral-300">{{ item.caption }}</p>
                    <ul v-if="item.features?.length" class="mt-5 space-y-2 text-sm text-neutral-300">
                        <li v-for="feature in item.features" :key="feature" class="flex gap-2">
                            <span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400"></span>
                            <span>{{ feature }}</span>
                        </li>
                    </ul>
                    <p v-if="item.note" class="mt-4 text-xs leading-relaxed text-neutral-500">{{ item.note }}</p>
                </article>
            </div>
            <p class="mx-auto mt-6 max-w-2xl text-xs leading-relaxed text-neutral-500">
                Reminders, CRM updates, and other live flows are not all listed here. These two show the kind of work.
            </p>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-6 text-left md:grid-cols-2 lg:grid-cols-3">
            <a v-for="item in demos" :key="item.url" :href="item.url" target="_blank" rel="noopener noreferrer"
                class="rounded-xl border border-neutral-700 bg-neutral-800 p-5 transition-colors hover:border-amber-500/50 sm:p-6">
                <h2 class="font-display text-lg font-semibold text-white">{{ item.title }}</h2>
                <p class="mt-2 text-sm text-neutral-400">{{ item.caption }}</p>
                <span class="mt-4 inline-block text-sm text-amber-400">{{ item.cta || 'View demo' }}</span>
            </a>
        </div>
    </section>

    <Teleport to="body">
        <div v-if="activeShot" class="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog"
            aria-modal="true" :aria-label="activeShot.alt" @keydown.esc="closeShot">
            <button type="button" class="absolute inset-0 bg-black/80" aria-label="Close screenshot"
                @click="closeShot"></button>
            <div
                class="relative z-10 mx-0 w-full max-h-[92dvh] overflow-auto rounded-t-2xl bg-neutral-900 p-3 pb-[env(safe-area-inset-bottom)] sm:mx-4 sm:max-w-6xl sm:rounded-xl sm:p-4">
                <div class="mb-3 flex items-start justify-between gap-3">
                    <p class="pt-2 text-sm text-neutral-300">{{ activeShot.alt }}</p>
                    <button type="button"
                        class="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center text-neutral-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                        aria-label="Close" @click="closeShot">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <img :src="activeShot.src" :alt="activeShot.alt" width="1600" height="803"
                    class="w-full rounded-lg border border-neutral-700" />
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useSEO } from '../composables/useSEO'
import { workItems, type WorkScreenshot } from '../content/offers'

const featured = computed(() =>
    workItems.filter((item) => item.kind === 'live' || item.kind === 'screens'),
)
const automations = computed(() => workItems.filter((item) => item.kind === 'automation'))
const demos = computed(() =>
    workItems.filter(
        (item) => item.kind !== 'live' && item.kind !== 'screens' && item.kind !== 'automation',
    ),
)

const activeShot = ref<WorkScreenshot | null>(null)

function openShot(shot: WorkScreenshot) {
    activeShot.value = shot
}

function closeShot() {
    activeShot.value = null
}

function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        closeShot()
    }
}

watch(activeShot, (shot) => {
    document.body.style.overflow = shot ? 'hidden' : ''
})

onMounted(() => {
    window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
})

useSEO({
    title: 'Work — WebSmith',
    description:
        'Live Pet Friends system, a contractor jobsite cabinet, lead outreach and site checks, plus demo sites.',
    ogTitle: 'Work — WebSmith',
    ogDescription:
        'Live Pet Friends system, a contractor jobsite cabinet, lead outreach and site checks, plus demo sites.',
    canonical: 'https://websmith-shop.com/work',
})
</script>
