<template>
    <div class="max-w-2xl mx-auto">
        <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Name -->
            <div>
                <label for="from_name" class="block text-sm font-medium text-neutral-200 mb-2">
                    Name *
                </label>
                <input id="from_name" v-model="formData.name" type="text" required
                    class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Your name" />
            </div>

            <!-- Location -->
            <div>
                <label for="location" class="block text-sm font-medium text-neutral-200 mb-2">
                    Location *
                </label>
                <input id="location" v-model="formData.location" type="text" required
                    class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Your location" />
            </div>

            <!-- Business Description -->
            <div>
                <label for="business" class="block text-sm font-medium text-neutral-200 mb-2">
                    Business Description *
                </label>
                <textarea id="business" v-model="formData.business" required rows="3"
                    class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    placeholder="Describe your business in a few sentences"></textarea>
            </div>

            <!-- Website Requirements -->
            <div>
                <label for="requirements" class="block text-sm font-medium text-neutral-200 mb-2">
                    Website Requirements *
                </label>
                <textarea id="requirements" v-model="formData.requirements" required rows="4"
                    class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    placeholder="Describe what the website should do, what functions are needed"></textarea>
            </div>

            <!-- Content -->
            <div>
                <label class="block text-sm font-medium text-neutral-200 mb-3">
                    Website Content *
                </label>
                <div class="space-y-3">
                    <label class="flex items-center">
                        <input v-model="formData.contentType" type="radio" value="no-content"
                            class="mr-3 text-amber-500 focus:ring-amber-500" />
                        <span class="text-neutral-300">
                            <strong>Content not important</strong> - use your materials, lower price
                        </span>
                    </label>

                    <label class="flex items-center">
                        <input v-model="formData.contentType" type="radio" value="with-content"
                            class="mr-3 text-amber-500 focus:ring-amber-500" />
                        <span class="text-neutral-300">
                            <strong>Have materials</strong> - will provide texts, photos, images
                        </span>
                    </label>

                    <label class="flex items-center">
                        <input v-model="formData.contentType" type="radio" value="need-content"
                            class="mr-3 text-amber-500 focus:ring-amber-500" />
                        <span class="text-neutral-300">
                            <strong>Need content</strong> - create all materials from scratch, higher price
                        </span>
                    </label>
                </div>
            </div>

            <!-- Email -->
            <div>
                <label for="from_email" class="block text-sm font-medium text-neutral-200 mb-2">
                    Email for contact *
                </label>
                <input id="from_email" v-model="formData.email" type="email" required
                    class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your@email.com" />
            </div>

            <!-- Submit Button -->
            <button type="submit" :disabled="isSubmitting"
                class="w-full bg-amber-500 text-neutral-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="isSubmitting">Sending...</span>
                <span v-else>Submit Request</span>
            </button>
        </form>

        <!-- Toast notifications -->
        <div v-if="toast.show" :class="toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'"
            class="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white max-w-sm transition-all duration-300">
            <div class="flex items-center">
                <span class="flex-1">{{ toast.message }}</span>
                <button @click="hideToast" class="ml-3 text-white hover:text-gray-200">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getOrderUrl } from '../config/api.js'

interface FormData {
    name: string
    location: string
    business: string
    requirements: string
    contentType: string
    email: string
}

// Toast state
const toast = ref({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
})

const formData = ref<FormData>({
    name: '',
    location: '',
    business: '',
    requirements: '',
    contentType: '',
    email: ''
})

const isSubmitting = ref(false)

const emit = defineEmits<{ submitted: [] }>()

function showToast(message: string, type: 'success' | 'error' = 'success') {
    toast.value = {
        show: true,
        message,
        type
    }

    // Auto hide after 5 seconds
    setTimeout(() => {
        hideToast()
    }, 5000)
}

function hideToast() {
    toast.value.show = false
}

async function submitForm() {
    if (!formData.value.contentType) {
        showToast('Please select a content type', 'error')
        return
    }

    isSubmitting.value = true

    try {
        console.log('TEST: Starting to send...')

        const response = await fetch(getOrderUrl(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.value.name,
                email: formData.value.email,
                location: formData.value.location,
                business: formData.value.business,
                requirements: formData.value.requirements,
                contentType: getContentTypeLabel(formData.value.contentType)
            })
        })

        const result = await response.json()

        if (response.ok) {
            showToast('Request sent successfully! We will contact you soon.', 'success')
            emit('submitted')

            // Очистить форму после успешной отправки
            formData.value = {
                name: '',
                location: '',
                business: '',
                requirements: '',
                contentType: '',
                email: ''
            }
        } else {
            showToast('Error sending request. Please try again.', 'error')
        }

    } catch (error) {
        console.error('TEST: ERROR:', error)
        showToast('Error sending request. Please try again.', 'error')
    } finally {
        isSubmitting.value = false
    }
}

function getContentTypeLabel(type: string): string {
    const labels = {
        'no-content': 'Content not important - lower price',
        'with-content': 'Have materials - standard price',
        'need-content': 'Need content - higher price'
    }
    return labels[type as keyof typeof labels] || type
}
</script>
