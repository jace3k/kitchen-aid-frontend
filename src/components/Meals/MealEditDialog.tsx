import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
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
  const [mealName, setMealName] = useState("")
  const [mealType, setMealType] = useState<MealType>("LU")

  const handleCreateMeal = () => {
    dispatch(createMealRequest({ type: mealType, name: mealName }))
    onClose()
  }

  const handleMealTypeChange = (e: any) => {
    setMealType(e.target.value)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <form onSubmit={e => e.preventDefault()}>
        <DialogTitle><Token value="addNewMeal" /></DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <TextField
              size="small"
              autoFocus
              margin="dense"
              label={<Token value="mealLabel" />}
              value={mealName}
              onChange={e => setMealName(e.target.value)}
              fullWidth
            />
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

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            <Token value="cancel" />
          </Button>
          <Button onClick={handleCreateMeal} color="primary" type="submit" disabled={mealName === ''}>
            <Token value="create" />
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default MealEditDialog
