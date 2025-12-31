<template>
  <h1 class="header">{{ outputTitle }}</h1>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

const props = defineProps<{
  title: string
}>()

const titleReverted = props.title.split('').reverse().join('')

const outputTitle = ref<string>(props.title)
const randomizeElems = (): void => {
  const reversion = Math.random() < 0.5
  outputTitle.value = reversion ? titleReverted : props.title
}
defineExpose({ randomizeElems })

// EXPERIMENTAL
let tl: gsap.core.Timeline
let split: SplitText

onMounted(() => {
  console.log(gsap)
  gsap.registerPlugin(SplitText)

  tl = gsap.timeline({ repeat: -1 })
  split = SplitText.create('.header', { type: 'chars' })
  const chars = split.chars

  tl.set(chars, { color: 'var(--color-contrast)' }, 2)
  console.log(tl)

  tl.from(chars, {
    opacity: 0,
    duration: 0.1,
    stagger: 0.1,
  })

  tl.to(chars, {
    duration: 0.5,
    opacity: 0,
    stagger: 0.05,
    ease: 'power4.inOut',
  })
})

onUnmounted(() => {
  if (tl) tl.kill()
  if (split) split.revert()
})
</script>
<style lang="scss" scoped>
.header {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 200;
  pointer-events: none;
  color: var(--color-contrast);
  letter-spacing: 0.2rem;
  word-spacing: 0.5rem;
  // PROPERTIES TO ALTER ON CHANGE
  text-align: left;
  text-transform: none;
  transition: all 0.5s ease-in-out;
}
</style>
