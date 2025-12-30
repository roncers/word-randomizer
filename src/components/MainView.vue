<template>
  <rndm-header>Randomize Phrase</rndm-header>
  <rndm-textarea v-model="input" />
  <rndm-button @click="randomizeOutput(input)">Randomize</rndm-button>
  <rndm-p>{{ output }}</rndm-p>
  <rndm-p>Input words: {{ input.split(' ').length }}</rndm-p>
  <rndm-p>Output words: {{ output.split(' ').length }}</rndm-p>
</template>

<script setup lang="ts">
import RndmTextarea from './common/RndmTextarea.vue'
import RndmHeader from './common/RndmHeader.vue'
import RndmButton from './common/RndmButton.vue'
import RndmP from './common/RndmP.vue'
import { ref } from 'vue'
import { randomizePhrase } from '../utils/functions/randomRelated'

const randomizeOutput = (phrase: string) => {
  output.value = randomizePhrase(phrase)
}

const input = ref<string>('')
const output = ref<string>('')
</script>
