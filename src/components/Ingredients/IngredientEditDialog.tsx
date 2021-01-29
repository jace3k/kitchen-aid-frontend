import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core'
import Token from 'components/Token'
import React, { useEffect, useState } from 'react'
import { Ingredient } from 'store/ingredients/types'

interface IngredientEditDialogProps {
  open: boolean,
  ingredient: Ingredient | null,
  onClose: () => void
}

const IngredientEditDialog = ({ open, ingredient, onClose }: IngredientEditDialogProps) => {
  
  const [name, setName] = useState(ingredient?.name || '')
  const [defaultPrice, setDefaultPrice] = useState(ingredient?.defaultPrice || '')

  useEffect(() => {
    setName(ingredient?.name || '')
    setDefaultPrice(ingredient?.defaultPrice || '')
  }, [ingredient])

  const BtnUpdate = () => (
    <Button onClick={onClose} color="primary">
      <Token value="update" />
    </Button>
  )

  const BtnCreate = () => (
    <Button onClick={onClose} color="primary">
      <Token value="create" />
    </Button>
  )

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
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

        <TextField
          margin="dense"
          label={<Token value="ingredientDefaultPriceLabel" />}
          value={defaultPrice}
          onChange={e => setDefaultPrice(e.target.value)}
          fullWidth
          type="number"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <Token value="cancel" />
        </Button>
        {ingredient ? <BtnUpdate /> : <BtnCreate />}
      </DialogActions>
    </Dialog>
  )
}

export default IngredientEditDialog
