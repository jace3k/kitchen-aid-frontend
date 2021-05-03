import React, { useEffect, useMemo } from 'react'
import { CircularProgress, IconButton, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
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

interface IngredientsTableProps {
  handleEditDialogOpen: (ingredient: Ingredient | null) => void
  handleOpenConfirmDialogRemove: (ingredient: Ingredient) => void
  dialogIngredient: Ingredient | null,
}

const LoadingDataRow = () => {

  return (
    <TableRow>
      <TableCell colSpan={3} align="center" style={{ marginTop: 50 }}>
        <h2><Token value="loadingData" /></h2>
        <CircularProgress />
      </TableCell>
    </TableRow>
  )
}

const IngredientsTable = ({ handleEditDialogOpen, handleOpenConfirmDialogRemove, dialogIngredient }: IngredientsTableProps) => {
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
      Header: <Token value="more" />,
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


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: ingredients })

  useEffect(() => {
    fetchIngredients()
  }, [])

  return (
    <TableContainer component={Paper} variant="elevation" square>
      <Table {...getTableProps()} size='small'>
        <TableHead>
          {
            headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps()}
                      align={column.id === '2' ? 'right' : 'left'}
                    >
                      {column.render('Header')}
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {loading ? <LoadingDataRow /> : rows.map(row => {
              prepareRow(row)

              return (
                <TableRow {...row.getRowProps()}>
                  {
                    row.cells.map(cell => {

                      return (
                        <TableCell
                          width={100}
                          {...cell.getCellProps()}
                          align={cell.column.id === '2' ? 'right' : 'left'}
                        >
                          {cell.render('Cell')}
                        </TableCell>
                      )
                    })
                  }
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default IngredientsTable
