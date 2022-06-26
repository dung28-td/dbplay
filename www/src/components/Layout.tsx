import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import { Outlet, Link } from "react-router-dom";
import Connections from "./Connections";

const drawerSx: Sx = {
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box'
  }
}

const navToolbarSx: Sx = {
  px: {
    sm: 2
  }
}

export default function Layout() {
  return (
    <Stack
      direction='row'
      height='100vh'
    >
      <Drawer
        variant="permanent"
        sx={drawerSx}
      >
        <Toolbar sx={navToolbarSx}>
          <MuiLink
            variant="h6"
            underline="none"
            component={Link}
            to='/'
          >
            DBPlay
          </MuiLink>
        </Toolbar>
        <Connections />
      </Drawer>
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Stack>
  )
}