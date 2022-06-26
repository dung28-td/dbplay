import React, { useCallback, useRef, useState } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Container from "@mui/material/Container"
import List from "@mui/material/List"
import CircularProgress from "@mui/material/CircularProgress"
import InputAdornment from "@mui/material/InputAdornment"
import useQuery from "hooks/useQuery"
import RedisKey from "./RedisKey"
import { ListItem, ListItemText } from "@mui/material"
import { useLocation, useParams } from "react-router-dom"

const containerSx: Sx = {
  px: {
    sm: 2
  },
  pt: 2
}

export default function RedisKeys() {
  const { pathname } = useLocation()
  const { connectionId } = useParams()
  const [input, setInput] = useState('')
  const timer = useRef<NodeJS.Timeout>()
  const { loading, data } = useQuery('REDIS_KEYS', {
    variables: { input }
  })

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setInput(value), 300)
  }, [])

  return (
    <Stack width={320} borderRight={1} borderColor='divider'>
      <Container sx={containerSx}>
        <TextField
          label='Key'
          type='search'
          placeholder="E.g. redis:key"
          defaultValue={input}
          onChange={onInputChange}
          InputProps={{
            endAdornment: loading && (
              <InputAdornment position="end">
                <CircularProgress />
              </InputAdornment>
            )
          }}
        />
      </Container>
      <Box overflow='auto' flexGrow={1}>
        <List dense>
          {!loading && data?.redisKeys.length === 0 && (
            <ListItem>
              <ListItemText secondary='No records found' />
            </ListItem>
          )}
          {data?.redisKeys.map(record => {
            const url = '/connections/' + connectionId + '/keys/' + record.key
            const active =
              pathname === url ||
              pathname.startsWith(url + '/' )

            return (
              <RedisKey
                active={active}
                key={record.key}
                input={input}
                url={url}
                record={record}
              />
            )
          })}
        </List>
      </Box>
    </Stack>
  )
}