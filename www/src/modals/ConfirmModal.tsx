import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { openModal } from "components/ModalsContainer";

interface Props {
  resolve: (confirmed: boolean) => void
  title?: string
  desc?: string
}

function ConfirmModal({
  title = 'Are you sure?',
  desc,
  resolve,
  onClose,
  ...props
}: WithModalProps<Props>) {
  const handleClose = (confirmed: boolean) => () => {
    resolve(confirmed)
    onClose()
  }

  return (
    <Dialog
      maxWidth='xs'
      fullWidth
      {...props}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      {desc && (
        <DialogContent>
          <DialogContentText>
            {desc}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleClose(false)}>
          Cancel
        </Button>
        <Button onClick={handleClose(true)}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export const confirm = (options?: Omit<Props, 'resolve'>) => new Promise(resolve => {
  openModal(ConfirmModal, {
    ...options,
    resolve
  })
})