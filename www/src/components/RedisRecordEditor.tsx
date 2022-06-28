import { useReducer } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "lib/mui";
import TextField from "@mui/material/TextField";
import JsonEditor from "components/JsonEditor";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LoadingButton from "@mui/lab/LoadingButton";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { REDIS_RECORD_TYPES } from 'constants/index';
import { every } from "utils/object";

const recordTypes = Object.keys(REDIS_RECORD_TYPES)

interface Props {
  record: CoreRedisRecordFields
}

type Errors = Partial<Record<keyof CoreRedisRecordFields, string | undefined>>

export default function RedisRecordEditor({ record }: Props) {
  const [newRecord, setNewRecord] = useReducer(
    (
      s: CoreRedisRecordFields,
      a: Partial<CoreRedisRecordFields>
    ) => ({ ...s, ...a }),
    record
  )
  const [errors, setErrors] = useReducer(
    (s: Errors, a: Errors) => ({ ...s, ...a }),
    {}
  )

  const savable =
    JSON.stringify(record) !== JSON.stringify(newRecord) &&
    every(errors, ([_, value]) => !value)

  return (
    <ThemeProvider theme={darkTheme}>
      <Stack height={1}>
        <AppBar position="relative" elevation={0}>
          <Toolbar>
            <Stack direction='row' flexGrow={1} alignItems='center' spacing={1} mr={2}>
              <Select
                size='small'
                value={newRecord.type}
                onChange={e => setNewRecord({ type: e.target.value as RedisRecordType })}
              >
                {recordTypes.map(type => {
                  return <MenuItem key={type} value={type}>{type}</MenuItem>
                })}
              </Select>
              <TextField
                size='small'
                placeholder="E.g. prefix:name"
                value={newRecord.key}
                onChange={e => {
                  const { value } = e.currentTarget
                  setNewRecord({ key: value })
                  setErrors({ key: value ? undefined : 'Key is required' })
                }}
              />
            </Stack>
            <LoadingButton
              disabled={!savable}
              variant="contained"
            >
              Save
            </LoadingButton>
          </Toolbar>
        </AppBar>
        <JsonEditor
          value={newRecord.value}
          onChange={value => setNewRecord({ value })}
          onError={err => setErrors({ value: err })}
        />
      </Stack>
    </ThemeProvider>
  )
}