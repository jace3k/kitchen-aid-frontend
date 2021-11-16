import React, { useEffect, useMemo, useState } from 'react'
import { IconButton, Stack, TextField, Typography } from '@mui/material'
import { CellProps, Column } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'
import CloseIcon from '@mui/icons-material/Check'
import RemoveIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { ApplicationState } from 'store'
import { fetchAllIngredientsRequest, fetchIngredientDetailRequest, updateIngredientRequest } from 'store/ingredients/actions'
import { Ingredient } from 'store/ingredients/types'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import Token from 'components/Token'


interface IngredientsTableProps {
  handleOpenConfirmDialogRemove: (ingredient: Ingredient) => void
}

const IngredientsTable = ({ handleOpenConfirmDialogRemove }: IngredientsTableProps) => {
  const dispatch = useDispatch()
  const fetchIngredients = () => dispatch(fetchAllIngredientsRequest())
  const { ingredients, loading } = useSelector((state: ApplicationState) => state.ingredients);
  const [currentEdit, setCurrentEdit] = useState<null | Ingredient>(null)

  useEffect(() => {
    fetchIngredients()
  }, [])

  const handleIngredientNameUpdate = (ingredient: Ingredient, newIngredientName: string) => {
    if (ingredient.name === newIngredientName)
      return

    dispatch(updateIngredientRequest(ingredient.id, newIngredientName))
  }

  const columns: Column<Ingredient>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="ingredientNameLabel" />,
      Cell: ({ row }: CellProps<Ingredient>) => {
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              size="small"
              sx={{ minWidth: 150 }}
              value={row.state.currentEditName || row.original.name}
              onChange={event => {
                row.setState((state: any) => ({ ...state, currentEditName: event.target.value }))
              }}
            />
          )
        }
        else {
          return (
            <Typography sx={{ minWidth: 150 }}>
              {row.original.name}
            </Typography>
          )
        }
      }
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<Ingredient>) => {
        return (
          <Stack direction="row" justifyContent="end">
            {
              currentEdit?.id === row.original.id
                ? (
                  <IconButton
                    size="small"
                    onClick={() => {
                      setCurrentEdit(null)
                      const ingredientName = row.state.currentEditName as string || row.original.name
                      handleIngredientNameUpdate(row.original, ingredientName)
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
                dispatch(fetchIngredientDetailRequest(row.original.id))
                handleOpenConfirmDialogRemove(row.original)

              }}
            >
              <RemoveIcon />
            </IconButton>
          </Stack>
        )
      },
    }
  ], [currentEdit])

  return <GenericTable columns={columns} data={ingredients} loading={loading} />
}

export default IngredientsTable
