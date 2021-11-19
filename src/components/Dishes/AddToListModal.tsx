import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, InputLabel, Input, Stack, TextField } from '@mui/material'
import { ApplicationState } from 'store'
import { IngredientInaDishDto } from 'utils/interfaces/ingredient-ina-dish.interface'
import Token from 'components/Token'


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
        <Stack spacing={1}>
          <FormControl fullWidth size="small" sx={{ marginTop: 1 }}>
            <InputLabel><Token value="ingredient" /></InputLabel>
            <Select
              value={ingredientsLoading ? '' : selectedIngredient}
              onChange={handleIngredientChange}
              disabled={!ingredientList.length}
              fullWidth
              size="small"
              label={<Token value="ingredient" />}
            >
              {ingredientList.map(ing => (
                <MenuItem value={ing.id} key={ing.id}>{ing.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label={<Token value="margin" />}
              size="small"
              type="number"
              value={selectedMargin}
              onChange={handleMarginChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label={<Token value="part" />}
              size="small"
              type="number"
              value={selectedPart}
              onChange={handlePartChange}
            />
          </FormControl>
        </Stack>
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
