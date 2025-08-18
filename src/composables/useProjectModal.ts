import { ref } from 'vue'

const isModalOpen = ref(false)

export function useProjectModal() {
  function openModal() {
    isModalOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
  }

  return {
    isModalOpen,
    openModal,
    closeModal
  }
}
