import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { ApplicationState } from 'store'
import { DishInaMealDto } from 'utils/interfaces/dish-ina-meal.interface'
import Token from 'components/Token'


interface AddToListModalProps {
  open: boolean
  mealId: number
  onClose: () => void
  onCreateDish: (dish: DishInaMealDto) => void
}

const AddToListModal = ({ open, onClose, onCreateDish, mealId }: AddToListModalProps) => {
  const dishList = useSelector((state: ApplicationState) => state.dishes.dishes)
  const dishesLoading = useSelector((state: ApplicationState) => state.dishes.loading)

  const [selectedDish, setSelectedDish] = useState('')

  const handleDishChange = (e: any) => {
    setSelectedDish(e.target.value)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle><Token value="addNewDish" /> </DialogTitle>
      <DialogContent>
        <FormControl fullWidth size="small" sx={{ marginTop: 1 }}>
          <InputLabel><Token value="dish" /></InputLabel>
          <Select
            value={dishesLoading ? '' : selectedDish}
            onChange={handleDishChange}
            disabled={!dishList.length}
            fullWidth
            size="small"
            label={<Token value="dish" />}
          >
            {dishList.map(dish => (
              <MenuItem value={dish.id} key={dish.id}>{dish.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <Token value="cancel" />
        </Button>
        <Button
          onClick={() => onCreateDish({
            meal: mealId,
            dish: parseInt(selectedDish),
          })}
          color="primary"
          disabled={selectedDish === ''}
        >
          <Token value="add" />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddToListModal
