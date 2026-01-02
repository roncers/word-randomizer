export const getRandomNumberTo = (max: number) => {
  return Math.floor(Math.random() * (max + 1))
}

export const randomizePhrase = (input: string) => {
  const words = input.split(' ')
  const ans = []
  for (let i = words.length - 1; i >= 0; i--) {
    const j = getRandomNumberTo(i)
    ans.push(words[j])
    words.splice(j, 1)
  }
  return ans.join(' ')
}

export const randomizeString = (input: string) => {
  const randomIndex = getRandomNumberTo(input.length - 1)
  const charCode = input.charCodeAt(randomIndex)
  const randomCharNumber = getRandomNumberTo(255)
  const newCharCode = (charCode + randomCharNumber) % 256
  const ans = input.split('')
  ans[randomIndex] = String.fromCharCode(newCharCode)
  return ans.join('')
}
