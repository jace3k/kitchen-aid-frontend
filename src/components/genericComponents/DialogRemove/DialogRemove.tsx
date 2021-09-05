import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import Token from 'components/Token'


interface DialogRemoveProps {
  open: boolean
  onClose: () => void
  handleRemove: () => void
  elementName: string | JSX.Element
  description?: string | JSX.Element
}

const DialogRemove = ({ open, onClose, handleRemove, elementName, description }: DialogRemoveProps) => {

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle><Token value="removeConfirmTitle" /> </DialogTitle>
      <DialogContent>
        <h3>{elementName}</h3>
        {description}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <Token value="cancel" />
        </Button>
        <Button onClick={handleRemove} color="primary">
          <Token value="delete" />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogRemove
