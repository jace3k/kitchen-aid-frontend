import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import Token from 'components/Token'
import { Ingredient } from 'store/ingredients/types'
import { useDispatch } from 'react-redux'
import { deleteIngredientRequest } from 'store/ingredients/actions'

interface DialogRemoveProps {
  open: boolean,
  onClose: () => void,
  ingredient: Ingredient | null,
}

const DialogRemove = ({ open, onClose, ingredient }: DialogRemoveProps) => {
  const dispatch = useDispatch()

  const handleRemove = () => {
    if (ingredient)
      dispatch(deleteIngredientRequest(ingredient.id))

    onClose()
  }

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
        <Button onClick={handleRemove} color="primary">
          <Token value="delete" />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogRemove
