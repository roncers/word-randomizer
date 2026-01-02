<template>
  <h1 class="header" :class="headerStyle"><slot /></h1>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { getRandomNumberTo } from '@/utils/functions/randomRelated'

const SHIFT = 50

let split: SplitText

const TEXT_TRANSFORM_VALUES = [0, 1, 2] as const
type TextTransformIndex = (typeof TEXT_TRANSFORM_VALUES)[number]
const textTransformIndex = ref<TextTransformIndex>(0)

const TEXT_ALIGN_VALUES = [0, 1, 2] as const
type TextAlignIndex = (typeof TEXT_ALIGN_VALUES)[number]
const textAlignIndex = ref<TextAlignIndex>(0)
const isReverted = ref<boolean>(false)

function getRandomValue<T>(arr: readonly T[]): T {
  return arr[getRandomNumberTo(arr.length - 1)] as T
}

const randomizeElems = async (): Promise<void> => {
  await exitCharAnimation(SHIFT, 'end')
  const reversion = getRandomNumberTo(1) === 1
  isReverted.value = reversion
  textTransformIndex.value = getRandomValue(TEXT_TRANSFORM_VALUES)
  textAlignIndex.value = getRandomValue(TEXT_ALIGN_VALUES)

  await nextTick()
  enterCharAnimation(reversion ? -SHIFT : SHIFT, 'start')
}

const headerStyle = computed(() => {
  const classes: string[] = []
  if (isReverted.value) classes.push('header--reverted')

  switch (textTransformIndex.value) {
    case 1:
      classes.push('header--uppercase')
      break
    case 2:
      classes.push('header--lowercase')
      break
  }
  switch (textAlignIndex.value) {
    case 1:
      classes.push('header--centered')
      break
    case 2:
      classes.push('header--right')
      break
  }
  return classes
})
defineExpose({ randomizeElems })

onMounted(() => {
  gsap.registerPlugin(SplitText)

  enterCharAnimation(SHIFT, 'start')
})

const getRandomAnimationEase = (): string | undefined => {
  const eases = ['back.out(1.7)', 'steps(20)']
  const randomIndex = getRandomNumberTo(eases.length - 1)
  return eases[randomIndex]
}

function enterCharAnimation(x: number, from: gsap.utils.DistributeConfig['from']): void {
  split = SplitText.create('.header', { type: 'chars' })

  gsap.from(split.chars, {
    x: x,
    opacity: 0,
    stagger: {
      amount: 1,
      from: from,
      ease: getRandomAnimationEase(),
    },
  })
}

function exitCharAnimation(x: number, from: gsap.utils.DistributeConfig['from']): Promise<void> {
  return new Promise((resolve) => {
    gsap.to(split.chars, {
      x: x,
      opacity: 0,
      stagger: {
        amount: 0.5,
        from: from,
        ease: getRandomAnimationEase(),
      },
      onComplete: () => {
        resolve()
      },
    })
  })
}

onUnmounted(() => {
  if (split) split.revert()
})
</script>
<style lang="scss" scoped>
.header {
  font-size: var(--header-font-size);
  margin-bottom: 3rem;
  font-weight: 200;
  pointer-events: none;
  color: var(--color-contrast);
  letter-spacing: 0.2rem;
  word-spacing: 0.5rem;
  text-align: var(--item-aligning);

  &--reverted {
    unicode-bidi: bidi-override;
    direction: rtl;
  }
  &--uppercase {
    text-transform: uppercase;
  }
  &--lowercase {
    text-transform: lowercase;
  }
  &--centered {
    text-align: center;
  }
  &--right {
    text-align: right;
  }
}
</style>
