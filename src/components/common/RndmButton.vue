<template>
  <button><slot /></button>
</template>

<style lang="scss" scoped>
button {
  max-width: 20rem;
  background-color: var(--color-tertiary);
  font-size: 2rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  transition: all 0.4s ease-in;
  &:hover {
    background: red;
  }
  &:active {
    background: crimson;
  }
}
</style>
