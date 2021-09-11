import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core'
import MealName from 'components/Meals/MealName'
import Token from 'components/Token'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import { MealInaRetreatDto } from 'utils/interfaces/meal-ina-retreat.interface'

interface AddToListModalProps {
  open: boolean
  retreatId: number
  onClose: () => void
  onCreateMeal: (meal: MealInaRetreatDto) => void
}

const AddToListModal = ({ open, onClose, onCreateMeal, retreatId }: AddToListModalProps) => {
  const mealsList = useSelector((state: ApplicationState) => state.meals.meals)
  const mealsLoading = useSelector((state: ApplicationState) => state.meals.loading)

  const [selectedMeal, setSelectedMeal] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedServings, setSelectedServings] = useState('')

  const handleMealChange = (e: any) => {
    setSelectedMeal(e.target.value)
  }

  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value)
  }

  const handleServingsChange = (e: any) => {
    setSelectedServings(e.target.value)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle><Token value="addNewMeal" /> </DialogTitle>
      <DialogContent>
        <FormControl fullWidth disabled={mealsLoading}>
          <InputLabel><Token value="meal" /></InputLabel>
          <Select
            value={mealsLoading ? '' : selectedMeal}
            onChange={handleMealChange}
          >
            {mealsList.map(meal => (
              <MenuItem value={meal.id} key={meal.id}>
                <MealName id={meal.id} type={meal.type} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ margin: 10 }} />
        <FormControl fullWidth>
          <InputLabel><Token value="date" /></InputLabel>
          <Input value={selectedDate} onChange={handleDateChange} />
        </FormControl>
        <div style={{ margin: 10 }} />
        <FormControl fullWidth>
          <InputLabel><Token value="servings" /></InputLabel>
          <Input value={selectedServings} onChange={handleServingsChange} type="number" />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <Token value="cancel" />
        </Button>
        <Button
          onClick={() => onCreateMeal({
            retreat: retreatId,
            meal: parseInt(selectedMeal),
            date: selectedDate,
            servings: parseInt(selectedServings),
          })}
          color="primary"
          disabled={selectedMeal === ''}
        >
          <Token value="create" />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddToListModal
