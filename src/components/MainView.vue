<template>
  <rndm-header ref="header">Randomize any phrase</rndm-header>
  <section class="main-container">
    <rndm-textarea @keyup.enter="randomizeOutput(input)" ref="textarea" v-model="input" />
    <rndm-button @click="randomizeOutput(input)">Randomize text</rndm-button>
  </section>

  <section v-if="output">
    <h2>Output</h2>
    <rndm-p>{{ output }}</rndm-p>
    <rndm-button @click="console.log('coopy')">Copy output</rndm-button>
  </section>
</template>

<script setup lang="ts">
import RndmTextarea from './common/RndmTextarea.vue'
import RndmHeader from './common/RndmHeader.vue'
import RndmButton from './common/RndmButton.vue'
import RndmP from './common/RndmP.vue'
import { ref } from 'vue'
import { randomizePhrase } from '../utils/functions/randomRelated'

const input = ref<string>('')
const output = ref<string>('')

const randomizeOutput = (phrase: string) => {
  randomizeElems()
  output.value = randomizePhrase(phrase)
}

const header = ref<InstanceType<typeof RndmHeader> | null>(null)
const textarea = ref<InstanceType<typeof RndmTextarea> | null>(null)
const elems = [header, textarea]
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
  gap: 3rem;
}
</style>
