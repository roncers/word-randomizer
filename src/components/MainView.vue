<template>
  <rndm-header ref="header">Randomize any phrase</rndm-header>
  <section class="content">
    <section class="main-container">
      <rndm-textarea ref="textarea" v-model="input" />
      <rndm-button ref="button" @click="randomizeOutput(input)">Randomize text</rndm-button>
    </section>
    <output-handler :output="output" />
  </section>
</template>

<script setup lang="ts">
import RndmTextarea from './common/RndmTextarea.vue'
import RndmHeader from './common/RndmHeader.vue'
import RndmButton from './common/RndmButton.vue'
import OutputHandler from './OutputHandler.vue'
import { ref, nextTick } from 'vue'
import { randomizePhrase } from '../utils/functions/randomRelated'
import { useTitle, type UseTitleReturn } from '@/composable/useTitle'

const input = ref<string>('')
const output = ref<string>('')

const randomizeOutput = async (phrase: string) => {
  randomizeElems()
  output.value = ''
  setTimeout(async () => {
    await nextTick()
    output.value = randomizePhrase(phrase)
  }, 1100)
}

const header = ref<InstanceType<typeof RndmHeader> | null>(null)
const textarea = ref<InstanceType<typeof RndmTextarea> | null>(null)
const button = ref<InstanceType<typeof RndmButton> | null>(null)
const pageTitle = ref<UseTitleReturn>(useTitle())
const elems = [header, textarea, button, pageTitle]
const randomizeElems = (): void => {
  for (const elem of elems) {
    elem.value?.randomizeElems()
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: var(--item-aligning);
  gap: 3rem;
  margin-bottom: 3rem;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: var(--item-aligning);
  transition: all 1.1s ease;
}
</style>
