import React, { Fragment, useCallback, useState } from "react"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { GridRow, GridRowProps } from "@mui/x-data-grid"
import ConvertShape from "icons/ConvertShape"
import SQLRecordModal from "modals/SQLRecordModal"
import { openModal } from "./ModalsContainer"
import { useSQLTable } from "contexts/SQLTableContext"

interface Position {
  top: number
  left: number
}

export default function SQLRecordRow(props: GridRowProps) {
  const table = useSQLTable()
  const { row: record } = props
  const [position, setPosition] = useState<Position>()

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setPosition({
      left: e.clientX,
      top: e.clientY
    })
  }, [])

  const handleClose = useCallback(() => {
    setPosition(undefined)
  }, [])

  const viewJSON = useCallback(() => {
    openModal(SQLRecordModal, { table, record })
    handleClose()
  }, [table, record, handleClose])

  return (
    <Fragment>
      <GridRow
        {...props}
        onContextMenu={handleContextMenu}
      />
      <Menu
        open={!!position}
        onClose={handleClose}
        anchorReference='anchorPosition'
        anchorPosition={position}
      >
        <MenuItem onClick={viewJSON}>
          <ListItemIcon>
            <ConvertShape fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary='View in JSON format'
          />
        </MenuItem>
      </Menu>
    </Fragment>
  )
}