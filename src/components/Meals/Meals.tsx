import React from 'react'
import { Row } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import * as routes from 'utils/routes'
import { Button, ButtonGroup, Container, useMediaQuery } from '@mui/material'
import { ApplicationState } from 'store'
import { createMealRequest } from 'store/meals/actions'
import { MEAL_TYPES_COLORS } from 'utils/constants'
import { Meal, MealType } from 'utils/interfaces/meal.interface'
import MealsTable from './MealsTable'
import Token from 'components/Token'


const Meals: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch()
  const isDesktop = useMediaQuery('(min-width:960px)')
  const mealsLoading = useSelector((state: ApplicationState) => state.meals.loading)

  const onRowClick = (row: Row<Meal>) => {
    history.push(routes.Meals + '/' + row.original.id)
  }

  const handleCreateMeal = (type: MealType) => {
    dispatch(createMealRequest({ type }))
  }

  return (
    <Container style={{ minWidth: 300 }}>
      <h1><Token value="meals" /></h1>
      <MealsTable onRowClick={onRowClick} />
      <div style={{ textAlign: 'center', margin: 10 }}>
        <ButtonGroup orientation={isDesktop ? 'horizontal' : 'vertical'} disabled={mealsLoading}>
          <Button
            variant='contained'
            style={{ background: MEAL_TYPES_COLORS.BR, width: 200 }}
            onClick={() => handleCreateMeal("BR")}
          >
            <Token value="createBreakfast" />
          </Button>
          <Button
            variant='contained'
            style={{ background: MEAL_TYPES_COLORS.LU, width: 200 }}
            onClick={() => handleCreateMeal("LU")}
          >
            <Token value="createLunch" />
          </Button>
          <Button
            variant='contained'
            style={{ background: MEAL_TYPES_COLORS.FE, width: 200 }}
            onClick={() => handleCreateMeal("FE")}
          >
            <Token value="createFeast" />
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  )
}

export default Meals