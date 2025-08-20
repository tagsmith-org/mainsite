<template>
    <section class="py-20 text-white bg-neutral-900">
        <div class="max-w-xl mx-auto px-6">
            <h2 class="text-3xl font-bold mb-4 text-center text-amber-400">Get in touch</h2>
            <p class="text-neutral-300 text-center mb-10">
                Have a project or idea? Send me a message — I'll reply personally, usually within 24–48 hours.
            </p>

            <!-- Get Quote Button -->
            <div class="text-center mb-16">
                <div class="bg-gradient-to-r from-amber-500 to-orange-500 p-8 rounded-lg shadow-lg">
                    <h3 class="text-2xl font-bold text-neutral-900 mb-4">🚀 Ready to build your website?</h3>
                    <p class="text-neutral-800 mb-6 text-lg">
                        Get a custom quote for your project with transparent pricing
                    </p>
                    <button @click="openModal"
                        class="bg-neutral-900 text-amber-500 px-8 py-4 rounded-lg hover:bg-neutral-800 transition-colors text-lg font-bold shadow-lg">
                        Get Quote Now
                    </button>
                </div>
            </div>

            <!-- Divider -->
            <div class="flex items-center mb-12">
                <div class="flex-1 h-px bg-neutral-700"></div>
                <div class="px-4 text-neutral-500 text-sm">OR</div>
                <div class="flex-1 h-px bg-neutral-700"></div>
            </div>

            <!-- Contact Section -->
            <div class="text-center mb-8">
                <h3 class="text-2xl font-bold text-amber-400 mb-2">Have questions?</h3>
                <p class="text-neutral-300 text-lg">
                    If you have any questions or need assistance, feel free to contact us
                </p>
            </div>

            <form class="space-y-5 bg-neutral-800 p-6 rounded-lg shadow-md" @submit.prevent="onSubmit">
                <div>
                    <label class="block text-sm mb-1 text-neutral-400">Your Name</label>
                    <input type="text" v-model="form.name" placeholder="John Doe"
                        class="w-full px-4 py-2 bg-neutral-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>

                <div>
                    <label class="block text-sm mb-1 text-neutral-400">Your Email</label>
                    <input type="email" v-model="form.email" placeholder="you@example.com"
                        class="w-full px-4 py-2 bg-neutral-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>

                <!-- Contact purpose selector -->
                <div>
                    <label class="block text-sm mb-1 text-neutral-400">Purpose</label>
                    <select v-model="form.purpose"
                        class="w-full px-4 py-2 bg-neutral-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option disabled value="">Select purpose</option>
                        <option v-for="option in purposeOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm mb-1 text-neutral-400">Message</label>
                    <textarea rows="5" v-model="form.message" placeholder="What's on your mind?" :class="[
                        'w-full px-4 py-2 bg-neutral-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500',
                        form.message.trim().length < 10 && form.message.length > 0 ? 'border-red-500 border' : ''
                    ]"></textarea>
                    <div class="text-xs mt-1"
                        :class="form.message.trim().length < 10 ? 'text-red-400' : 'text-neutral-500'">
                        {{ form.message.trim().length }}/10 characters minimum
                    </div>
                </div>

                <button type="submit"
                    class="w-full bg-amber-500 text-neutral-900 font-bold py-2 rounded hover:bg-amber-600 transition">
                    Send
                </button>
            </form>

            <!-- Alternative Get Quote Button -->
            <div class="text-center mt-6">
                <p class="text-neutral-400 mb-3">Or get a custom quote for your website project:</p>
                <button @click="openModal"
                    class="bg-neutral-700 text-amber-400 px-6 py-2 rounded hover:bg-neutral-600 transition-colors font-medium">
                    Get Website Quote
                </button>
            </div>
        </div>

        <!-- Модальное окно с формой заявки -->
        <ProjectRequestModal :is-open="isModalOpen" @close="closeModal" />

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
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ProjectRequestModal from '../components/ProjectRequestModal.vue'
import { useProjectModal } from '../composables/useProjectModal'
import { useSEO } from '../composables/useSEO'
import { getContactUrl } from '../config/api.js'

