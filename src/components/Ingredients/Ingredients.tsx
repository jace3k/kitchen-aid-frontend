import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@mui/material'
import { ApplicationState } from 'store'
import { Ingredient } from 'store/ingredients/types'
import { deleteIngredientRequest } from 'store/ingredients/actions'
import IngredientsTable from './IngredientsTable'
import IngredientEditDialog from './IngredientEditDialog'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import DialogRemoveDescription from 'components/genericComponents/DialogRemove/DialogRemoveDescription'
import MainHeader from 'components/genericComponents/MainHeader/MainHeader'


const Ingredients = () => {
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
      <MainHeader
        title="ingredients"
        addTitle="addNewIngredient"
        onClickAddBtn={() => handleIngredientDialogEditOpen(null)}
      />
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
    </Container>
  )
}

export default Ingredients
