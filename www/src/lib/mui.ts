import { createTheme } from "@mui/material/styles";
import type {} from '@mui/x-data-grid/themeAugmentation'

declare module '@mui/material/styles' {
  interface TypeBackground {
    monokai: string
  }
}

const dataGridGetRowId = (row: any) => row.id || JSON.stringify(row)

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
    MuiDataGrid: {
      defaultProps: {
        checkboxSelection: true,
        disableSelectionOnClick: true,
        density: 'compact',
        paginationMode: 'server',
        getRowId: dataGridGetRowId
      }
    },
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