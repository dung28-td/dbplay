import React, { useCallback, useReducer, useRef } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import useQuery from "hooks/useQuery"
import RedisKey from "./RedisKey"
import { Link, useLocation, useParams } from "react-router-dom"
import Add from "icons/Add"
import useMutation from "hooks/useMutation"
import Trash from "icons/Trash"
import { confirm } from "modals/ConfirmModal"
import ListSelection, { RenderItemProps } from "./ListSelection"
import { emptyArray } from "utils/array"
import InfiniteList from "./InfiniteList"

const toolbarSx: Sx = {
  px: {
    sm: 2
  }
}

export default function RedisKeys() {
  const { pathname } = useLocation()
  const { connectionId } = useParams()
  const [input, setInput] = useReducer((_state: string, input: string) => input, '')
  const [indexes, setIndexes] = useReducer((_state: number[], indexes: number[]) => indexes, [])
  const { loading, data, fetchMore } = useQuery('REDIS_KEYS', {
    notifyOnNetworkStatusChange: true,
    variables: {
      pattern: input,
      count: 250
    }
  })

  const renderItem = useCallback(({ item, selected, onSelect }: RenderItemProps<RedisRecordKey>) => {
    const url = '/connections/' + connectionId + '/records/' + item.key

    return (
      <RedisKey
        key={item.key}
        input={input}
        url={url}
        record={item}
        selected={selected}
        onSelect={onSelect}
      />
    )
  }, [connectionId, input])

  const initializer = useCallback((items: RedisRecordKey[]) => {
    const idx = items.findIndex(({ key }) => {
      const url = `/connections/${connectionId}/records/${key}`
      return pathname === url || pathname.startsWith(url + '/')
    })

    return idx > -1 ? [idx] : []
  }, [pathname, connectionId])

  return (
    <Stack width={320} borderRight={1} borderColor='divider'>
      <AppBar
        position="relative"
        color={indexes.length > 1 ? undefined : 'transparent'}
        elevation={0}
      >
        {indexes.length > 1 ? (
          <SelectionToolbar
            selectedRecords={data?.redisKeys.keys.filter((_, i) => indexes.includes(i)) || emptyArray}
          />
        ) : (
          <DefaultToolbar
            loading={loading}
            input={input}
            setInput={setInput}
          />
        )}
      </AppBar>
      <Box overflow='auto' flexGrow={1}>
        <ListSelection
          items={data?.redisKeys.keys}
          renderItem={renderItem}
          EmptyState={EmptyState}
          initializer={initializer}
          onChange={setIndexes}
          ListComponent={InfiniteList}
          ListProps={{
            dense: true,
            loading,
            loadMore: data?.redisKeys.cursor === 0
              ? undefined
              : () => fetchMore({ variables: { cursor: data?.redisKeys.cursor } })
          }}
        />
      </Box>
    </Stack>
  )
}

interface DefaultToolbarProps {
  loading: boolean
  input: string
  setInput: (input: string)  => void
}

function DefaultToolbar({ loading, input, setInput }: DefaultToolbarProps) {
  const { connectionId } = useParams()
  const timer = useRef<NodeJS.Timeout>()

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setInput(value), 300)
  }, [setInput])

  return (
    <Toolbar sx={toolbarSx}>
      <TextField
        size='small'
        label='Key'
        type='search'
        placeholder="E.g. redis:key"
        defaultValue={input}
        onChange={onInputChange}
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
  )
}

interface SelectionToolbarProps {
  selectedRecords: RedisRecordKey[]
}

function SelectionToolbar({ selectedRecords }: SelectionToolbarProps) {
  const [deleteRedisRecords, { loading }] = useMutation('DELETE_REDIS_RECORDS', {
    variables: {
      keys: selectedRecords.map(r => r.key)
    },
    update(cache) {
      for (const record of selectedRecords) {
        cache.evict({
          id: cache.identify(record)
        })
      }
    }
  })

  return (
    <Toolbar sx={toolbarSx}>
      <Box flexGrow={1}>
        <Typography>
          {selectedRecords.length} selected
        </Typography>
      </Box>
      <IconButton
        disabled={loading}
        color='inherit'
        edge='end'
        onClick={async () => {
          if (!await confirm({
            title: 'Chottomatte...',
            desc: `You are deleting ${selectedRecords.length} items. This action cannot be undone. Are you sure?`
          })) return
          deleteRedisRecords()
        }}
      >
        <Trash />
      </IconButton>
    </Toolbar>
  )
}

function EmptyState() {
  return (
    <ListItem>
      <ListItemText secondary='No records found' />
    </ListItem>
  )
}