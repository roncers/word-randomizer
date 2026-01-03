<template>
  <button
    class="button"
    :class="{ 'button--fading-in': isFadingIn, 'button--animating': animateButton }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const disabled = ref<boolean>(true)
const isFadingIn = ref<boolean>(true)
const animateButton = ref<boolean>(false)
onMounted(() => {
  setTimeout(() => {
    disabled.value = false
    isFadingIn.value = false
  }, 2000)
})
const randomizeElems = async (): Promise<void> => {
  disabled.value = true
  animateButton.value = true
  setTimeout(() => {
    animateButton.value = false
    disabled.value = false
  }, 2000)
}
defineExpose({ randomizeElems })
</script>

<style lang="scss" scoped>
.button {
  max-width: 20rem;
  background-color: var(--color-tertiary);
  font-size: 2rem;
  padding: 0.5rem;
  transition: all 0.4s ease-in;
  @media (hover: hover) {
    &:hover {
      background: red;
    }
  }
  &:active {
    background: crimson;
  }
  &:disabled {
    background-color: color-mix(in srgb, var(--color-tertiary) 50%, var(--color-contrast) 18%);
    cursor: default;
  }
  &--fading-in {
    @include fade-in(0, 200rem);
    animation: fade-in 2s ease-in-out;
  }
  &--animating {
    animation: go-crazy 2s $spring-easing;
  }
}
@keyframes go-crazy {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(370deg) scale(0.4);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}
</style>
