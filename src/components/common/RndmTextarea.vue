<template>
  <textarea id="rndm-textarea" placeholder="Enter a phrase to be randomized" v-model="model" />
</template>

<script setup lang="ts">
const model = defineModel<string>()
</script>
<style lang="scss" scoped>
textarea {
  border: 0.1rem solid black;
  width: 100%;
  height: 150px;
}
</style>
