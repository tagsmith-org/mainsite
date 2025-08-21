<template>
    <div class="max-w-2xl mx-auto">
        <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Name -->
            <div>
                <label for="from_name" class="block text-sm font-medium text-neutral-200 mb-2">
                    Name *
                </label>
                <input id="from_name" v-model="formData.name" type="text" required @blur="validateField('name')"
                    @input="clearFieldError('name')" :class="[
                        'w-full px-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors',
                        fieldErrors.name ? 'border-red-500' : 'border-neutral-700'
                    ]" placeholder="Your name" />
                <div v-if="fieldErrors.name" class="mt-1 text-sm text-red-400 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                    {{ fieldErrors.name }}
                </div>
                <div v-else class="mt-1 text-xs text-neutral-500">
                    {{ formData.name.length }}/100 characters
                </div>
            </div>

            <!-- Email -->
            <div>
                <label for="from_email" class="block text-sm font-medium text-neutral-200 mb-2">
                    Email for contact *
                </label>
                <input id="from_email" v-model="formData.email" type="email" required @blur="validateField('email')"
                    @input="clearFieldError('email')" :class="[
                        'w-full px-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors',
                        fieldErrors.email ? 'border-red-500' : 'border-neutral-700'
                    ]" placeholder="your@email.com" />
                <div v-if="fieldErrors.email" class="mt-1 text-sm text-red-400 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                    {{ fieldErrors.email }}
                </div>
            </div>

            <!-- Location -->
            <div>
                <label for="location" class="block text-sm font-medium text-neutral-200 mb-2">
                    Location *
                </label>
                <input id="location" v-model="formData.location" type="text" required @blur="validateField('location')"
                    @input="clearFieldError('location')" :class="[
                        'w-full px-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors',
                        fieldErrors.location ? 'border-red-500' : 'border-neutral-700'
                    ]" placeholder="Your location" />
                <div v-if="fieldErrors.location" class="mt-1 text-sm text-red-400 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                    {{ fieldErrors.location }}
                </div>
                <div v-else class="mt-1 text-xs text-neutral-500">
                    {{ formData.location.length }}/200 characters
                </div>
            </div>

            <!-- Business Description -->
            <div>
                <label for="business" class="block text-sm font-medium text-neutral-200 mb-2">
                    Business Description *
                </label>
                <textarea id="business" v-model="formData.business" required rows="3" @blur="validateField('business')"
                    @input="clearFieldError('business')" :class="[
                        'w-full px-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none transition-colors',
                        fieldErrors.business ? 'border-red-500' : 'border-neutral-700'
                    ]" placeholder="Describe your business in a few sentences"></textarea>
                <div v-if="fieldErrors.business" class="mt-1 text-sm text-red-400 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                    {{ fieldErrors.business }}
                </div>
                <div v-else class="mt-1 text-xs text-neutral-500">
                    {{ formData.business.length }}/1000 characters (min 5)
                </div>
            </div>

            <!-- Website Requirements -->
            <div>
                <label for="requirements" class="block text-sm font-medium text-neutral-200 mb-2">
                    Website Requirements *
                </label>
                <textarea id="requirements" v-model="formData.requirements" required rows="4"
                    @blur="validateField('requirements')" @input="clearFieldError('requirements')" :class="[
                        'w-full px-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none transition-colors',
                        fieldErrors.requirements ? 'border-red-500' : 'border-neutral-700'
                    ]" placeholder="Describe what the website should do, what functions are needed"></textarea>
                <div v-if="fieldErrors.requirements" class="mt-1 text-sm text-red-400 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                    {{ fieldErrors.requirements }}
                </div>
                <div v-else class="mt-1 text-xs text-neutral-500">
                    {{ formData.requirements.length }}/5000 characters (min 5)
                </div>
            </div>

            <!-- Content -->
            <div>
                <label class="block text-sm font-medium text-neutral-200 mb-3">
                    Website Content *
                </label>
                <div class="space-y-3">
                    <label class="flex items-center">
                        <input v-model="formData.contentType" type="radio" value="no-content"
                            @change="clearFieldError('contentType')" class="mr-3 text-amber-500 focus:ring-amber-500" />
                        <span class="text-neutral-300">
                            <strong>Content not important</strong> - use your materials, lower price
                        </span>
                    </label>

                    <label class="flex items-center">
                        <input v-model="formData.contentType" type="radio" value="with-content"
                            @change="clearFieldError('contentType')" class="mr-3 text-amber-500 focus:ring-amber-500" />
                        <span class="text-neutral-300">
                            <strong>Have materials</strong> - will provide texts, photos, images
                        </span>
                    </label>

                    <label class="flex items-center">
                        <input v-model="formData.contentType" type="radio" value="need-content"
                            @change="clearFieldError('contentType')" class="mr-3 text-amber-500 focus:ring-amber-500" />
                        <span class="text-neutral-300">
                            <strong>Need content</strong> - create all materials from scratch, higher price
                        </span>
                    </label>
                </div>
                <div v-if="fieldErrors.contentType" class="mt-2 text-sm text-red-400 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                    {{ fieldErrors.contentType }}
                </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" :disabled="isSubmitting || hasErrors"
                @click="trackButtonClick('submit_project_request')"
                class="w-full bg-amber-500 text-neutral-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="isSubmitting">Sending...</span>
                <span v-else-if="hasErrors">Please fix errors above</span>
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
import { ref, computed } from 'vue'
import { getOrderUrl } from '../config/api.js'
import { useGoogleAnalytics } from '../composables/useGoogleAnalytics'

