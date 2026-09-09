<template>
  <section class="min-h-[70vh] bg-neutral-900 px-4 py-12 text-white sm:px-6 sm:py-20">
    <div class="mx-auto max-w-xl">
      <div class="rounded-2xl border border-neutral-700 bg-neutral-800 p-6 shadow-xl sm:p-10">
        <p class="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
          WebSmith
        </p>

        <template v-if="isComplete">
          <h1 class="text-3xl font-bold">You’re unsubscribed</h1>
          <p class="mt-4 text-neutral-300">
            This email address will no longer receive outreach messages from WebSmith.
          </p>
          <p class="mt-2 text-sm text-neutral-400">
            Cette adresse ne recevra plus de messages de prospection de WebSmith.
          </p>
        </template>

        <template v-else>
          <h1 class="text-3xl font-bold">Unsubscribe</h1>
          <p class="mt-4 text-neutral-300">
            Enter the email address that received our message. We’ll add it to our
            suppression list immediately.
          </p>
          <p class="mt-2 text-sm text-neutral-400">
            Entrez l’adresse qui a reçu notre message. Elle sera immédiatement ajoutée
            à notre liste d’exclusion.
          </p>

          <form class="mt-8 space-y-5" @submit.prevent="submitUnsubscribe">
            <div>
              <label for="unsubscribe-email" class="mb-2 block text-sm text-neutral-300">
                Email address / Adresse courriel
              </label>
              <input
                id="unsubscribe-email"
                v-model.trim="email"
                type="email"
                autocomplete="email"
                required
                placeholder="name@example.com"
                class="w-full rounded-lg border border-neutral-600 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
              />
            </div>

            <p
              v-if="errorMessage"
              role="alert"
              class="rounded-lg border border-red-800 bg-red-950/60 px-4 py-3 text-sm text-red-200"
            >
              {{ errorMessage }}
            </p>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full rounded-lg bg-amber-500 px-5 py-3 font-bold text-neutral-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ isSubmitting ? 'Processing…' : 'Unsubscribe / Se désabonner' }}
            </button>
          </form>

          <p class="mt-6 text-xs leading-5 text-neutral-500">
            We keep only the email address needed to prevent future outreach.
          </p>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { getUnsubscribeUrl } from '../config/api.js'

const route = useRoute()
const email = ref('')
const isSubmitting = ref(false)
const isComplete = ref(false)
const errorMessage = ref('')

function setRobotsContent(content: string) {
  let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (!robots) {
    robots = document.createElement('meta')
    robots.name = 'robots'
    document.head.appendChild(robots)
  }
  robots.content = content
}

async function submitUnsubscribe() {
  if (!email.value) return

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    await axios.post(getUnsubscribeUrl(), {
      email: email.value,
    })
    isComplete.value = true
    email.value = ''
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      errorMessage.value = 'Too many attempts. Please try again later.'
    } else {
      errorMessage.value = 'We could not process the request. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  const queryEmail = route.query.email
  if (typeof queryEmail === 'string') {
    email.value = queryEmail
  }
  setRobotsContent('noindex, nofollow')
})

onUnmounted(() => {
  setRobotsContent('index, follow')
})
</script>
