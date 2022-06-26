import React from "react";
import Stack from '@mui/material/Stack'
import RedisKeys from "./RedisKeys";

export default function RedisLayout({ children }: React.PropsWithChildren) {
  return (
    <Stack height={1} direction='row'>
      <RedisKeys />
      {children}
    </Stack>
  )
}