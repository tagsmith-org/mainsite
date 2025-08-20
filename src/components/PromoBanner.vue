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
import { usePromoStore } from '../stores/promo.js'

const router = useRouter()
const promoStore = usePromoStore()

// Используем активную promotion из store
const isPromoEnabled = computed(() => promoStore.isPromoActive)
const promoDescription = computed(() => promoStore.promoDescription || 'Get a special discount!')

function goToOrder() {
    router.push('/site-order')
}
</script>