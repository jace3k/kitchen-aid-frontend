import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Row } from 'react-table'
import { Container } from '@mui/material'
import { Dish } from 'utils/interfaces/dish.interface'
import * as routes from 'utils/routes'
import DishesTable from './DishesTable'
import DishEditDialog from './DishEditDialog'
import MainHeader from 'components/genericComponents/MainHeader/MainHeader'


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
      <MainHeader
        title="dishes"
        addTitle="addNewDish"
        onClickAddBtn={openDishDialogCreate}
      />
      <DishesTable onRowClick={onRowClick} />
      <DishEditDialog open={editDialogOpen} onClose={onDishDialogClose} />
    </Container>
  )
}

export default Dishes
