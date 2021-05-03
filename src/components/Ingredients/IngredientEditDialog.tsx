import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core'
import Token from 'components/Token'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createIngredientRequest, updateIngredientRequest } from 'store/ingredients/actions'
import { Ingredient } from 'store/ingredients/types'

interface IngredientEditDialogProps {
  open: boolean,
  ingredient: Ingredient | null,
  onClose: () => void
}

const IngredientEditDialog = ({ open, ingredient, onClose }: IngredientEditDialogProps) => {
  const [name, setName] = useState(ingredient?.name || '')
  const dispatch = useDispatch()

  useEffect(() => {
    if (open)
      setName(ingredient?.name || '')
  }, [ingredient, open])

  const BtnUpdate = ({ ingToUpdate }: { ingToUpdate: Ingredient }) => (
    <Button onClick={() => {
      dispatch(updateIngredientRequest(ingToUpdate.id, name))
      onClose()
      setName('')
    }}
      color="primary"
      type="submit"
      disabled={ingToUpdate.name === name}
    >
      <Token value="update" />
    </Button>
  )

  const BtnCreate = () => (
    <Button
      onClick={() => {
        dispatch(createIngredientRequest(name))
        onClose()
        setName('')
      }}
      color="primary"
      type="submit"
      disabled={name === ''}
    >
      <Token value="create" />
    </Button>
  )

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <form onSubmit={e => e.preventDefault()}>
        <DialogTitle><Token value={ingredient ? "editIngredient" : "addNewIngredient"} /></DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={<Token value="ingredientNameLabel" />}
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            <Token value="cancel" />
          </Button>
          {ingredient ? <BtnUpdate ingToUpdate={ingredient} /> : <BtnCreate />}
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default IngredientEditDialog
