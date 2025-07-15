<template>
    <div class="min-h-screen bg-neutral-900 text-white font-sans">
        <!-- Header -->
        <header class="px-6 py-4 shadow-md bg-neutral-800">
            <nav class="max-w-4xl mx-auto flex justify-between items-center relative">
                <!-- Логотип и заголовок -->
                <div class="flex items-center min-w-0">
                    <img src="/public/2zppeLRyFcf9xxxQmcoxYzwrhWw.svg" class="h-10 w-auto flex-shrink-0" />
                    <h1 class="text-xl font-bold tracking-wide ml-2 truncate">
                        TagSmith
                    </h1>
                </div>

                <!-- Desktop меню -->
                <ul class="hidden md:flex space-x-6 text-sm uppercase">
                    <li>
                        <RouterLink to="/" class="hover:text-amber-400">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/services" class="hover:text-amber-400">Services</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/portfolio" class="hover:text-amber-400">Portfolio</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/contact" class="hover:text-amber-400">Contact</RouterLink>
                    </li>
                </ul>

                <!-- Бургер-иконка (только на мобильных) -->
                <button class="md:hidden flex flex-col justify-center items-center w-10 h-10" @click="isOpen = !isOpen"
                    aria-label="Open menu">
                    <span class="block w-6 h-0.5 bg-white mb-1"></span>
                    <span class="block w-6 h-0.5 bg-white mb-1"></span>
                    <span class="block w-6 h-0.5 bg-white"></span>
                </button>

                <!-- Мобильное меню -->
                <transition name="fade">
                    <ul v-if="isOpen"
                        class="absolute top-full right-0 w-full bg-neutral-900 flex flex-col items-center py-4 space-y-4 z-50 md:hidden shadow-lg">
                        <li>
                            <RouterLink to="/" class="hover:text-amber-400" @click="isOpen = false">Home</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/services" class="hover:text-amber-400" @click="isOpen = false">Services
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/portfolio" class="hover:text-amber-400" @click="isOpen = false">Portfolio
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/contact" class="hover:text-amber-400" @click="isOpen = false">Contact
                            </RouterLink>
                        </li>
                    </ul>
                </transition>
            </nav>
        </header>

        <!-- Main Content -->
        <main class="max-w-4xl mx-auto px-6 py-10">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="text-center text-xs text-neutral-400 py-4 border-t border-neutral-700">
            © 2025 TagSmith. Crafted with Vue & Tailwind.
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>