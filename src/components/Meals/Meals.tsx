import React from 'react'
import Container from '@material-ui/core/Container'
import Token from 'components/Token'
import { RouteComponentProps } from 'react-router-dom'
import * as routes from 'utils/routes'
import { Button, ButtonGroup } from '@material-ui/core'
import { Row } from 'react-table'
import { Meal, MealType } from 'utils/interfaces/meal.interface'
import { MEAL_TYPES_COLORS } from 'utils/constants'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import MealsTable from './MealsTable'
import { useDispatch, useSelector } from 'react-redux'
import { createMealRequest } from 'store/meals/actions'
import { ApplicationState } from 'store'


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