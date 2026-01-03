<template>
  <textarea
    class="textarea"
    :class="{
      'textarea--animated': animateTextarea,
      'textarea--fade-in': isFadingIn,
    }"
    id="rndm-textarea"
    :placeholder
    spellcheck="false"
    v-model="model"
    @keydown.enter.prevent
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { randomizePhrase } from '@/utils/functions/random-related'
const model = defineModel<string>()
const animateTextarea = ref<boolean>(false)
const isFadingIn = ref<boolean>(true)

onMounted(() => {
  setTimeout(() => {
    isFadingIn.value = false
  }, 2000)
})
const placeholder = ref<string>('Enter a phrase to be randomized')

const randomizeElems = async (): Promise<void> => {
  animateTextarea.value = false
  // Small delay to ensure the browser registers the class removal
  setTimeout(() => {
    animateTextarea.value = true
  }, 10)
  setTimeout(() => {
    placeholder.value = randomizePhrase(placeholder.value)
    animateTextarea.value = false
  }, 2000)
}
defineExpose({ randomizeElems })
</script>
<style lang="scss" scoped>
.textarea {
  min-height: 4.5rem;
  min-width: 10rem;
  max-width: 100%;
  width: min(var(--box-width), 100%);
  height: 15rem;
  border-radius: 0.8rem;
  padding: 1.2rem;
  resize: none;
  border: 2px solid color-mix(in srgb, var(--color-primary), var(--color-contrast) 7%);

  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(var(--color-quaternary-rgb), 0.5)
  );
  background-repeat: repeat;
  background-size: 200px;
  background-position: center;
  /* Mixing var(--color-primary) with 20% black */
  background-color: var(--color-primary);
  transition:
    --color-quaternary-rgb 3s ease-in,
    --color-primary 3s ease-in;

  &::placeholder {
    color: rgba(var(--color-contrast-rgb), 0.4);
  }

  &::-webkit-resizer {
    background-color: transparent;
    background: linear-gradient(125deg, transparent 0% 50%, #c9356c 50% 100%);
    border-bottom-right-radius: 0.8rem;
    border-right: 1px solid #c9356c;
    border-bottom: 1px solid #c9356c;
    background-repeat: no-repeat;
    background-position: bottom right;
  }

  &--animated {
    animation: wiggle 2s $bouncing-animation;
  }
  &--fade-in {
    @include fade-in(-70rem);
    animation: fade-in 2s ease-in-out;
  }
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  // 25% {
  //   transform: rotate(10deg) translateX(20rem);
  // }
  50% {
    transform: translateX(100vw);
  }
  // 75% {
  //   transform: translateX(-2rem) translateX(20rem);
  // }
  100% {
    transform: rotate(0deg);
  }
}
</style>