interface FormData {
    name: string
    location: string
    business: string
    requirements: string
    contentType: string
    email: string
}

interface FieldErrors {
    name?: string
    email?: string
    location?: string
    business?: string
    requirements?: string
    contentType?: string
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

const fieldErrors = ref<FieldErrors>({})
const isSubmitting = ref(false)

// Initialize Google Analytics
const { trackFormSubmission, trackButtonClick } = useGoogleAnalytics()

const emit = defineEmits<{ submitted: [] }>()

// Computed property to check if there are any errors
const hasErrors = computed(() => {
    return Object.keys(fieldErrors.value).length > 0
})

// Validation functions based on Joi schema
function validateField(fieldName: keyof FormData) {
    const value = formData.value[fieldName]

    switch (fieldName) {
        case 'name':
            if (!value) {
                fieldErrors.value.name = 'Name is required'
            } else if (value.length < 2) {
                fieldErrors.value.name = 'Name must be at least 2 characters long'
            } else if (value.length > 100) {
                fieldErrors.value.name = 'Name must be no more than 100 characters'
            } else {
                delete fieldErrors.value.name
            }
            break

        case 'email':
            if (!value) {
                fieldErrors.value.email = 'Email is required'
            } else if (!isValidEmail(value)) {
                fieldErrors.value.email = 'Please enter a valid email address'
            } else {
                delete fieldErrors.value.email
            }
            break

        case 'location':
            if (!value) {
                fieldErrors.value.location = 'Location is required'
            } else if (value.length < 2) {
                fieldErrors.value.location = 'Location must be at least 2 characters long'
            } else if (value.length > 200) {
                fieldErrors.value.location = 'Location must be no more than 200 characters'
            } else {
                delete fieldErrors.value.location
            }
            break

        case 'business':
            if (!value) {
                fieldErrors.value.business = 'Business description is required'
            } else if (value.length < 5) {
                fieldErrors.value.business = 'Business description must be at least 5 characters long'
            } else if (value.length > 1000) {
                fieldErrors.value.business = 'Business description must be no more than 1000 characters'
            } else {
                delete fieldErrors.value.business
            }
            break

        case 'requirements':
            if (!value) {
                fieldErrors.value.requirements = 'Website requirements are required'
            } else if (value.length < 5) {
                fieldErrors.value.requirements = 'Requirements must be at least 5 characters long'
            } else if (value.length > 5000) {
                fieldErrors.value.requirements = 'Requirements must be no more than 5000 characters'
            } else {
                delete fieldErrors.value.requirements
            }
            break

        case 'contentType':
            if (!value) {
                fieldErrors.value.contentType = 'Please select a content type'
            } else {
                delete fieldErrors.value.contentType
            }
            break
    }
}

// Validate all fields
function validateAllFields(): boolean {
    const fields: (keyof FormData)[] = ['name', 'email', 'location', 'business', 'requirements', 'contentType']
    fields.forEach(field => validateField(field))
    return !hasErrors.value
}

// Clear error for specific field
function clearFieldError(fieldName: keyof FormData) {
    delete fieldErrors.value[fieldName]
}

// Email validation helper
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
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

async function submitForm() {
    // Validate all fields before submission
    if (!validateAllFields()) {
        showToast('Please fix the errors in the form', 'error')
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
            // Track successful form submission
            trackFormSubmission('project_request', true)
            
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

            // Clear all errors
            fieldErrors.value = {}
        } else {
            // Track failed form submission
            trackFormSubmission('project_request', false)
            showToast('Error sending request. Please try again.', 'error')
        }

    } catch (error) {
        console.error('TEST: ERROR:', error)
        // Track failed form submission due to error
        trackFormSubmission('project_request', false)
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
