import React, { memo } from "react"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import HighlightText from "./HighlightText"
import { Link } from "react-router-dom"

const primaryTextProps = {
  sx: {
    overflowWrap: 'break-word'
  }
}

interface Props {
  active?: boolean
  record: RedisRecordKey
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