<template>
  <svg
    class="h-6 w-6 text-amber-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.75"
    aria-hidden="true"
  >
    <path
      v-if="name === 'site'"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3.75 6.75A2.25 2.25 0 016 4.5h12A2.25 2.25 0 0120.25 6.75v10.5A2.25 2.25 0 0118 19.5H6a2.25 2.25 0 01-2.25-2.25V6.75zM3.75 9h16.5"
    />
    <path
      v-else-if="name === 'system'"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6.75 7.5h10.5M6.75 12h10.5M6.75 16.5h6M4.5 5.25A1.75 1.75 0 016.25 3.5h11.5A1.75 1.75 0 0119.5 5.25v13.5A1.75 1.75 0 0117.75 20.5H6.25A1.75 1.75 0 014.5 18.75V5.25z"
    />
    <path
      v-else-if="name === 'mobile'"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M8.25 3.75h7.5A1.5 1.5 0 0117.25 5.25v13.5a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5zM10.5 18h3"
    />
    <path
      v-else-if="name === 'backend'"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M4.5 7.5h15M4.5 12h15M4.5 16.5h15M7 7.5v9M4.5 5.25A1.75 1.75 0 016.25 3.5h11.5A1.75 1.75 0 0119.5 5.25v13.5A1.75 1.75 0 0117.75 20.5H6.25A1.75 1.75 0 014.5 18.75V5.25z"
    />
    <path
      v-else
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M7.5 8.25h.008v.008H7.5V8.25zm0 7.5h.008v.008H7.5v-.008zm9-7.5h.008v.008H16.5V8.25zm0 7.5h.008v.008H16.5v-.008zM8.25 8.25h7.5M8.25 15.75h7.5M7.5 8.625v6.75M16.5 8.625v6.75"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  name: 'site' | 'system' | 'mobile' | 'backend' | 'automation'
}>()
</script>
