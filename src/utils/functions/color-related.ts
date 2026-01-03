import { palette1, palette2, type ColorPalette } from '../colors'

type ColorName = keyof Omit<ColorPalette, 'buttonMix'>

const setCssColor = (name: ColorName, [r, g, b]: [number, number, number]): void => {
  document.documentElement.style.setProperty(`--color-${name}-r`, r.toString())
  document.documentElement.style.setProperty(`--color-${name}-g`, g.toString())
  document.documentElement.style.setProperty(`--color-${name}-b`, b.toString())
}

export function backgroundColorShift(): void {
  const newPalette = Math.random() < 0.5 ? palette1 : palette2

  setCssColor('primary', newPalette.primary)
  setCssColor('secondary', newPalette.secondary)
  setCssColor('tertiary', newPalette.tertiary)
  setCssColor('quinary', newPalette.quinary)

  document.documentElement.style.setProperty('--button-mix-color', newPalette.buttonMix)
}
