<template>
    <div v-if="isPromoEnabled"
        class="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-neutral-900 py-4 px-4 shadow-lg relative overflow-hidden">
        <!-- Animated background -->
        <div class="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 animate-pulse"></div>

        <div class="max-w-6xl mx-auto relative z-10">
            <!-- Main content -->
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                <!-- Left side - Main offer -->
                <div class="flex items-center gap-3">
                    <span class="text-3xl animate-bounce">🎁</span>
                    <div class="text-center md:text-left">
                        <div class="font-bold text-xl md:text-2xl">
                            {{ promoStore.currentPromo.label }}
                        </div>
                        <div class="text-sm opacity-90">
                            {{ promoStore.currentPromo.description }}
                        </div>
                        <div class="text-xs opacity-75 mt-1">
                            {{ formatDate(promoStore.currentPromo.startDate) }} - {{
                            formatDate(promoStore.currentPromo.endDate) }}
                        </div>
                    </div>
                </div>

                <!-- Center - Countdown timer -->
                <div class="flex items-center gap-2 md:gap-4">
                    <div class="text-center">
                        <div class="text-xs opacity-75">ENDS IN</div>
                        <div class="flex gap-1 md:gap-2">
                            <div
                                class="bg-neutral-900 text-amber-500 px-2 py-1 rounded text-sm font-mono font-bold min-w-[2rem]">
                                {{ countdown.months }}
                            </div>
                            <div
                                class="bg-neutral-900 text-amber-500 px-2 py-1 rounded text-sm font-mono font-bold min-w-[2rem]">
                                {{ countdown.days }}
                            </div>
                            <div
                                class="bg-neutral-900 text-amber-500 px-2 py-1 rounded text-sm font-mono font-bold min-w-[2rem]">
                                {{ countdown.hours.toString().padStart(2, '0') }}
                            </div>
                            <div
                                class="bg-neutral-900 text-amber-500 px-2 py-1 rounded text-sm font-mono font-bold min-w-[2rem]">
                                {{ countdown.minutes.toString().padStart(2, '0') }}
                            </div>
                        </div>
                        <div class="text-xs opacity-75 mt-1">M D H M</div>
                    </div>
                </div>

                <!-- Right side - Remaining orders and CTA -->
                <div class="flex flex-col items-center gap-2">
                    <div class="text-center">
                        <div class="text-xs opacity-75">REMAINING</div>
                        <div class="font-bold text-xl text-red-600">
                            {{ promoStore.remainingOrders }} SPOTS
                        </div>
                    </div>
                    <button @click="goToOrder"
                        class="bg-neutral-900 text-amber-500 px-6 py-3 rounded-lg hover:bg-neutral-800 transition-all duration-300 text-sm font-bold transform hover:scale-105 shadow-lg">
                        CLAIM OFFER
                    </button>
                </div>
            </div>

            
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePromoStore } from '../stores/promo.js'

const router = useRouter()
const promoStore = usePromoStore()

// Используем активную promotion из store
const isPromoEnabled = computed(() => promoStore.isPromoActive)
const countdown = computed(() => promoStore.countdown)



// Format date function
const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

function goToOrder() {
    router.push('/contact')
}

// Cleanup countdown on unmount
onUnmounted(() => {
    promoStore.cleanupCountdown()
})
</script>

<style scoped>
@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.8;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes bounce {

    0%,
    20%,
    53%,
    80%,
    100% {
        transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
        transform: translate3d(0, -8px, 0);
    }

    70% {
        transform: translate3d(0, -4px, 0);
    }

    90% {
        transform: translate3d(0, -2px, 0);
    }
}

.animate-bounce {
    animation: bounce 2s infinite;
}
</style>