<template>
    <div v-if="promoStore.showPromoManager"
        class="fixed bottom-4 right-4 bg-neutral-800 p-4 rounded-lg shadow-lg text-white text-sm z-50 max-w-xs">
        <h3 class="font-bold mb-2 text-amber-400">🎛️ Promo Manager</h3>

        <div class="space-y-2">
            <div>
                <label class="block text-xs text-neutral-400 mb-1">Active Promo:</label>
                <select v-model="selectedPromo" @change="switchPromo"
                    class="w-full px-2 py-1 bg-neutral-700 text-white rounded text-xs">
                    <option v-for="(promo, key) in availablePromos" :key="key" :value="key">
                        {{ promo.name }} {{ promo.discount > 0 ? '(' + Math.round(promo.discount * 100) + '%)' : '' }}
                    </option>
                </select>
            </div>

            <div class="text-xs">
                <div class="flex justify-between">
                    <span>Status:</span>
                    <span :class="promoStore.isPromoActive ? 'text-green-400' : 'text-red-400'">
                        {{ promoStore.isPromoActive ? 'Active' : 'Inactive' }}
                    </span>
                </div>
                <div class="flex justify-between">
                    <span>Discount:</span>
                    <span class="text-amber-400">{{ promoStore.currentDiscount > 0 ?
                        Math.round(promoStore.currentDiscount * 100) + '%' : 'No discount' }}</span>
                </div>
                <div class="flex justify-between">
                    <span>Current:</span>
                    <span class="text-neutral-300">{{ promoStore.currentPromo.name }}</span>
                </div>
            </div>

            <button @click="reloadConfig"
                class="w-full px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition">
                🔄 Reload Config
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePromoStore } from '../stores/promo.js'

const promoStore = usePromoStore()

const selectedPromo = computed({
    get: () => promoStore.activePromo,
    set: (value) => promoStore.setActivePromo(value)
})

const availablePromos = computed(() => {
    const promos = {}
    Object.keys(promoStore.config).forEach(key => {
        // Исключаем envPromo и activePromo из списка
        if (key !== 'activePromo' && key !== 'envPromo') {
            promos[key] = promoStore.config[key]
        }
    })
    return promos
})

function switchPromo() {
    // Функция больше не нужна, так как selectedPromo теперь computed
}

function reloadConfig() {
    promoStore.reloadConfig()
    // selectedPromo автоматически обновится через computed
}
</script>