import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import Token from 'components/Token'
import { Dish } from 'store/dishes/types'

interface DishRemoveConfirmDialogProps {
  open: boolean,
  onClose: () => void,
  dish: Dish | null,
}

const DishRemoveConfirmDialog = ({ open, onClose, dish }: DishRemoveConfirmDialogProps) => {

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle><Token value="removeConfirmTitle" /> </DialogTitle>
      <DialogContent>
        <Token value="ingredient" />: {dish?.name}
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

export default DishRemoveConfirmDialog
