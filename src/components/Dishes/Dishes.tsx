import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import { useStyles } from 'components/Dishes/styles'
import DishInformationPanel from './DishInformationPanel'
import DishesTable from './DishesTable'
import { Dish } from 'store/dishes/types'
import DishRemoveConfirmDialog from './DishRemoveConfirmDialog'
import { fetchAllDishesRequest } from 'store/dishes/actions'
import { useDispatch } from 'react-redux'
import { Row } from 'react-table'

const Dishes = () => {
  const classes = useStyles()
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [dialogDish, setDialogDish] = useState<Dish | null>(null)
  const dispatch = useDispatch()
  const fetchDishes = () => dispatch(fetchAllDishesRequest())

  const handleOpenConfirmDialogRemove = (dish: Dish) => {
    setDialogDish(dish)
    setRemoveDialogOpen(true)
  }


  const rowOnClick = (row: Row<Dish>) => {
    setDialogDish(row.original)
  }


  useEffect(() => {
    fetchDishes()
  }, [])

  return (
    <Container className={classes.detailContainer}>
      <DishesTable
        handleOpenConfirmDialogRemove={handleOpenConfirmDialogRemove}
        className={classes.detailList}
        rowOnClick={rowOnClick}
        selectedDish={dialogDish}
      />
      <DishInformationPanel
        className={classes.detailInformationPanel}
        dish={dialogDish}
      />
      <DishRemoveConfirmDialog
        open={removeDialogOpen}
        onClose={() => setRemoveDialogOpen(false)}
        dish={dialogDish}
      />
    </Container>
  )
}

export default Dishes
