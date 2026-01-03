export type ColorPalette = {
  primary: [number, number, number]
  secondary: [number, number, number]
  tertiary: [number, number, number]
  quinary: [number, number, number]
  buttonMix: string
}

export const palette1: ColorPalette = {
  primary: [216, 191, 216],
  secondary: [255, 221, 209],
  tertiary: [221, 119, 136],
  quinary: [250, 235, 215],
  buttonMix: 'red',
}

export const palette2: ColorPalette = {
  primary: [220, 130, 189],
  secondary: [233, 200, 150],
  tertiary: [150, 200, 200],
  quinary: [223, 190, 0],
  buttonMix: 'aqua',
}

// Define which palette is the default
export const defaultPalette = palette2
