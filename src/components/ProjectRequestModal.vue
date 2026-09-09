<template>
    <Transition name="modal">
        <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true"
            aria-labelledby="project-request-title">
            <!-- Overlay -->
            <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" @click="closeModal"></div>

            <!-- Modal -->
            <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
                <div
                    class="relative mx-0 w-full max-h-[85dvh] overflow-y-auto rounded-t-2xl bg-neutral-900 pb-[env(safe-area-inset-bottom)] shadow-xl sm:mx-4 sm:max-w-2xl sm:rounded-lg">
                    <div class="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-800 bg-neutral-900 p-4 sm:p-6">
                        <h2 id="project-request-title" class="font-display text-lg font-semibold text-white sm:text-xl">Project request</h2>
                        <button type="button"
                            class="inline-flex h-11 w-11 items-center justify-center text-neutral-400 transition-colors hover:text-white"
                            aria-label="Close" @click="closeModal">
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <div class="p-4 sm:p-6">
                        <ProjectRequestForm @submitted="handleFormSubmitted" />
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { onUnmounted, watch } from 'vue'
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

function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        closeModal()
    }
}

watch(() => props.isOpen, (open) => {
    if (open) {
        document.addEventListener('keydown', onKeydown)
    } else {
        document.removeEventListener('keydown', onKeydown)
    }
})

onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown)
})

function handleFormSubmitted() {
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
