import React from "react";
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import RedisKeys from "components/RedisKeys";

export default function RedisLayout({ children }: React.PropsWithChildren) {
  return (
    <Stack height={1} direction='row'>
      <RedisKeys />
      <Box flexGrow={1}>
        {children}
      </Box>
    </Stack>
  )
}