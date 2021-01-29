import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import Token from 'components/Token'
import { Ingredient } from 'store/ingredients/types'

interface DialogRemoveProps {
  open: boolean,
  onClose: () => void,
  ingredient: Ingredient | null,
}

const DialogRemove = ({ open, onClose, ingredient }: DialogRemoveProps) => {

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle><Token value="removeConfirmTitle" /> </DialogTitle>
      <DialogContent>
        <Token value="ingredient" />: {ingredient?.name}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <Token value="cancel" />
        </Button>
        <Button onClick={onClose} color="primary">
          <Token value="delete" />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogRemove
