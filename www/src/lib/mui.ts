import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      paper: '#f3f4f6'
    }
  },
  components: {
    MuiCircularProgress: {
      defaultProps: {
        size: 24
      }
    }
  }
})