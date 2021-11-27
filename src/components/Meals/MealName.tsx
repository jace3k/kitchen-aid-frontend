import React from 'react'
import { MEAL_TYPES_NAMES } from 'utils/constants'
import { MealType } from 'utils/interfaces/meal.interface'
import Token from 'components/Token'
import { Typography } from '@mui/material'


interface MealNameProps {
  id?: number,
  type?: MealType,
}

const MealName: React.FC<MealNameProps> = ({ id, type }) => {
  return (
    <Typography sx={{ minWidth: 150 }}>
      <Token value={type ? MEAL_TYPES_NAMES[type] : "empty"} /> {`#${id}`}
    </Typography>
  )
}

export default MealName
