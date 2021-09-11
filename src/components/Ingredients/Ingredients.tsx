import React, { useState } from 'react'
import { Container, Fab, Tooltip } from '@material-ui/core'
import { Ingredient } from 'store/ingredients/types'
import IngredientsTable from './IngredientsTable'
import IngredientEditDialog from './IngredientEditDialog'
import Token from 'components/Token'
import AddIcon from '@material-ui/icons/Add'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import { useDispatch, useSelector } from 'react-redux'
import { deleteIngredientRequest } from 'store/ingredients/actions'
import { ApplicationState } from 'store'
import DialogRemoveDescription from 'components/genericComponents/DialogRemove/DialogRemoveDescription'
import { useStyles } from 'components/genericComponents/styles'

const Ingredients = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [dialogIngredient, setDialogIngredient] = useState<Ingredient | null>(null)
  const { ingredientDetail, loadingDetail } = useSelector((state: ApplicationState) => state.ingredients)

  const handleIngredientDialogEditOpen = (ingredient: Ingredient | null) => {
    setDialogIngredient(ingredient)
    setEditDialogOpen(true)
  }

  const handleIngredientDialogEditClose = () => {
    setEditDialogOpen(false)
  }

  const handleOpenConfirmDialogRemove = (ingredient: Ingredient) => {
    setDialogIngredient(ingredient)
    setRemoveDialogOpen(true)
  }

  const handleCloseConfirmDialogRemove = () => {
    setRemoveDialogOpen(false)
  }

  const handleRemoveIngredient = () => {
    dispatch(deleteIngredientRequest(dialogIngredient ? dialogIngredient.id : 0))
    handleCloseConfirmDialogRemove()
  }

  const dialogRemoveDescription = () => {
    const usedInDishes = ingredientDetail?.ingredient_ina_dish.map(ing => ing.dish.name)
    return <DialogRemoveDescription
      usedInElements={usedInDishes}
      loading={loadingDetail}
      headerUsed="warningIngredientUsed"
      headerUnused="ingredientNotUsed"
    />
  }

  return (
    <Container style={{ minWidth: 300 }}>
      <h1><Token value="ingredients" /></h1>
      <IngredientsTable
        handleOpenConfirmDialogRemove={handleOpenConfirmDialogRemove}
      />
      <IngredientEditDialog
        open={editDialogOpen}
        onClose={handleIngredientDialogEditClose}
        ingredient={dialogIngredient}
      />
      <DialogRemove
        open={removeDialogOpen}
        handleRemove={handleRemoveIngredient}
        onClose={handleCloseConfirmDialogRemove}
        elementName={dialogIngredient ? dialogIngredient.name : ''}
        description={dialogRemoveDescription()}
      />
      <Tooltip title={<Token value="addNewIngredient" />} placement='left'>
        <Fab color="primary" className={classes.fab} onClick={() => handleIngredientDialogEditOpen(null)}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </Container>
  )
}

export default Ingredients
