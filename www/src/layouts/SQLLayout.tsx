import React from "react";
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import SQLTables from "components/SQLTables";

export default function SQLLayout({ children }: React.PropsWithChildren) {
  return (
    <Stack height={1} direction='row'>
      <SQLTables />
      <Box flexGrow={1}>
        {children}
      </Box>
    </Stack>
  )
}