import React from 'react'
import { MEAL_TYPES_NAMES } from 'utils/constants'
import { MealType } from 'utils/interfaces/meal.interface'
import Token from 'components/Token'
import { Typography } from '@mui/material'


interface MealTypeProps {
  type?: MealType,
  name?: string,
}

const MealType: React.FC<MealTypeProps> = ({ type, name }) => {
  if (name)
    return (
      <Typography>
        {name} (<Token value={type ? MEAL_TYPES_NAMES[type] : "empty"} />)
      </Typography>
    )

  return (
    <Typography sx={{ minWidth: 100 }}>
      <Token value={type ? MEAL_TYPES_NAMES[type] : "empty"} />
    </Typography>
  )
}

export default MealType
