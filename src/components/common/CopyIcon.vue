<template>
  <div class="copy-icon">
    <div
      v-html="copyIcon"
      class="copy-icon__wrapper"
      :class="{ copied: isCopied }"
      aria-label="Copy output to clipboard"
      role="button"
    ></div>
    <transition name="fade">
      <span ref="textRef" class="copy-icon__text" v-show="props.isCopied">{{ textCopyText }}</span>
    </transition>
  </div>
</template>

<script setup lang="ts">
import copyIcon from '@/assets/img/icons/copy-icon.svg?raw'
import { useCopyText } from '@/composable/copy-text-value'
import { watch, ref, nextTick } from 'vue'

const props = defineProps<{
  isCopied: boolean
  outputWidth: number
}>()

const { textCopyText, randomizeCopyText } = useCopyText()
const firstTime = ref<boolean>(true)
const textRef = ref<HTMLElement | null>(null)
const textWidth = ref<number>(0)

watch(
  () => props.isCopied,
  async (newVal) => {
    if (firstTime.value) {
      firstTime.value = false
      await nextTick()
      if (textRef.value) {
        textWidth.value = textRef.value.offsetWidth
      }
      return
    }
    if (newVal) {
      randomizeCopyText()
      await nextTick()
      if (textRef.value) {
        textWidth.value = textRef.value.offsetWidth
      }
    }
  },
)
</script>

<style scoped lang="scss">
.copy-icon {
  position: relative;
  width: 2.4rem;
  height: 2.4rem;

  &__text {
    position: absolute;
    left: v-bind('`calc(-${props.outputWidth}px - ${textWidth}px - 2rem - 1rem)`');
    @include respond(phone) {
      left: auto;
      right: v-bind('`calc( -${textWidth}px - 1rem)`');
    }
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    font-size: 1.4rem;
    color: rgba(var(--color-contrast-rgb), 0.6);
  }

  &__wrapper {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 0.8rem;
    transition: all 0.3s ease;
    @media (hover: hover) {
      &:hover {
        background-color: color-mix(in srgb, transparent 20%, var(--color-contrast) 10%);
        color: color-mix(in srgb, var(--color-tertiary) 70%, var(--color-contrast) 10%);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
