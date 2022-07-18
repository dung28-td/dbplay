import useQuery from "hooks/useQuery"
import List from "@mui/material/List"
import Stack from "@mui/material/Stack"
import SQLTable from "./SQLTable"
import ListItemLoading from "./ListItemLoading"
import { matchPath, useLocation, useParams } from "react-router-dom"
import { useMemo } from "react"
import { Box } from "@mui/material"

export default function SQLTables() {
  const { connectionId } = useParams()
  const { pathname } = useLocation()
  const { loading, data } = useQuery('SQL_TABLES')

  const sortedTables = useMemo(() => {
    if (!data?.sqlTables) return []
    const result = [...data.sqlTables]
    return result.sort((a, b) => a.name > b.name ? 1 : -1 )
  }, [data])

  return (
    <Stack width={240} borderRight={1} borderColor='divider'>
      <Box overflow='auto' flexGrow={1}>
        <List dense>
          {sortedTables.map(table => {
            const key = table.schema + '.' + table.name
            const url = `/connections/${connectionId}/tables/${key}`
            const selected = !!matchPath(url, pathname)

            return (
              <SQLTable
                key={key}
                table={table}
                url={url}
                selected={selected}
              />
            )
          })}
          {loading && <ListItemLoading />}
        </List>
      </Box>
    </Stack>
  )
}