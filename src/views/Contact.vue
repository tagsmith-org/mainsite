<template>
    <section class="py-20 text-white bg-neutral-900">
        <div class="max-w-xl mx-auto px-6">
            <h2 class="text-3xl font-bold mb-4 text-center text-amber-400">Get in touch</h2>
            <p class="text-neutral-300 text-center mb-10">
                Have a project or idea? Send me a message — I’ll reply personally, usually within 24–48 hours.
            </p>

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
                    <textarea rows="5" v-model="form.message" placeholder="What's on your mind?"
                        class="w-full px-4 py-2 bg-neutral-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea>
                </div>

                <button type="submit"
                    class="w-full bg-amber-500 text-neutral-900 font-bold py-2 rounded hover:bg-amber-600 transition">
                    Send
                </button>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Interface for the form state
interface ContactForm {
    name: string
    email: string
    purpose: string
    message: string
}

// Options for the purpose selector
const purposeOptions = [
    { value: 'site-order', label: 'Заказ сайта' },
    { value: 'bug-report', label: 'Отчет об ошибке' },
    { value: 'improvement', label: 'Предложение по улучшению' },
    { value: 'other', label: 'Другое' },
]

// Reactive form state
const form = ref<ContactForm>({
    name: '',
    email: '',
    purpose: '',
    message: '',
})

const router = useRouter()

// Form submit handler
function onSubmit() {
    if (form.value.purpose === 'site-order') {
        // Redirect to the site order description page with message and contact info
        router.push({
            path: '/site-order',
            query: {
                description: form.value.message,
                contact: form.value.email || form.value.name,
                clientName: form.value.name,
                clientEmail: form.value.email
            }
        })
        return
    }
    // eslint-disable-next-line no-console
    console.log({
        name: form.value.name,
        email: form.value.email,
        purpose: form.value.purpose,
        message: form.value.message,
    })
    // Optionally, reset form or show success message
}
</script>