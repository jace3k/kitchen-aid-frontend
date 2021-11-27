import React, { useState } from 'react'
import { Row } from 'react-table'
import { RouteComponentProps } from 'react-router-dom'
import * as routes from 'utils/routes'
import { Container, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Meal } from 'utils/interfaces/meal.interface'
import MealsTable from './MealsTable'
import Token from 'components/Token'
import StyledFab from 'components/genericComponents/StyledFab/StyledFab'
import MealEditDialog from './MealEditDialog'


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
      <h1><Token value="meals" /></h1>
      <MealsTable onRowClick={onRowClick} />
      <Tooltip title={<Token value="addNewMeal" />} placement='left'>
        <StyledFab color="primary" onClick={openMealDialogCreate}>
          <AddIcon />
        </StyledFab>
      </Tooltip>
      <MealEditDialog open={newMealOpen} onClose={onMealDialogClose} />
    </Container>
  )
}

export default Meals