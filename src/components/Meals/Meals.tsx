import React, { useState } from 'react'
import { Row } from 'react-table'
import { RouteComponentProps } from 'react-router-dom'
import * as routes from 'utils/routes'
import { Container } from '@mui/material'
import { Meal } from 'utils/interfaces/meal.interface'
import MealsTable from './MealsTable'
import MealEditDialog from './MealEditDialog'
import MainHeader from 'components/genericComponents/MainHeader/MainHeader'


const Meals: React.FC<RouteComponentProps> = ({ history }) => {
  // const isDesktop = useMediaQuery('(min-width:960px)')
  const [newMealOpen, setNewMealOpen] = useState(false)

  const onRowClick = (row: Row<Meal>) => {
    history.push(routes.Meals + '/' + row.original.id)
  }

  const openMealDialogCreate = () => {
    setNewMealOpen(true)
  }

  const onMealDialogClose = () => {
    setNewMealOpen(false)
  }



  return (
    <Container style={{ minWidth: 300 }}>
      <MainHeader
        title="meals"
        addTitle="addNewMeal"
        onClickAddBtn={openMealDialogCreate}
      />
      <MealsTable onRowClick={onRowClick} />
      <MealEditDialog open={newMealOpen} onClose={onMealDialogClose} />
    </Container>
  )
}

export default Meals