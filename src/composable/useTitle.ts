import { ref, watch } from 'vue'
import { randomizeString } from '@/utils/functions/randomRelated'

export type UseTitleReturn = {
  randomizeElems: () => void
}

const title = ref<string>('Text Randomizer')

watch(title, (newTitle) => {
  document.title = newTitle
})

export function useTitle(): UseTitleReturn {
  const randomizeElems = () => {
    title.value = randomizeString(title.value)
  }

  return {
    randomizeElems,
  }
}
