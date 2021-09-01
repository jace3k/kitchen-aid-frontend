import React, { useState } from 'react'
import { Container, Fab, Tooltip } from '@material-ui/core'
import { useStyles as useRetreatStyles } from 'components/Retreats/styles'
import { Ingredient } from 'store/ingredients/types'
import IngredientsTable from './IngredientsTable'
import IngredientEditDialog from './IngredientEditDialog'
import DialogRemove from './DialogRemove'
import Token from 'components/Token'
import AddIcon from '@material-ui/icons/Add'

const Ingredients = () => {
  const retreatClasses = useRetreatStyles()

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [dialogIngredient, setDialogIngredient] = useState<Ingredient | null>(null)

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
  const handleCloseConfirmDialogRemove = () => setRemoveDialogOpen(false)

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
        onClose={handleCloseConfirmDialogRemove}
        ingredient={dialogIngredient}
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
