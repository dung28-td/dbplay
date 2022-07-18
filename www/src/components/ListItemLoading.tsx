import CircularProgress from "@mui/material/CircularProgress";
import ListItem from "@mui/material/ListItem";

const sx: Sx = {
  justifyContent: 'center'
}

export default function ListItemLoading() {
  return (
    <ListItem sx={sx}>
      <CircularProgress />
    </ListItem>
  )
}