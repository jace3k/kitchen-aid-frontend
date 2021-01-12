import { blue, orange, deepOrange, red } from '@material-ui/core/colors/'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'

/* eslint-disable */
declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    neutral: Palette['primary'];
    inverse: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    inverse: PaletteOptions['primary'];
  }
}


// set palette colors here
const primaryDarkColor = orange
const secondaryDarkColor = deepOrange

const primaryLightColor = blue
const secondaryLightColor = red

export const getPalette = (isDarkMode: boolean) : PaletteOptions => ({
  type: isDarkMode ? "dark": "light",
  primary: isDarkMode ? primaryDarkColor : primaryLightColor,
  secondary: isDarkMode ? secondaryDarkColor : secondaryLightColor,
  neutral: {
    main: isDarkMode ? '#373737' : '#eeeeee'
  },
  inverse: {
    main: isDarkMode ? '#eeeeee' : '#424242'
  }
})