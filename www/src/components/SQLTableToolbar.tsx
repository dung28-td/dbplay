import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "icons/Search";
import React, { useCallback } from "react";
import SearchField from "./SearchField";

const toolbarSx: Sx = {
  px: {
    sm: 2
  }
}

const searchInputProps = {
  startAdornment: (
    <InputAdornment position="start">
      <SearchIcon fontSize='small' />
    </InputAdornment>
  )
}

interface Props {
  table: CoreSQLTableFields
  searchInput: string
  onSearch: (input: string) => void
}

export default function SQLTableToolbar({ table, searchInput, onSearch }: Props) {
  const { schema, name } = table

  return (
    <Toolbar sx={toolbarSx}>
      <Box flexGrow={1}>
        <Typography variant="h6" component='div'>
          {`${schema}.${name}`}
        </Typography>
      </Box>
      <Search
        searchInput={searchInput}
        onSearch={onSearch}
      />
    </Toolbar>
  )
}

interface SearchProps {
  searchInput: string
  onSearch: (input: string) => void
}

function Search({ searchInput, onSearch }: SearchProps) {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(e.currentTarget['where'].value)
  }, [onSearch])

  return (
    <Box
      component='form'
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <SearchField
        type='search'
        size='small'
        name='where'
        InputProps={searchInputProps}
        placeholder='Where ...'
        defaultValue={searchInput}
      />
    </Box>
  )
}