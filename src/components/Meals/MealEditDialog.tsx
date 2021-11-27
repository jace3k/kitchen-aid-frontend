import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { createRetreatRequest } from 'store/retreats/actions'
import Token from 'components/Token'
import { createMealRequest } from 'store/meals/actions'
import { MealType } from 'utils/interfaces/meal.interface'
import { MEAL_TYPES } from 'utils/constants'
import { TranslationTokensType } from 'utils/translations'


interface MealEditDialogProps {
  open: boolean
  onClose: () => void
}

const MealEditDialog: React.FC<MealEditDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const [mealType, setMealType] = useState<MealType>("LU")

  const handleCreateMeal = () => {
    dispatch(createMealRequest({ type: mealType }))
    onClose()
  }

  const handleMealTypeChange = (e: any) => {
    setMealType(e.target.value)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle><Token value="addNewMeal" /></DialogTitle>
      <DialogContent>
        <FormControl fullWidth size="small" sx={{ marginTop: 1 }}>
          <InputLabel><Token value="meal" /></InputLabel>
          <Select
            value={mealType}
            onChange={handleMealTypeChange}
            fullWidth
            size="small"
            label={<Token value="meal" />}
          >
            {MEAL_TYPES.map(mealType => (
              <MenuItem key={mealType} value={mealType}><Token value={mealType as TranslationTokensType} /></MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <Token value="cancel" />
        </Button>
        <Button onClick={handleCreateMeal} color="primary">
          <Token value="create" />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MealEditDialog
