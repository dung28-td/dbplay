import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface TypeBackground {
    monokai: string
  }
}

const createMuiTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    background: {
      ...(mode === 'light' && {
        paper: '#f3f4f6',
      }),
      monokai: '#272822'
    }
  },
  components: {
    MuiCircularProgress: {
      defaultProps: {
        size: 24
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    }
  }
})

export const lightTheme = createMuiTheme('light')
export const darkTheme = createMuiTheme('dark')