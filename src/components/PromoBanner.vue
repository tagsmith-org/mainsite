<template>
    <div v-if="isPromoEnabled"
        class="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-900 py-3 px-4 shadow-lg">
        <div class="max-w-4xl mx-auto flex items-center justify-center gap-3 font-bold text-lg">
            <span class="text-2xl">🎁</span>
            <span class="flex-1 text-center">
                {{ promoDescription }}
                <span class="ml-2 text-sm font-normal opacity-90">
                    Limited time offer!
                </span>
            </span>
            <button @click="goToOrder"
                class="bg-neutral-900 text-amber-500 px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-sm font-bold">
                Get Offer
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Прямое использование переменных окружения
const isPromoEnabled = computed(() => import.meta.env.VITE_PROMO_ENABLED === 'true')
const promoDiscount = computed(() => Number(import.meta.env.VITE_PROMO_DISCOUNT) || 0)
const promoLabel = computed(() => import.meta.env.VITE_PROMO_LABEL || 'Special Offer!')
const promoDescription = computed(() => import.meta.env.VITE_PROMO_DESCRIPTION || 'Get a special discount!')

function goToOrder() {
    router.push('/site-order')
}
</script>