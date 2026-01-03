<template>
  <transition name="fade">
    <section v-if="output" class="output">
      <section class="output__header">
        <h2 ref="outputTitleRef">{{ plainOutputText }}</h2>
        <copy-icon
          @click="copyToClipboard"
          :is-copied="isCopied"
          :class="{ copied: isCopied }"
          :output-width="outputTitleWidth"
        />
      </section>

      <section class="output__box">
        <rndm-p>{{ output }}</rndm-p>
      </section>
    </section>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import RndmP from './common/RndmP.vue'
import CopyIcon from './common/CopyIcon.vue'
import { randomizeString } from '@/utils/functions/random-related'

const props = defineProps<{
  output: string
}>()

const plainOutputText = ref<string>('Output')
const outputTitleRef = ref<HTMLElement | null>(null)
const outputTitleWidth = ref(0)

watch(
  () => props.output,
  async (_, prevVal) => {
    if (prevVal) {
      plainOutputText.value = randomizeString(plainOutputText.value)
    }
    // output width handling for the copy animation
    await nextTick()
    if (outputTitleRef.value) {
      outputTitleWidth.value = outputTitleRef.value.offsetWidth
    }
  },
  { immediate: true },
)

const isCopied = ref(false)

const copyToClipboard = () => {
  if (isCopied.value) return

  navigator.clipboard
    .writeText(props.output)
    .then(() => {
      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 1500)
    })
    .catch((err) => {
      console.error('Failed to copy: ', err)
    })
}
</script>

<style lang="scss" scoped>
.output {
  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: var(--output-aligning);
    gap: 1rem;
    margin-bottom: 3rem;

    .copied {
      color: rgba(var(--color-contrast-rgb), 0.3);
    }
  }
  &__box {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.164),
      rgba(var(--color-quinary-rgb), 0.75)
    );
    transition:
      --color-quinary-rgb 3s ease-in,
      --color-quinary 3s ease-in;
    width: var(--box-width);
    max-width: 100%;
    max-height: 20rem;
    border-radius: 0.8rem;
    padding: 1.2rem;
    border: 1px solid color-mix(in srgb, var(--color-quinary), var(--color-contrast) 20%);
    overflow: auto;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.5);
}
</style>
