import {
  Theme as MuiTheme,
  ThemeOptions as MuiThemeOptions,
} from '@mui/material'
declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {
    customShadows: any
  }
  // allow configuration using `createTheme`
  interface ThemeOptions extends MuiThemeOptions {
    customShadows?: object
  }
}

declare module 'jsrsasign-util' {
  const rsu: any
  export = rsu
}
