import React, { useEffect, useMemo, useState } from 'react'
import { Typography } from '@mui/material'
import { CellProps, Column, Row } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import { fetchAllIngredientsRequest, fetchIngredientDetailRequest, updateIngredientRequest } from 'store/ingredients/actions'
import { Ingredient } from 'store/ingredients/types'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import Token from 'components/Token'
import TextFilter from 'components/genericComponents/Filters/TextFilter'
import { v } from 'utils/helper'
import CellTextField from 'components/genericComponents/CellTextField/CellTextField'
import CellMore from 'components/genericComponents/CellMore/CellMore'


interface IngredientsTableProps {
  handleOpenConfirmDialogRemove: (ingredient: Ingredient) => void
}

const IngredientsTable = ({ handleOpenConfirmDialogRemove }: IngredientsTableProps) => {
  const dispatch = useDispatch()
  const fetchIngredients = () => dispatch(fetchAllIngredientsRequest())
  const { ingredients, loading } = useSelector((state: ApplicationState) => state.ingredients);
  const [currentEdit, setCurrentEdit] = useState<null | Ingredient>(null)
  const [lastUpdatedId, setLastUpdatedId] = useState<string | undefined>()

  useEffect(() => {
    fetchIngredients()
  }, [])

  const handleIngredientNameUpdate = (ingredient: Ingredient, newIngredientName: string) => {
    if (ingredient.name === newIngredientName)
      return

    dispatch(updateIngredientRequest(ingredient.id, newIngredientName))
  }

  const handleUpdate = (row: Row<Ingredient>) => {
    setCurrentEdit(null)
    setLastUpdatedId(row.id)
    const ingredientName = row.state.currentEditName as string || row.original.name
    handleIngredientNameUpdate(row.original, ingredientName)
  }

  const columns: Column<Ingredient>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="ingredientNameLabel" />,
      accessor: 'name',
      sortType: (a: Row<Ingredient>, b: Row<Ingredient>) => {
        return a.original.name.toLowerCase().localeCompare(b.original.name.toLowerCase())
      },
      Cell: ({ row }: CellProps<Ingredient>) => {
        if (currentEdit?.id === row.original.id) {
          return (
            <CellTextField
              value={v(row.state.currentEditName, row.original.name)}
              onChange={event => { row.setState((state: any) => ({ ...state, currentEditName: event.target.value })) }}
              handleUpdate={() => handleUpdate(row)}
            />
          )
        }
        else {
          return (
            <Typography variant="body2" sx={{ minWidth: 150 }}>
              {row.original.name}
            </Typography>
          )
        }
      },
      Filter: TextFilter,
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<Ingredient>) => {
        return <CellMore canEdit canRemove
          handleUpdate={() => handleUpdate(row)}
          handleClose={() => setCurrentEdit(null)}
          handleEdit={() => setCurrentEdit(row.original)}
          handleRemove={() => {
            dispatch(fetchIngredientDetailRequest(row.original.id))
            handleOpenConfirmDialogRemove(row.original)
          }}
          editMode={currentEdit?.id === row.original.id}
          loading={loading}
        />
      },
    }
  ], [currentEdit, loading])

  return <GenericTable columns={columns} data={ingredients} loading={loading} lastUpdatedId={lastUpdatedId} />
}

export default IngredientsTable
