import React, { useEffect, useMemo } from 'react'
import { CircularProgress, IconButton, Paper, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core'
import { CellProps, Column, useTable, usePagination } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import { useStyles } from './styles'
import { fetchAllIngredientsRequest, fetchIngredientDetailRequest, updateIngredientRequest } from 'store/ingredients/actions'
import { Ingredient } from 'store/ingredients/types'
import { Table } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Check'
import RemoveIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Token from 'components/Token'
import { useState } from 'react'
import { ROWS_PER_PAGE_OPTIONS } from 'utils/constants'

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

const IngredientsTable = ({ handleOpenConfirmDialogRemove }: IngredientsTableProps) => {
  const dispatch = useDispatch()
  const fetchIngredients = () => dispatch(fetchAllIngredientsRequest())
  const { ingredients, loading } = useSelector((state: ApplicationState) => state.ingredients);
  const itemsPerPageFromSettings = useSelector((state: ApplicationState) => state.user.itemsPerPage)
  const [currentEdit, setCurrentEdit] = useState<null | Ingredient>(null)
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageFromSettings)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    fetchIngredients()
  }, [])

  const handleIngredientNameUpdate = (ingredient: Ingredient, newIngredientName: string) => {
    if (ingredient.name === newIngredientName)
      return

    console.log('UPDATED!')
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
  ], [currentEdit, currentPage])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: ingredients }, usePagination)

  return (
    <TableContainer component={Paper} variant="elevation" square>
      <Table {...getTableProps()} size='small' >
        <TableHead>
          {
            headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps()}
                      align={column.id === '99' ? 'right' : 'left'}
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
          {loading ? <LoadingDataRow /> : rows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map(row => {
            prepareRow(row)

            return (
              <TableRow {...row.getRowProps()}>
                {
                  row.cells.map(cell => {

                    return (
                      <TableCell
                        width={100}
                        {...cell.getCellProps()}
                        align={cell.column.id === '99' ? 'right' : 'left'}
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
        <TableFooter>
          <TableRow>
            <TablePagination
              labelRowsPerPage={<Token value="rowsPerPage" />}
              rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={(e, newPage) => {
                setCurrentPage(newPage)
              }}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10))
                setCurrentPage(0)
              }}
              labelDisplayedRows={info => <>{`${info.from}-${info.to}`} <Token value="total" /> {info.count}</>}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default IngredientsTable
