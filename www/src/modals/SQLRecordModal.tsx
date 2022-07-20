import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import JsonEditor from 'components/JsonEditor';
import { useMemo } from 'react';

const DialogPaperProps = {
  sx: {
    height: 1
  }
}

const contentSx: Sx = {
  p: 0
}

const editorOptions = {
  readOnly: true
}

interface Props {
  table: SQLTable
  record: Record<string, any>
}

export default function SQLRecordModal({ table, record, ...props }: WithModalProps<Props>) {
  const { schema, name, columns } = table

  const value = useMemo(() => {
    const result: typeof record = {}

    for (const [key, value] of Object.entries(record)) {
      const col = columns.find(({ name }) => name === key)
      switch (col?.dataType) {
        case 'jsonb':
          result[key] = JSON.parse(value)
          break;
        default:
          result[key] = value
          break;
      }
    }

    return result as JSON
  }, [columns, record])

  return (
    <Dialog
      maxWidth='md'
      fullWidth
      PaperProps={DialogPaperProps}
      {...props}
    >
      <DialogTitle>
        {`${schema}.${name}:${record['id'] || ''}`}
      </DialogTitle>
      <DialogContent sx={contentSx}>
        <JsonEditor
          value={value}
          editorOptions={editorOptions}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}