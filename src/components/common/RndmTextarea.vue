<template>
  <textarea id="rndm-textarea" placeholder="Enter a phrase to be randomized" v-model="model" />
</template>

<script setup lang="ts">
const model = defineModel<string>()
</script>
<style lang="scss" scoped>
textarea {
  min-height: 4.5rem;
  min-width: 10rem;
  max-width: 100%;
  width: 60rem;
  height: 15rem;
  border-radius: 0.8rem;
  padding: 1.2rem;

  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(var(--color-quaternary-rgb), 0.5)
  );
  background-repeat: repeat;
  background-size: 200px;
  background-position: center;
  background-color: var(--color-primary);

  &::placeholder {
    color: rgba(var(--color-contrast-rgb), 0.5);
  }

  &::-webkit-resizer {
    background-color: transparent;
    background-image: linear-gradient(
      135deg,
      transparent 0% 70%,
      var(--color-contrast) 70% 75%,
      transparent 75% 80%,
      var(--color-contrast) 80% 85%,
      transparent 85% 100%
    );
  }
}
</style>
