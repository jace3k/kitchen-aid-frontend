import React, { useEffect, useMemo } from 'react'
import { Card, CircularProgress, IconButton, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { CellProps, Column, useTable } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import { useStyles } from './styles'
import { fetchAllIngredientsRequest } from 'store/ingredients/actions'
import { Ingredient } from 'store/ingredients/types'
import { Table } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import RemoveIcon from '@material-ui/icons/Delete'
import Token from 'components/Token'
import DataGrid from 'components/DataGrid/DataGrid'

interface IngredientsTableProps {
  handleEditDialogOpen: (ingredient: Ingredient | null) => void
  handleOpenConfirmDialogRemove: (ingredient: Ingredient) => void
  dialogIngredient: Ingredient | null,
  className?: string,
}

const IngredientsTable = ({ handleEditDialogOpen, handleOpenConfirmDialogRemove, dialogIngredient, className }: IngredientsTableProps) => {
  const dispatch = useDispatch()
  const fetchIngredients = () => dispatch(fetchAllIngredientsRequest())
  const { ingredients, loading } = useSelector((state: ApplicationState) => state.ingredients)

  const columns: Column<Ingredient>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="ingredientNameLabel" />,
      accessor: 'name',
    },
    {
      id: '2',
      Header: <Token value="ingredientDefaultPriceLabel" />,
      accessor: 'defaultPrice',
    },
    {
      id: '3',
      Header: 'Więcej',
      Cell: ({ row }: CellProps<Ingredient>) => {
        return (
          <div style={{ minWidth: 60 }}>
            <IconButton
              size="small"
              onClick={() => handleEditDialogOpen(row.original)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleOpenConfirmDialogRemove(row.original)}
            >
              <RemoveIcon />
            </IconButton>
          </div>
        )
      },
    }
  ], [dialogIngredient])

  useEffect(() => {
    fetchIngredients()
  }, [])

  return (
    <DataGrid
      columns={columns}
      data={ingredients}
      loading={loading}
      className={className}
    />
  )
}

export default IngredientsTable
