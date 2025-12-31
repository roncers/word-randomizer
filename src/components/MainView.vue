<template>
  <rndm-header title="Randomize any phrase" ref="header" />
  <rndm-textarea v-model="input" />
  <rndm-button @click="randomizeOutput(input)">Randomize text</rndm-button>
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
const randomizeElems = (): void => {
  header.value?.randomizeElems()
}
</script>
