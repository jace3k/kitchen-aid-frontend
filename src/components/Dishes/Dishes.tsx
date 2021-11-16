import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Row } from 'react-table'
import { Tooltip, Container } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Dish } from 'utils/interfaces/dish.interface'
import * as routes from 'utils/routes'
import DishesTable from './DishesTable'
import Token from 'components/Token'
import DishEditDialog from './DishEditDialog'
import StyledFab from 'components/genericComponents/StyledFab/StyledFab'


const Dishes: React.FC<RouteComponentProps> = ({ history }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const onRowClick = (row: Row<Dish>) => {
    history.push(routes.Dishes + '/' + row.original.id)
  }

  const openDishDialogCreate = () => {
    setEditDialogOpen(true)
  }

  const onDishDialogClose = () => {
    setEditDialogOpen(false)
  }

  return (
    <Container style={{ minWidth: 300 }}>
      <h1><Token value="dishes" /></h1>
      <DishesTable onRowClick={onRowClick} />
      <DishEditDialog open={editDialogOpen} onClose={onDishDialogClose} />
      <Tooltip title={<Token value="addNewDish" />} placement='left'>
        <StyledFab color="primary" onClick={openDishDialogCreate}>
          <AddIcon />
        </StyledFab>
      </Tooltip>
    </Container>
  )
}

export default Dishes
