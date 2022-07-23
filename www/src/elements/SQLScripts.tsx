import { useCallback, useMemo, useState } from "react";
import SQLEditor from "components/SQLEditor";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Play from "icons/Play";
import useMutation from "hooks/useMutation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Ace } from "ace-builds";

export default function SQLScripts () {
  const [query, setQuery] = useState('')
  const [run, { loading, data }] = useMutation('EXEC_SQL_QUERY')

  const handleSelect = useCallback((_: Ace.Selection, e: Ace.Editor ) => {
    setQuery(e.getSelectedText())
  }, [])

  const handleRun = useCallback(() => {
    run({ variables: { query } })
  }, [query, run])

  return (
    <Stack height={1} position='relative'>
      <Box flexGrow={1}>
        <SQLEditor
          onSelect={handleSelect}
        />
      </Box>
      {data?.execSQLQuery && (
        <Box flexGrow={1}>
          <Result rows={data.execSQLQuery} />
        </Box>
      )}
      <ExecFab
        loading={loading}
        disabled={!query}
        onClick={handleRun}
      />
    </Stack>
  )
}

const tableSx: Sx = {
  border: 'none',
  borderRadius: 0
}

interface ResultProps {
  rows: Record<string, any>[]
}

function Result({ rows }: ResultProps) {
  const columns = useMemo(() => {
    const cols = []

    for (const [key] of Object.entries(rows[0])) {
      const col: GridColDef = {
        field: key,
        minWidth: 160
      }
      cols.push(col)
    }

    return cols
  }, [rows])

  return (
    <DataGrid
      sx={tableSx}
      columns={columns}
      rows={rows}
      paginationMode='client'
    />
  )
}

const fabSx: Sx = {
  position: 'absolute',
  top: 16,
  right: 16
}


interface FabProps {
  loading: boolean
  disabled: boolean
  onClick: () => void
}

function ExecFab({ loading, disabled, onClick }: FabProps) {
  const [open, setOpen] = useState(false)

  return (
    <Tooltip
      arrow
      disableInteractive
      title='Please select your query first'
      open={open}
      onOpen={() => disabled && setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <Box
        component='span'
        sx={fabSx}
      >
        <Fab
          size='medium'
          color='primary'
          disabled={disabled}
          onClick={loading ? undefined : onClick}
        >
          {loading ? <CircularProgress color='inherit' /> : <Play />}
        </Fab>
      </Box>
    </Tooltip>
  )
}