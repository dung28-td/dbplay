import React from "react";
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

export default function SQLLayout({ children }: React.PropsWithChildren) {
  return (
    <Stack height={1} direction='row'>
      <Box flexGrow={1}>
        {children}
      </Box>
    </Stack>
  )
}