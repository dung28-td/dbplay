import { useCallback, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import useQuery from "hooks/useQuery"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { emptyArray } from "constants/index"
import { flexByType } from "utils/data-grid"

export default function SQLTableRecords() {
  const [pagination, setPagination] = useState({
    limit: 100,
    offset: 0
  })
  const { table } = useParams()
  const [schema, name] = (table || '').split('.')
  const { loading, data, fetchMore } = useQuery('SQL_TABLE_RECORDS', {
    variables: {
      ...pagination,
      schema,
      name,
    }
  })

  const loadMore = useCallback(async (limit: number, offset: number) => {
    setPagination({ limit, offset })
    await fetchMore({
      variables: { limit, offset }
    })
  }, [fetchMore])

  if (!data && loading) return (
    <Stack height={1} justifyContent='center' alignItems='center'>
      <CircularProgress />
    </Stack>
  )

  if (!data?.sqlTable?.columns.length) return null

  return (
    <Data
      cols={data.sqlTable.columns}
      records={data.sqlTable.records}
      loadMore={loadMore}
    />
  )
}

interface DataProps {
  cols: CoreSQLColumnFields[]
  records: SQLRecordsFields
  loadMore: (limit: number, offset: number) => void
}

const sx: Sx = {
  border: 'none',
  borderRadius: 'unset'
}

function Data({ cols, records, loadMore }: DataProps) {
  const columns = useMemo(() => {
    return cols.map(({ name, dataType }) => {
      const col: GridColDef = {
        field: name,
        flex: flexByType(dataType),
        minWidth: 160
      }
      return col
    })
  }, [cols])

  return (
    <DataGrid
      sx={sx}
      columns={columns}
      rows={records.rows || emptyArray}
      rowCount={records.rowCount}
      onPageChange={page => loadMore(100, page * 100)}
      onPageSizeChange={limit => loadMore(limit, 0)}
    />
  )
}