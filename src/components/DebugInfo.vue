<template>
    <div class="fixed top-0 right-0 bg-black bg-opacity-75 text-white p-2 text-xs z-50">
        <div>Window: {{ windowWidth }}px</div>
        <div>Container: max-w-4xl (896px)</div>
        <div>Page: {{ currentPage }}</div>
        <div>Main Width: {{ mainWidth }}px</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const windowWidth = ref(0)
const mainWidth = ref(0)
const route = useRoute()
const currentPage = ref('')

const updateWidth = () => {
    windowWidth.value = window.innerWidth
    const mainElement = document.querySelector('main')
    if (mainElement) {
        mainWidth.value = mainElement.offsetWidth
    }
}
// ddfg 777777 66666
const updatePage = () => {
    currentPage.value = route.name as string || route.path.slice(1) || 'home'
}

onMounted(() => {
    updateWidth()
    updatePage()
    window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
})
</script>