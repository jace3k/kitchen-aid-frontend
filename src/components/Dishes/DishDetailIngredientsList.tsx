import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column } from 'react-table'
import { IconButton, Stack, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Check'
import RemoveIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { ApplicationState } from 'store'
import { deleteIngredientInADishRequest, updateIngredientInADishRequest } from 'store/dishes/actions'
import { IngredientInADish, IngredientInaDishDto } from 'utils/interfaces/ingredient-ina-dish.interface'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import Token from 'components/Token'


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
        return (
          <Typography sx={{ minWidth: 150 }}>
            {row.original.ingredient.name}
          </Typography>
        )
      }
    },
    {
      id: '2',
      Header: <Token value="margin" />,
      Cell: ({ row }: CellProps<IngredientInADish>) => {
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              size="small"
              type="number"
              sx={{ minWidth: 150 }}
              value={row.state.currentEditMargin || row.original.margin}
              onChange={event => {
                row.setState((state: any) => ({ ...state, currentEditMargin: event.target.value }))
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
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              size="small"
              type="number"
              sx={{ minWidth: 150 }}
              value={row.state.currentEditPart || row.original.part}
              onChange={event => {
                row.setState((state: any) => ({ ...state, currentEditPart: event.target.value }))
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
          <Stack direction="row" justifyContent="end">
            {
              currentEdit?.id === row.original.id
                ? (
                  <IconButton
                    size="small"
                    onClick={() => {
                      setCurrentEdit(null)
                      const newIngredient = {
                        id: row.original.id,
                        dish: row.original.dish,
                        ingredient: row.original.ingredient.id,
                        margin: row.state.currentEditMargin as number || row.original.margin,
                        part: row.state.currentEditPart as number || row.original.part,
                      }
                      handleIngredientUpdate(row.original, newIngredient)
                    }}
                  >
                    <CloseIcon color="success" />
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
          </Stack>
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
