import { blue, orange, deepOrange, red } from '@mui/material/colors'
import { PaletteOptions } from '@mui/material/styles/createPalette'

// set palette colors here
const primaryDarkColor = orange
const secondaryDarkColor = deepOrange

const primaryLightColor = blue
const secondaryLightColor = red

export const getPalette = (isDarkMode: boolean): PaletteOptions => ({
  mode: isDarkMode ? "dark" : "light",
  primary: isDarkMode ? primaryDarkColor : primaryLightColor,
  secondary: isDarkMode ? secondaryDarkColor : secondaryLightColor,
})