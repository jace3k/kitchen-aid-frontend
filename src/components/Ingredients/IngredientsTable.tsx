import React, { useEffect, useMemo } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import { CellProps, Column } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import { fetchAllIngredientsRequest, fetchIngredientDetailRequest, updateIngredientRequest } from 'store/ingredients/actions'
import { Ingredient } from 'store/ingredients/types'
import CloseIcon from '@material-ui/icons/Check'
import RemoveIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Token from 'components/Token'
import { useState } from 'react'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'

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
        const [currentEditName, setCurrentEditName] = useState<string>(row.original.name)
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              value={currentEditName}
              onChange={(e) => setCurrentEditName(e.target.value)}
              onBlur={() => {
                handleIngredientNameUpdate(row.original, currentEditName)
                setCurrentEdit(null)
              }}
            />
          )
        }
        else {
          return row.original.name
        }
      }
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<Ingredient>) => {
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
                dispatch(fetchIngredientDetailRequest(row.original.id))
                handleOpenConfirmDialogRemove(row.original)

              }}
            >
              <RemoveIcon />
            </IconButton>
          </div>
        )
      },
    }
  ], [currentEdit])

  return <GenericTable columns={columns} data={ingredients} loading={loading} />
}

export default IngredientsTable
