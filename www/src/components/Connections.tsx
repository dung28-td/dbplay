import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Add from "icons/Add";
import useQuery from "hooks/useQuery";
import { ListItemText } from "@mui/material";
import Connection from "./Connection";
import { openModal } from "./ModalsContainer";
import NewConnectionModal from "modals/NewConnectionModal";

const subheaderSx: Sx = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

export default function Connections() {
  const { loading, data } = useQuery('CONNECTIONS')

  return (
    <List
      subheader={
        <ListSubheader sx={subheaderSx}>
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
          >
            <span>Connections</span>
            {loading && <CircularProgress size={14} />}
          </Stack>
          <IconButton
            size='small'
            edge='end'
            onClick={() => openModal(NewConnectionModal, {})}
          >
            <Add />
          </IconButton>
        </ListSubheader>
      }
    >
      {!loading && data?.connections.length === 0 && (
        <ListItem>
          <ListItemText secondary='No connections found'/>
        </ListItem>
      )}
      {data?.connections.map(connection => (
        <Connection
          key={connection.id}
          connection={connection}
        />
      ))}
    </List>
  )
}