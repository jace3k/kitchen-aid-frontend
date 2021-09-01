import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core'
import Token from 'components/Token'
import React, { useState } from 'react'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column, useTable } from 'react-table'
import { ApplicationState } from 'store'
import { deleteIngredientInADishRequest, updateIngredientInADishRequest } from 'store/dishes/actions'
import { Dish } from 'utils/interfaces/dish.interface'
import { IngredientInADish, IngredientInaDishDto } from 'utils/interfaces/ingredient-ina-dish.interface'
import CloseIcon from '@material-ui/icons/Check'
import RemoveIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'

interface DishDetailIngredientsListProps {
  handleOpenConfirmDialogRemove: (ingredient: IngredientInADish) => void
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

const DishDetailIngredientsList = ({ handleOpenConfirmDialogRemove }: DishDetailIngredientsListProps) => {
  const dispatch = useDispatch()
  const { ingredients, dishDetail, loading } = useSelector((state: ApplicationState) => state.dishes)
  const [currentEdit, setCurrentEdit] = useState<null | IngredientInADish>(null)
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [ingredientRemoveDialogOpen, setIngredientRemoveDialogOpen] = useState(false)

  const handleIngredientUpdate = (ingredient: IngredientInADish, newIngredient: IngredientInaDishDto) => {
    if (ingredient.margin === newIngredient.margin && ingredient.part === newIngredient.part)
      return
    console.log('[handleIngredientUpdate]', newIngredient)
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
      Header: 'Ingredient name',
      Cell: ({ row }: CellProps<IngredientInADish>) => {
        return row.original.ingredient.name
      }
    },
    {
      id: '2',
      Header: 'Margin',
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
      Header: 'Part',
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
      Header: 'More',
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
  ], [currentEdit, currentPage, ingredients]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: ingredients })


  return (
    <>
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
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={4}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onChangePage={(e, newPage) => {
                  setCurrentPage(newPage)
                }}
                onChangeRowsPerPage={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10))
                  setCurrentPage(0)
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {currentEdit && <DialogRemove open={ingredientRemoveDialogOpen} handleRemove={handleIngredientRemove} onClose={onCloseIngredientRemove} elementName={currentEdit.ingredient.name} />}
    </>
  )
}

export default DishDetailIngredientsList
