import { useMemo } from "react"
import useQuery from "hooks/useQuery"
import List from "@mui/material/List"
import Stack from "@mui/material/Stack"
import SQLTable from "./SQLTable"
import ListItemLoading from "./ListItemLoading"
import { Link, matchPath, useLocation, useParams } from "react-router-dom"
import Box from "@mui/material/Box"
import ListSubheader from "@mui/material/ListSubheader"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Code from "icons/Code"

const subheaderSx = {
  bgcolor: 'background.default'
}

export default function SQLTables() {
  const { connectionId } = useParams()
  const { pathname } = useLocation()
  const { loading, data } = useQuery('SQL_TABLES')

  const sortedTables = useMemo(() => {
    if (!data?.sqlTables) return []
    const result = [...data.sqlTables]
    return result.sort((a, b) => a.name > b.name ? 1 : -1 )
  }, [data])

  const scriptsPath = `/connections/${connectionId}/scripts`

  return (
    <Stack width={240} borderRight={1} borderColor='divider'>
      <List>
        <ListItem
          disablePadding
        >
          <ListItemButton
            component={Link}
            selected={!!matchPath(scriptsPath, pathname)}
            to={scriptsPath}
          >
            <ListItemIcon>
              <Code color='primary' />
            </ListItemIcon>
            <ListItemText
              primary='Scripts'
              primaryTypographyProps={{
                color: 'primary'
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Box overflow='auto' flexGrow={1}>
        <List
          dense
          subheader={
            <ListSubheader sx={subheaderSx}>
              Tables
            </ListSubheader>
          }
        >
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