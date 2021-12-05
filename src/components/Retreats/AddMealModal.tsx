import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment, { Moment } from 'moment'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'
import AdapterMoment from '@mui/lab/AdapterMoment'
import { ApplicationState } from 'store'
import { MealInaRetreatDto } from 'utils/interfaces/meal-ina-retreat.interface'
import { DATE_PICKER_MASK, MOMENT_DATE_DISPLAY_FORMAT, MOMENT_DATE_SAVE_FORMAT } from 'utils/constants'
import Token from 'components/Token'
import MealType from 'components/Meals/MealType'


interface AddMealModalProps {
  open: boolean
  retreatId: number
  onClose: () => void
  onCreateMeal: (meal: MealInaRetreatDto) => void
}

const getCurrentDate = () => {
  return moment()
}

const AddMealModal = ({ open, onClose, onCreateMeal, retreatId }: AddMealModalProps) => {
  const mealsList = useSelector((state: ApplicationState) => state.meals.meals)
  const mealsLoading = useSelector((state: ApplicationState) => state.meals.loading)

  const [selectedMeal, setSelectedMeal] = useState('')

  const [selectedDate, setSelectedDate] = useState<Moment | null>(getCurrentDate())
  const [selectedServings, setSelectedServings] = useState('')

  const handleMealChange = (e: any) => {
    setSelectedMeal(e.target.value)
  }

  const handleServingsChange = (e: any) => {
    setSelectedServings(e.target.value)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle><Token value="addNewMeal" /> </DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <FormControl fullWidth size="small" sx={{ marginTop: 1 }}>
            <InputLabel><Token value="meal" /></InputLabel>
            <Select
              value={mealsLoading ? '' : selectedMeal}
              onChange={handleMealChange}
              disabled={mealsLoading || !mealsList.length}
              fullWidth
              size="small"
              label={<Token value="meal" />}
            >
              {mealsList.map(meal => (
                <MenuItem value={meal.id} key={meal.id}>
                  <MealType type={meal.type} name={meal.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                mask={DATE_PICKER_MASK}
                inputFormat={MOMENT_DATE_DISPLAY_FORMAT}
                value={selectedDate}
                onChange={setSelectedDate}
                renderInput={(params) => <TextField {...params} size="small" sx={{ minWidth: 150 }} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label={<Token value="servings" />}
              size="small"
              type="number"
              value={selectedServings}
              onChange={handleServingsChange}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <Token value="cancel" />
        </Button>
        <Button
          onClick={() => onCreateMeal({
            retreat: retreatId,
            meal: parseInt(selectedMeal),
            date: selectedDate
              ? (selectedDate as Moment).format(MOMENT_DATE_SAVE_FORMAT)
              : '',
            servings: parseInt(selectedServings),
          })}
          color="primary"
          disabled={selectedMeal === '' || selectedServings === ''}
        >
          <Token value="add" />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddMealModal
