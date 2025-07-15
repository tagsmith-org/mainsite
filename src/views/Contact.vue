<template>
    <section class="py-20 text-white bg-neutral-900">
        <div class="max-w-xl mx-auto px-6">
            <h2 class="text-3xl font-bold mb-4 text-center text-amber-400">Get in touch</h2>
            <p class="text-neutral-300 text-center mb-10">
                Have a project or idea? Send me a message — I’ll reply personally, usually within 24–48 hours.
            </p>

            <form class="space-y-5 bg-neutral-800 p-6 rounded-lg shadow-md">
                <div>
                    <label class="block text-sm mb-1 text-neutral-400">Your Name</label>
                    <input type="text" placeholder="John Doe"
                        class="w-full px-4 py-2 bg-neutral-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>

                <div>
                    <label class="block text-sm mb-1 text-neutral-400">Your Email</label>
                    <input type="email" placeholder="you@example.com"
                        class="w-full px-4 py-2 bg-neutral-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>

                <div>
                    <label class="block text-sm mb-1 text-neutral-400">Message</label>
                    <textarea rows="5" placeholder="What's on your mind?"
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
</script>