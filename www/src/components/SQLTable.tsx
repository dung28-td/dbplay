import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { memo } from "react";
import { Link } from "react-router-dom";

interface Props {
  table: CoreSQLTableFields
  url: string
  selected: boolean
}

function SQLTable({ table, url, selected }: Props) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={url}
        selected={selected}
      >
        <ListItemText
          primary={table.name}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default memo(SQLTable)