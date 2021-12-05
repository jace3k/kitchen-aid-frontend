import React from 'react'
import { TableInstance } from 'react-table'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Token from 'components/Token'
import { MEAL_TYPES } from 'utils/constants'
import { TranslationTokensType } from 'utils/translations'


const MealTypeFilter = ({ column }: TableInstance) => {
  const { filterValue, setFilter } = column
  console.log('sss', filterValue)
  return (
    <div>
      <FormControl fullWidth size="small">
        <InputLabel><Token value="mealType" /></InputLabel>
        <Select
          value={filterValue || ""}
          onChange={e => setFilter(e.target.value)}
          fullWidth
          size="small"
          label={<Token value="mealType" />}
        >
          <MenuItem value=""><Token value="all" /></MenuItem>
          {MEAL_TYPES.map(mealType => (
            <MenuItem key={mealType} value={mealType}><Token value={mealType as TranslationTokensType} /></MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default MealTypeFilter
