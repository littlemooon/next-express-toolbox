export interface IColors {
  black: string
  blue: string
  blueDark: string
  blueLight: string
  green: string
  grey: string
  greyBlue: string
  greyBorder: string
  greyDark: string
  greyLight: string
  greyLighter: string
  redDark: string
  redLight: string
  redLighter: string
  white: string
}

export const colors: IColors = {
  black: '#18212e',
  blue: '#449bf7',
  blueDark: '#084a96',
  blueLight: '#20a5ff',
  green: '#13ce66',
  grey: '#777777',
  greyBlue: '#ecf0f9',
  greyBorder: '#b7c0cc',
  greyDark: '#5e6c82',
  greyLight: '#eeeeee',
  greyLighter: '#fafafa',
  redDark: '#df1e3b',
  redLight: '#ff4759',
  redLighter: '#ffdfdf',
  white: '#ffffff',
}

export type Pixels = string

export interface ITheme {
  colors: IColors
  brand: string
  cta: string
  white: string
  black: string
  bg: {
    blue: string
    light: string
    dark: string
    lightBlue: string
    darkBlue: string
    secondary: string
    primary: string
    disabled: string
    disabledLight: string
    red: string
    warning: string
  }
  tx: {
    primary: string
    secondary: string
    accent: string
    accentRed: string
    link: string
    error: string
    success: string
  }
  bd: {
    primary: string
    secondary: string
    dotted: string
    input: string
    inputActive: string
    inputReadonly: string
    step: string
    tab: string
    tabActive: string
    divider: string
    box: string
    boxActive: string
    card: string
    error: string
  }
  bp: {
    mobile: Pixels
    tablet: Pixels
    desktop: Pixels
  }

  h: {
    header: Pixels
  }

  bs: string[]

  mw: {
    form: Pixels
    small: Pixels
    main: Pixels
    wide: Pixels
  }
  space: number[]
  fontSizes: number[]
  breakpoints: string[]
  fontFamily: string
}

const breakpoints = {
  mobile: '479px',
  tablet: '959px',
  desktop: '1170px',
}

const theme: ITheme = {
  colors,
  brand: colors.blue,
  cta: colors.green,
  white: colors.white,
  black: colors.black,

  // background
  bg: {
    blue: '#00BBD5',
    lightBlue: colors.greyBlue,
    darkBlue: colors.blueDark,
    secondary: colors.blue,
    disabled: colors.greyDark,
    disabledLight: colors.greyLight,
    red: colors.redLight,
    light: colors.greyLighter,
    dark: colors.greyDark,
    primary: colors.blue,
    warning: colors.redLighter,
  },

  // text
  tx: {
    primary: colors.black,
    secondary: colors.greyDark,
    accent: colors.blueDark,
    accentRed: colors.redLight,
    link: colors.blueLight,
    error: colors.redLight,
    success: colors.green,
  },

  // borders
  bd: {
    primary: `1px solid ${colors.greyBorder}`,
    secondary: `1px solid ${colors.greyBlue}`,
    dotted: '2px dotted rgba(0, 0, 0, 0.08)',
    input: `1px solid ${colors.greyBlue}`,
    inputActive: `1px solid ${colors.blue}`,
    inputReadonly: `apx dotted ${colors.greyDark}`,
    step: `1px solid ${colors.greyBlue}`,
    tab: `1px solid ${colors.greyBorder}`,
    tabActive: `1px solid ${colors.green}`,
    divider: `2px solid ${colors.greyBlue}`,
    box: `1px solid ${colors.greyBorder}`,
    boxActive: `1px solid ${colors.green}`,
    card: `1px solid ${colors.greyBorder}`,
    error: `1px solid ${colors.redDark}`,
  },

  // breakpoints
  bp: breakpoints,

  // height
  h: {
    header: '60px',
  },

  // max-width
  mw: {
    form: '400px',
    small: '460px',
    main: '736px',
    wide: '1170px',
  },

  // box-shadow
  bs: [
    '0',
    '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    '0px 4px 20px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
  ],

  // styled-system

  //      0  1  2  3   4   5   6   7    8    9
  space: [0, 4, 8, 16, 24, 32, 64, 128, 256, 512],
  //          0   1   2   3   4   5   6   7   8
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  breakpoints: Object.values(breakpoints),
  fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
}

export default theme

export const themed = (key: keyof ITheme) => (props: { theme: ITheme }) => {
  return props.theme[key]
}
