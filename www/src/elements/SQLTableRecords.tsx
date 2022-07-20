import { useCallback, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import useQuery from "hooks/useQuery"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { emptyArray } from "constants/index"
import { flexByType } from "utils/data-grid"
import SQLTableToolbar from "components/SQLTableToolbar"
import useSearchParams from "hooks/useSearchParams"
import SQLRecordRow from "components/SQLRecordRow"
import SQLTableContext from "contexts/SQLTableContext"

export default function SQLTableRecords() {
  const [pagination, setPagination] = useState({
    limit: 100,
    offset: 0
  })
  const { table } = useParams()
  const [sp, setSp] = useSearchParams()
  const [schema, name] = (table || '').split('.')
  const { loading, data, fetchMore } = useQuery('SQL_TABLE_RECORDS', {
    variables: {
      ...pagination,
      schema,
      name,
      where: sp.get('where') || ''
    }
  })

  const loadMore = useCallback(async (pagination: LimitOffsetPagination) => {
    setPagination(pagination)
    await fetchMore({
      variables: pagination
    })
  }, [fetchMore])

  const handleSearch = useCallback((value: string) => {
    setPagination(prev => ({ ...prev, offset: 0 }))
    setSp(sp => {
      if (!value) sp.delete('where')
      else sp.set('where', value)
      return sp
    })
  }, [setSp, setPagination])

  if (!data && loading) return (
    <Stack height={1} justifyContent='center' alignItems='center'>
      <CircularProgress />
    </Stack>
  )

  if (!data?.sqlTable?.columns.length) return null

  return (
    <Stack height={1}>
      <SQLTableToolbar
        table={data.sqlTable}
        searchInput={sp.get('where') || ''}
        onSearch={handleSearch}
      />
      <SQLTableContext.Provider value={data.sqlTable}>
        <Data
          cols={data.sqlTable.columns}
          records={data.sqlTable.records}
          pagination={pagination}
          loadMore={loadMore}
        />
      </SQLTableContext.Provider>
    </Stack>
  )
}

interface DataProps {
  cols: CoreSQLColumnFields[]
  records: SQLRecordsFields
  pagination: LimitOffsetPagination
  loadMore: (pagination: LimitOffsetPagination) => void
}

const sx: Sx = {
  border: 'none',
  borderRadius: 'unset'
}

const components = {
  Row: SQLRecordRow
}

function Data({ cols, records, pagination, loadMore }: DataProps) {
  const { limit, offset } = pagination
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
      page={offset / limit}
      pageSize={limit}
      onPageChange={page => loadMore({
        limit,
        offset: page * limit
      })}
      onPageSizeChange={limit => loadMore({
        limit,
        offset: 0
      })}
      components={components}
    />
  )
}