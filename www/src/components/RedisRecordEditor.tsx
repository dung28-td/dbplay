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

const defaultRecord: RedisRecord = {
  key: '',
  type: 'STRING',
  value: undefined as any
}

interface Props {
  loading?: boolean
  record?: RedisRecord
  onSave?: (record: RedisRecord) => void
}

type Errors = Partial<Record<keyof RedisRecord, string | undefined>>

export default function RedisRecordEditor({
  loading,
  onSave,
  record = defaultRecord
}: Props) {
  const [newRecord, setNewRecord] = useReducer(
    (
      s: RedisRecord,
      a: Partial<RedisRecord>
    ) => ({ ...s, ...a }),
    record
  )
  const [errors, setErrors] = useReducer(
    (s: Errors, a: Errors) => ({ ...s, ...a }),
    {
      ...(!record.key && {
        key: 'Key is required!'
      }),
      ...(record.value ? {} : {
        value: 'Key is required!'
      })
    }
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
              loading={loading}
              variant="contained"
              onClick={onSave
                ? () => onSave(newRecord)
                : undefined
              }
            >
              Save
            </LoadingButton>
          </Toolbar>
        </AppBar>
        <JsonEditor
          value={newRecord.value}
          onChange={value => setNewRecord({ value })}
          onError={err => setErrors({ value: err })}
          onSave={onSave
            ? () => onSave(newRecord)
            : undefined
          }
        />
      </Stack>
    </ThemeProvider>
  )
}