import { styled } from "@mui/material/styles"
import TextField, { TextFieldProps } from "@mui/material/TextField"

export default styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .Mui-focused .MuiInputAdornment-root': {
    color: theme.palette.primary.main
  },
  '& .MuiInputBase-input': {
    fontSize: 14,
    transition: theme.transitions.create('width'),
    width: '24ch',
    '&:focus': {
      width: '32ch'
    }
  }
}))