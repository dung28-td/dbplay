import { memo } from "react"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import Chip from "@mui/material/Chip"
import HighlightText from "./HighlightText"
import { REDIS_RECORD_TYPES } from "constants/index"

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
  record: CoreRedisRecordFields
  input: string
}

function RedisKey({ record, input }: Props) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
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