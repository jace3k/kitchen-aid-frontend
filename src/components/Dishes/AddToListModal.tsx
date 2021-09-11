import React, { useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, OutlinedInput, Select, TextField } from '@material-ui/core'
import Token from 'components/Token'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import { InputLabel } from '@material-ui/core'
import { useState } from 'react'
import { Input } from '@material-ui/core'
import { IngredientInaDishDto } from 'utils/interfaces/ingredient-ina-dish.interface'


interface AddToListModalProps {
  open: boolean
  dishId: number
  onClose: () => void
  onCreateIngredient: (ingredient: IngredientInaDishDto) => void
}

const AddToListModal = ({ open, onClose, onCreateIngredient, dishId }: AddToListModalProps) => {
  const ingredientList = useSelector((state: ApplicationState) => state.ingredients.ingredients)
  const ingredientsLoading = useSelector((state: ApplicationState) => state.ingredients.loading)

  const [selectedIngredient, setSelectedIngredient] = useState('')
  const [selectedMargin, setSelectedMargin] = useState('')
  const [selectedPart, setSelectedPart] = useState('')

  const handleIngredientChange = (e: any) => {
    setSelectedIngredient(e.target.value)
  }

  const handleMarginChange = (e: any) => {
    setSelectedMargin(e.target.value)
  }

  const handlePartChange = (e: any) => {
    setSelectedPart(e.target.value)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle><Token value="addNewIngredient" /> </DialogTitle>
      <DialogContent>
        <FormControl fullWidth disabled={ingredientsLoading}>
          <InputLabel><Token value="ingredient" /></InputLabel>
          <Select
            value={ingredientsLoading ? '' : selectedIngredient}
            onChange={handleIngredientChange}
            disabled={!ingredientList.length}
          >
            {ingredientList.map(ing => (
              <MenuItem value={ing.id} key={ing.id}>{ing.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ margin: 10 }} />
        <FormControl fullWidth>
          <InputLabel><Token value="margin" /></InputLabel>
          <Input value={selectedMargin} onChange={handleMarginChange} type="number" />
        </FormControl>
        <div style={{ margin: 10 }} />
        <FormControl fullWidth>
          <InputLabel><Token value="part" /></InputLabel>
          <Input value={selectedPart} onChange={handlePartChange} type="number" />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <Token value="cancel" />
        </Button>
        <Button
          onClick={() => onCreateIngredient({
            dish: dishId,
            ingredient: parseInt(selectedIngredient),
            margin: parseInt(selectedMargin),
            part: parseInt(selectedPart),
          })}
          color="primary"
          disabled={selectedMargin === '' || selectedPart === ''}
        >
          <Token value="add" />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddToListModal
