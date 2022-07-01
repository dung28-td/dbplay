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
import IconButton from "@mui/material/IconButton";
import { REDIS_RECORD_TYPES } from 'constants/index';
import { every } from "utils/object";
import Trash from "icons/Trash";
import { confirm } from "modals/ConfirmModal";

const recordTypes = Object.keys(REDIS_RECORD_TYPES)

const defaultRecord: RedisRecord = {
  key: '',
  type: 'STRING',
  value: undefined as any
}

const confirmDeleteOpts = {
  title: 'Hey, wait a minute...',
  desc: 'This action cannot be undone. Are you sure you want to delete this record?'
}

interface CommonProps {
  loading?: boolean
  onSave?: (record: RedisRecord) => void
}

interface NewProps {
}

interface EditProps {
  record: RedisRecord
  onDelete: () => void
}

type Props = CommonProps & (NewProps | EditProps)

type Errors = Partial<Record<keyof RedisRecord, string | undefined>>

export default function RedisRecordEditor({ loading, onSave, ...props }: Props) {
  let record: RedisRecord | undefined
  let onDelete: (() => void) | undefined

  if ('record' in props) {
    record = props.record
    onDelete = props.onDelete
  }

  const [newRecord, setNewRecord] = useReducer(
    (
      s: RedisRecord,
      a: Partial<RedisRecord>
    ) => ({ ...s, ...a }),
    record || defaultRecord
  )
  const [errors, setErrors] = useReducer(
    (s: Errors, a: Errors) => ({ ...s, ...a }),
    {
      ...(!record?.key && {
        key: 'Key is required!'
      }),
      ...(!record?.value && {
        value: 'Value is required!'
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
            <Stack direction='row' spacing={1}>
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
              {record && (
                <IconButton
                  color="error"
                  edge='end'
                  onClick={async () => {
                    if (!await confirm(confirmDeleteOpts)) return
                    if (onDelete) onDelete()
                  }}
                >
                  <Trash />
                </IconButton>
              )}
            </Stack>
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