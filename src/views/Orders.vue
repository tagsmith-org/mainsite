<template>
    <div class="orders-page">
        <div v-if="!isAdmin" class="container mx-auto px-4 py-8 text-center">
            <!--
            <div class="bg-red-900 border border-red-700 rounded-lg p-8">
                <h1 class="text-2xl font-bold text-red-400 mb-4">🚫 Доступ запрещен</h1>
                <p class="text-red-300">Эта страница доступна только администраторам.</p>
                <p class="text-red-300 mt-2">Ваш IP: {{ clientIP }}</p>
            </div>
            -->
        </div>

        <div v-else class="container mx-auto px-4 py-8">
            <OrderViewer ref="orderViewerRef" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import OrderViewer from '../components/OrderViewer.vue'
import { getAdminStatus } from '../utils/adminAuth.js'

const orderViewerRef = ref()
const isAdmin = ref(false)
const clientIP = ref('Проверка...')

onMounted(async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        clientIP.value = data.ip
    } catch (error) {
        clientIP.value = 'Не удалось определить'
    }

    isAdmin.value = await getAdminStatus()
})
</script>