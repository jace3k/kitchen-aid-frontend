import React from 'react'
import { MEAL_TYPES_NAMES } from 'utils/constants'
import { MealType } from 'utils/interfaces/meal.interface'
import Token from 'components/Token'


interface MealNameProps {
  id?: number,
  type?: MealType,
}

const MealName: React.FC<MealNameProps> = ({ id, type }) => {
  return <>
    <Token value={type ? MEAL_TYPES_NAMES[type] : "empty"} /> {`#${id}`}
  </>
}

export default MealName