<template>
    <section class="py-20">
        <h2 class="text-3xl font-semibold mb-6 text-center text-amber-400">Contact</h2>
        <form class="space-y-4 bg-neutral-800 p-6 rounded shadow">
            <input type="text" placeholder="Your Name"
                class="w-full px-4 py-2 bg-neutral-900 text-white rounded focus:outline-none" />
            <input type="email" placeholder="Your Email"
                class="w-full px-4 py-2 bg-neutral-900 text-white rounded focus:outline-none" />
            <textarea rows="5" placeholder="Message"
                class="w-full px-4 py-2 bg-neutral-900 text-white rounded focus:outline-none"></textarea>
            <button type="submit"
                class="w-full bg-amber-500 text-neutral-900 font-bold py-2 rounded hover:bg-amber-600 transition">Send</button>
        </form>
    </section>
</template>

<script setup lang="ts">
</script>