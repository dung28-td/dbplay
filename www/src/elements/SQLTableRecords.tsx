import { useMemo } from "react"
import { useParams } from "react-router-dom"
import useQuery from "hooks/useQuery"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import { DataGrid, GridColDef } from '@mui/x-data-grid'

export default function SQLTableRecords() {
  const { table } = useParams()
  const [schema, name] = (table || '').split('.')
  const { loading, data } = useQuery('SQL_TABLE_RECORDS', {
    variables: {
      schema,
      name
    }
  })

  if (loading) return (
    <Stack height={1} justifyContent='center' alignItems='center'>
      <CircularProgress />
    </Stack>
  )

  if (!data?.sqlTable?.columns.length) return null

  return (
    <Data
      cols={data.sqlTable.columns}
    />
  )
}

interface DataProps {
  cols: CoreSQLColumnFields[]
}

function Data({ cols }: DataProps) {
  const columns = useMemo(() => {
    return cols.map(({ name }) => {
      const col: GridColDef = {
        field: name
      }
      return col
    })
  }, [cols])

  return (
    <DataGrid
      sx={{ border: 'none', borderRadius: 'unset'}}
      columns={columns}
      rows={[]}
    />
  )
}