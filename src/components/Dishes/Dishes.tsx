import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import DishesTable from './DishesTable'
import Token from 'components/Token'
import { RouteComponentProps } from 'react-router-dom'
import { Row } from 'react-table'
import { Dish } from 'utils/interfaces/dish.interface'
import * as routes from 'utils/routes'
import { Fab, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useStyles } from 'components/genericComponents/styles'
import DishEditDialog from './DishEditDialog'

const Dishes: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles()
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
        <Fab color="primary" className={classes.fab} onClick={openDishDialogCreate}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </Container>
  )
}

export default Dishes
