<template>
    <Transition name="modal">
        <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
            <!-- Overlay -->
            <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" @click="closeModal"></div>

            <!-- Modal -->
            <div class="flex min-h-full items-center justify-center p-4">
                <div
                    class="relative bg-neutral-900 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <!-- Header -->
                    <div class="flex items-center justify-between p-6 border-b border-neutral-800">
                        <h2 class="text-xl font-semibold text-white">Заявка на разработку сайта</h2>
                        <button @click="closeModal" class="text-neutral-400 hover:text-white transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Content -->
                    <div class="p-6">
                        <ProjectRequestForm @submitted="handleFormSubmitted" />
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProjectRequestForm from './ProjectRequestForm.vue'

interface Props {
    isOpen: boolean
}

interface Emits {
    (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function closeModal() {
    emit('close')
}

function handleFormSubmitted() {
    // Закрываем модальное окно после успешной отправки
    setTimeout(() => {
        closeModal()
    }, 2000)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .bg-neutral-900,
.modal-leave-active .bg-neutral-900 {
    transition: transform 0.3s ease;
}

.modal-enter-from .bg-neutral-900,
.modal-leave-to .bg-neutral-900 {
    transform: scale(0.95);
}
</style>
