import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMutation from 'hooks/useMutation';
import { useNavigate } from 'react-router-dom';
import { ConnectionID } from 'gql/fragments';

interface Props {
}

export default function NewConnectionModal(props: WithModalProps<Props>) {
  const navigate = useNavigate()
  const [createConnection, { loading, error }] = useMutation('CREATE_CONNECTION', {
    update(cache, { data }) {
      if (!data?.createConnection) return
      cache.modify({
        fields: {
          connections(existingConnections = []) {
            const newConnectionRef = cache.writeFragment({
              data: data.createConnection,
              fragment: ConnectionID
            })
            return [...existingConnections, newConnectionRef]
          }
        }
      })
    }
  })

  return (
    <Dialog
      maxWidth='sm'
      fullWidth
      {...props}
    >
      <DialogTitle>New connection</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Currently, we only support Redis connection.
        </DialogContentText>
        <form
          id='connection-form'
          onSubmit={async e => {
            e.preventDefault()
            const { data } = await createConnection({
              variables: {
                input: {
                  name: e.currentTarget['connection[name]'].value,
                  dsn: e.currentTarget['connection[dsn]'].value,
                }
              }
            })

            if (!data?.createConnection) return

            props.onClose()
            navigate('/connections/' + data.createConnection.id)
          }}
        >
          <TextField
            autoFocus
            name='connection[name]'
            variant="standard"
            margin="normal"
            label="Name"
            placeholder='E.g. Local Redis'
          />
          <TextField
            required
            name='connection[dsn]'
            variant="standard"
            margin="normal"
            label="DSN"
            placeholder='E.g. redis://username:password@localhost:6379'
            error={!!error?.message}
            helperText={error?.message}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <LoadingButton
          loading={loading}
          variant='contained'
          type='submit'
          form='connection-form'
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}