import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import useDSN from "hooks/useDSN";
import SettingBold from "icons/SettingBold";
import { Link, useLocation } from "react-router-dom";
import { CONNECTION_TYPES } from "constants/index";
import ConnectionOrigin from "./ConnectionOrigin";

const itemSx: Sx = {
  '&:not(:hover) .MuiListItemSecondaryAction-root': {
    display: 'none'
  }
}

const secondTypoProps = {
  sx: {
    overflowWrap: 'break-word'
  }
}

const iconSx: Sx = {
  minWidth: 40
}

interface Props {
  connection: CoreConnectionFields
}

export default function Connection({ connection }: Props) {
  const { id, name, dsn, connected } = connection
  const match = useDSN(dsn)
  const location = useLocation()
  const to = '/connections/' + id
  const selected =
    location.pathname === to ||
    location.pathname.startsWith(to + '/')
  const Icon =
    match?.scheme &&
    match.scheme in CONNECTION_TYPES &&
    CONNECTION_TYPES[match.scheme as keyof typeof CONNECTION_TYPES].Icon

  return (
    <ListItem
      disablePadding
      sx={itemSx}
      secondaryAction={
        <IconButton
          edge='end'
          size='small'
        >
          <SettingBold />
        </IconButton>
      }
    >
      <ListItemButton
        component={Link}
        to={to}
        selected={selected}
      >
        {Icon && (
          <ListItemIcon sx={iconSx}>
            <Icon filter={connected ? undefined : "grayscale(1)"} />
          </ListItemIcon>
        )}
        <ListItemText
          primary={name}
          secondary={<ConnectionOrigin dsn={dsn} />}
          secondaryTypographyProps={secondTypoProps}
        />
      </ListItemButton>
    </ListItem>
  )
}