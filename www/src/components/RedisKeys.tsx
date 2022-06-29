import React, { useCallback, useRef, useState } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import CircularProgress from "@mui/material/CircularProgress"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import useQuery from "hooks/useQuery"
import RedisKey from "./RedisKey"
import { Link, useLocation, useParams } from "react-router-dom"
import Add from "icons/Add"

const toolbarSx: Sx = {
  px: {
    sm: 2
  }
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
      <AppBar position="relative" color='transparent' elevation={0}>
        <Toolbar sx={toolbarSx}>
          <TextField
            size='small'
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
          <Box ml={1}>
            <IconButton
              edge='end'
              component={Link}
              to={`/connections/${connectionId}/records/new`}
            >
              <Add />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box overflow='auto' flexGrow={1}>
        <List dense>
          {!loading && data?.redisKeys.length === 0 && (
            <ListItem>
              <ListItemText secondary='No records found' />
            </ListItem>
          )}
          {data?.redisKeys.map(record => {
            const url = '/connections/' + connectionId + '/records/' + record.key
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