// Interface for the form state
interface ContactForm {
    name: string
    email: string
    purpose: string
    message: string
}

// Toast state
const toast = ref({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
})

// Options for the purpose selector
const purposeOptions = [
    { value: 'bug-report', label: 'Bug Report' },
    { value: 'improvement', label: 'Improvement Suggestion' },
    { value: 'other', label: 'Other' },
]

// Form state
const form = ref<ContactForm>({
    name: '',
    email: '',
    purpose: '',
    message: ''
})

const { isModalOpen, openModal, closeModal } = useProjectModal()

// SEO configuration for this page
const { updateMetaTags } = useSEO({
    title: 'Contact WebSmith Shop - Get Your Custom Website',
    description: 'Ready to start your website project? Contact WebSmith Shop for professional web development services. Fast, reliable, and transparent pricing.',
    keywords: 'contact web developer, website development contact, web design consultation, custom website quote, Vue.js developer contact',
    ogTitle: 'Contact WebSmith Shop - Get Your Custom Website',
    ogDescription: 'Ready to start your website project? Contact WebSmith Shop for professional web development services. Fast, reliable, and transparent pricing.',
    ogImage: '/src/assets/site-images/hero.png',
    canonical: 'https://websmith-shop.com/contact'
})

// Update SEO on component mount
onMounted(() => {
    updateMetaTags({
        title: 'Contact WebSmith Shop - Get Your Custom Website',
        description: 'Ready to start your website project? Contact WebSmith Shop for professional web development services. Fast, reliable, and transparent pricing.',
        keywords: 'contact web developer, website development contact, web design consultation, custom website quote, Vue.js developer contact',
        ogTitle: 'Contact WebSmith Shop - Get Your Custom Website',
        ogDescription: 'Ready to start your website project? Contact WebSmith Shop for professional web development services. Fast, reliable, and transparent pricing.',
        ogImage: '/src/assets/site-images/hero.png',
        canonical: 'https://websmith-shop.com/contact'
    })
})

function getPurposeLabel(purpose: string): string {
    const labels = {
        'bug-report': 'Bug Report',
        'improvement': 'Improvement Suggestion',
        'other': 'Other'
    }
    return labels[purpose as keyof typeof labels] || purpose
}

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

// Form submit handler
async function onSubmit() {
    // Validate form data
    if (!form.value.name || !form.value.email || !form.value.purpose || !form.value.message) {
        showToast('Please fill in all fields', 'error')
        return
    }

    // Validate message length (minimum 10 characters)
    if (form.value.message.trim().length < 10) {
        showToast('Message must be at least 10 characters long', 'error')
        return
    }

    try {
        console.log('=== CONTACT FORM SUBMISSION START ===')
        console.log('Form data:', {
            name: form.value.name,
            email: form.value.email,
            purpose: form.value.purpose,
            message: form.value.message
        })

        const requestData = {
            name: form.value.name,
            email: form.value.email,
            subject: `Contact Form: ${getPurposeLabel(form.value.purpose)}`,
            message: form.value.message
        }

        console.log('Request data:', requestData)
        console.log('Sending to:', getContactUrl())

        const response = await axios.post(getContactUrl(), requestData)

        console.log('Response status:', response.status)
        console.log('Response data:', response.data)

        if (response.status === 200) {
            console.log('Success! Message sent.')
            showToast('Message sent successfully!', 'success')

            form.value = {
                name: '',
                email: '',
                purpose: '',
                message: '',
            }
        } else {
            console.log('Error in response data')
            showToast('Error sending message. Please try again.', 'error')
        }
    } catch (error) {
        console.error('=== CONTACT FORM ERROR ===')
        console.error('Error type:', error.constructor.name)
        console.error('Error message:', error.message)
        if (error.response) {
            console.error('Response status:', error.response.status)
            console.error('Response data:', error.response.data)
            console.error('Response details:', (error.response.data as any).details)
        }
        console.error('Full error:', error)
        showToast('Error sending message. Please try again.', 'error')
    }
}
</script>