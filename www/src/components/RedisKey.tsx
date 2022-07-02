import React, { memo } from "react"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import Chip from "@mui/material/Chip"
import HighlightText from "./HighlightText"
import { REDIS_RECORD_TYPES } from "constants/index"
import { Link } from "react-router-dom"

const chipSx: Sx = {
  textTransform: 'lowercase',
  fontSize: 12
}

const primaryTextProps = {
  sx: {
    overflowWrap: 'break-word'
  }
}

interface Props {
  active?: boolean
  record: Omit<CoreRedisRecordFields, 'value'>
  input: string
  url: string
  selected: boolean
  onSelect: (e: React.MouseEvent) => void
}

function RedisKey({ record, input, url, selected, onSelect }: Props) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={selected}
        component={Link}
        to={url}
        onClick={onSelect}
      >
        <ListItemIcon>
          <Chip color={REDIS_RECORD_TYPES[record.type].color} size='small' label={record.type} sx={chipSx} />
        </ListItemIcon>
        <ListItemText
          primary={
            <HighlightText value={record.key} input={input} />
          }
          primaryTypographyProps={primaryTextProps}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default memo(RedisKey)