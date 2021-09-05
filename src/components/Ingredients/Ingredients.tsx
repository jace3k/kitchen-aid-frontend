import React, { useState } from 'react'
import { Container, Fab, Tooltip } from '@material-ui/core'
import { useStyles as useRetreatStyles } from 'components/Retreats/styles'
import { Ingredient } from 'store/ingredients/types'
import IngredientsTable from './IngredientsTable'
import IngredientEditDialog from './IngredientEditDialog'
import Token from 'components/Token'
import AddIcon from '@material-ui/icons/Add'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import { useDispatch, useSelector } from 'react-redux'
import { deleteIngredientRequest } from 'store/ingredients/actions'
import { ApplicationState } from 'store'

const Ingredients = () => {
  const retreatClasses = useRetreatStyles()
  const dispatch = useDispatch()

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [dialogIngredient, setDialogIngredient] = useState<Ingredient | null>(null)
  const ingredientDetail = useSelector((state: ApplicationState) => state.ingredients.ingredientDetail)

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

  const dialogDescription = () => {
    const usedInDishes = ingredientDetail?.ingredient_ina_dish.map(ing => ing.dish.name)

    if (usedInDishes?.length)
      return <div>
        <Token value="warningIngredientUsed" />
        {usedInDishes?.map(dish => <p key={`key-${dish}`}>{dish}</p>)}
      </div>

    return <Token value="ingredientNotUsed" />
  }

  return (
    <Container style={{ minWidth: 300 }}>
      <h1><Token value="ingredients" /></h1>
      <IngredientsTable
        handleEditDialogOpen={handleIngredientDialogEditOpen}
        handleOpenConfirmDialogRemove={handleOpenConfirmDialogRemove}
        dialogIngredient={dialogIngredient}
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
        description={dialogDescription()}
      />
      <Tooltip title={<Token value="addNewIngredient" />} placement='left'>
        <Fab color="primary" className={retreatClasses.fab} onClick={() => handleIngredientDialogEditOpen(null)}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </Container>
  )
}

export default Ingredients
