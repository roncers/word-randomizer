import { ref } from 'vue'
import { randomizeString } from '@/utils/functions/randomRelated'

const textCopyText = ref('Text Copied!')

export function useCopyText() {
  const randomizeCopyText = () => {
    textCopyText.value = randomizeString(textCopyText.value)
  }

  return {
    textCopyText,
    randomizeCopyText,
  }
}
