<template>
  <button :disabled><slot /></button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const disabled = ref<boolean>(true)
onMounted(() => {
  setTimeout(() => {
    disabled.value = false
  }, 2000)
})
</script>

<style lang="scss" scoped>
button {
  max-width: 20rem;
  background-color: var(--color-tertiary);
  font-size: 2rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  transition: all 0.4s ease-in;
  &:hover {
    background: red;
  }
  &:active {
    background: crimson;
  }
  &:disabled {
    background-color: var(--color-quaternary);
    cursor: not-allowed;
  }
}
</style>
