<template>
    <section class="bg-neutral-900 px-4 py-12 text-white sm:px-6 sm:py-16">
        <div class="mx-auto max-w-xl">
            <h1 class="text-center font-display text-3xl font-extrabold text-amber-400 sm:text-4xl">Tell me what you need</h1>
            <p class="mt-4 text-center text-base text-neutral-300">
                A site, a system, an app, or an automation — or you are not sure yet. I usually reply within 24–48
                hours.
            </p>

            <div class="mt-10 rounded-xl border border-amber-500/30 bg-neutral-800 p-5 text-center sm:p-8">
                <h2 class="font-display text-xl font-semibold text-white">Get a project quote</h2>
                <p class="mt-2 text-sm text-neutral-400">Prices start from a floor, then by agreement after we understand
                    the job.</p>
                <button type="button" class="btn-primary mt-6 w-full sm:w-auto" @click="openModal">Get a quote</button>
            </div>

            <div class="my-10 flex items-center gap-4 text-neutral-500">
                <div class="h-px flex-1 bg-neutral-700"></div>
                <span class="text-xs uppercase tracking-wide">or a short message</span>
                <div class="h-px flex-1 bg-neutral-700"></div>
            </div>

            <form class="space-y-5 rounded-xl border border-neutral-700 bg-neutral-800 p-4 sm:p-6" @submit.prevent="onSubmit">
                <div>
                    <label class="mb-1 block text-sm text-neutral-300" for="contact-name">Your name</label>
                    <input id="contact-name" v-model="form.name" type="text" autocomplete="name" required
                        class="w-full rounded-lg bg-neutral-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Your name" />
                </div>
                <div>
                    <label class="mb-1 block text-sm text-neutral-300" for="contact-email">Your email</label>
                    <input id="contact-email" v-model="form.email" type="email" autocomplete="email" required
                        class="w-full rounded-lg bg-neutral-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="you@example.com" />
                </div>
                <div>
                    <label class="mb-1 block text-sm text-neutral-300" for="contact-purpose">What is this about</label>
                    <select id="contact-purpose" v-model="form.purpose" required
                        class="w-full rounded-lg bg-neutral-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option disabled value="">Select one</option>
                        <option v-for="option in contactPurposes" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="mb-1 block text-sm text-neutral-300" for="contact-message">Message</label>
                    <textarea id="contact-message" v-model="form.message" rows="5" required
                        class="w-full rounded-lg bg-neutral-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="What should the result look like?"></textarea>
                    <p class="mt-1 text-xs" :class="form.message.trim().length < 10 ? 'text-red-400' : 'text-neutral-500'">
                        {{ form.message.trim().length }}/10 characters minimum
                    </p>
                </div>
                <button type="submit" class="btn-primary w-full">Send</button>
            </form>
        </div>

        <div v-if="toast.show" :class="toast.type === 'success' ? 'bg-green-700' : 'bg-red-700'"
            class="fixed bottom-4 left-4 right-4 z-50 rounded-lg p-4 text-white sm:bottom-auto sm:left-auto sm:right-4 sm:top-20 sm:max-w-sm">
            <div class="flex items-center">
                <span class="flex-1">{{ toast.message }}</span>
                <button type="button" class="ml-3 inline-flex h-11 w-11 items-center justify-center text-white"
                    @click="hideToast" aria-label="Dismiss">x</button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useProjectModal } from '../composables/useProjectModal'
import { useSEO } from '../composables/useSEO'
import { getContactUrl } from '../config/api.js'
import { contactPurposes } from '../content/offers'

interface ContactForm {
    name: string
    email: string
    purpose: string
    message: string
}

const toast = ref({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error',
})

const form = ref<ContactForm>({
    name: '',
    email: '',
    purpose: '',
    message: '',
})

const { openModal } = useProjectModal()

useSEO({
    title: 'Get a quote — WebSmith',
    description:
        'Tell us what you need: a site, a system, an app, or an automation. Reply within 24–48 hours.',
    ogTitle: 'Get a quote — WebSmith',
    ogDescription:
        'Tell us what you need: a site, a system, an app, or an automation. Reply within 24–48 hours.',
    canonical: 'https://websmith-shop.com/contact',
})

function getPurposeLabel(purpose: string): string {
    return contactPurposes.find((item) => item.value === purpose)?.label || purpose
}

function showToast(message: string, type: 'success' | 'error' = 'success') {
    toast.value = { show: true, message, type }
    setTimeout(() => hideToast(), 5000)
}

function hideToast() {
    toast.value.show = false
}

async function onSubmit() {
    if (!form.value.name || !form.value.email || !form.value.purpose || !form.value.message) {
        showToast('Please fill in all fields', 'error')
        return
    }
    if (form.value.message.trim().length < 10) {
        showToast('Message must be at least 10 characters long', 'error')
        return
    }

    try {
        const response = await axios.post(getContactUrl(), {
            name: form.value.name,
            email: form.value.email,
            subject: `Contact Form: ${getPurposeLabel(form.value.purpose)}`,
            message: form.value.message,
        })
        if (response.status === 200) {
            showToast('Message sent successfully!', 'success')
            form.value = { name: '', email: '', purpose: '', message: '' }
        } else {
            showToast('Error sending message. Please try again.', 'error')
        }
    } catch {
        showToast('Error sending message. Please try again.', 'error')
    }
}
</script>
