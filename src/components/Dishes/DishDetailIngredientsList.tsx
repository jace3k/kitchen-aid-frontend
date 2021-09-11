import { CircularProgress, IconButton, TableCell, TableRow, TextField } from '@material-ui/core'
import Token from 'components/Token'
import React, { useState } from 'react'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column } from 'react-table'
import { ApplicationState } from 'store'
import { deleteIngredientInADishRequest, updateIngredientInADishRequest } from 'store/dishes/actions'
import { IngredientInADish, IngredientInaDishDto } from 'utils/interfaces/ingredient-ina-dish.interface'
import CloseIcon from '@material-ui/icons/Check'
import RemoveIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'


const DishDetailIngredientsList = () => {
  const dispatch = useDispatch()
  const { ingredients, loading } = useSelector((state: ApplicationState) => state.dishes)
  const [currentEdit, setCurrentEdit] = useState<null | IngredientInADish>(null)
  const [ingredientRemoveDialogOpen, setIngredientRemoveDialogOpen] = useState(false)

  const handleIngredientUpdate = (ingredient: IngredientInADish, newIngredient: IngredientInaDishDto) => {
    if (ingredient.margin === newIngredient.margin && ingredient.part === newIngredient.part)
      return

    dispatch(updateIngredientInADishRequest(newIngredient))
  }

  const handleIngredientRemove = () => {
    if (!currentEdit)
      return

    dispatch(deleteIngredientInADishRequest(currentEdit.id))
    setIngredientRemoveDialogOpen(false)
    setCurrentEdit(null)
  }

  const onCloseIngredientRemove = () => {
    setIngredientRemoveDialogOpen(false)
  }

  const columns: Column<IngredientInADish>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="ingredientNameLabel" />,
      Cell: ({ row }: CellProps<IngredientInADish>) => {
        return row.original.ingredient.name
      }
    },
    {
      id: '2',
      Header: <Token value="margin" />,
      Cell: ({ row }: CellProps<IngredientInADish>) => {
        const [currentEditMargin, setCurrentEditMargin] = useState<number>(row.original.margin)
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              value={currentEditMargin}
              onChange={(e) => setCurrentEditMargin(parseInt(e.target.value) || 0)}
              onBlur={() => {
                handleIngredientUpdate(row.original, {
                  id: row.original.id,
                  dish: row.original.dish,
                  margin: currentEditMargin,
                  part: row.original.part,
                  ingredient: row.original.ingredient.id,
                })
                setCurrentEdit(null)
              }}
            />
          )
        }
        else {
          return row.original.margin
        }
      }
    },
    {
      id: '3',
      Header: <Token value="part" />,
      Cell: ({ row }: CellProps<IngredientInADish>) => {
        const [currentEditPart, setCurrentEditPart] = useState<number>(row.original.part)
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              value={currentEditPart}
              onChange={(e) => setCurrentEditPart(parseInt(e.target.value) || 0)}
              onBlur={() => {
                handleIngredientUpdate(row.original, {
                  id: row.original.id,
                  dish: row.original.dish,
                  margin: row.original.margin,
                  part: currentEditPart,
                  ingredient: row.original.ingredient.id,
                })
                setCurrentEdit(null)
              }}
            />
          )
        }
        else {
          return row.original.part
        }
      }
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<IngredientInADish>) => {
        return (
          <div style={{ minWidth: 60 }}>
            {
              currentEdit?.id === row.original.id
                ? (
                  <IconButton
                    size="small"
                    onClick={() => setCurrentEdit(null)}
                  >
                    <CloseIcon />
                  </IconButton>
                )
                : (
                  <IconButton
                    size="small"
                    onClick={() => setCurrentEdit(row.original)}
                  >
                    <EditIcon />
                  </IconButton>
                )
            }
            <IconButton
              size="small"
              onClick={() => {
                setCurrentEdit(row.original)
                setIngredientRemoveDialogOpen(true)
              }}
            >
              <RemoveIcon />
            </IconButton>
          </div>
        )
      },
    }
  ], [currentEdit]);

  return (
    <>
      <GenericTable columns={columns} data={ingredients} loading={loading} />
      {currentEdit && <DialogRemove open={ingredientRemoveDialogOpen} handleRemove={handleIngredientRemove} onClose={onCloseIngredientRemove} elementName={currentEdit.ingredient.name} />}
    </>
  )
}

export default DishDetailIngredientsList
