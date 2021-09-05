import React, { useEffect, useState } from 'react'
import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core'
import Token from 'components/Token'
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
import NewTabIcon from '@material-ui/icons/OpenInNew'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import { ROWS_PER_PAGE_OPTIONS } from 'utils/constants'
import { DishInaMeal } from 'utils/interfaces/dish-ina-meal.interface'
import { deleteDishInAMealRequest } from 'store/meals/actions'

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

const MealDetailDishList = () => {
  const dispatch = useDispatch()
  const { dishes, mealDetail, loading } = useSelector((state: ApplicationState) => state.meals)
  const itemsPerPageFromSettings = useSelector((state: ApplicationState) => state.user.itemsPerPage)
  const [currentEdit, setCurrentEdit] = useState<null | DishInaMeal>(null)
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageFromSettings);
  const [currentPage, setCurrentPage] = useState(0);
  const [dishRemoveDialogOpen, setDishRemoveDialogOpen] = useState(false)

  const handleDishRemove = () => {
    if (!currentEdit)
      return

    dispatch(deleteDishInAMealRequest(currentEdit.id))
    setDishRemoveDialogOpen(false)
    setCurrentEdit(null)
  }

  const onCloseDishRemove = () => {
    setDishRemoveDialogOpen(false)
  }

  const columns: Column<DishInaMeal>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="dishNameLabel" />,
      Cell: ({ row }: CellProps<DishInaMeal>) => {
        return row.original.dish.name
      }
    },
    {
      id: '2',
      Header: <Token value="size" />,
      Cell: ({ row }: CellProps<DishInaMeal>) => {
        return row.original.dish.size
      }
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<DishInaMeal>) => {
        return (
          <div style={{ minWidth: 60 }}>
            {/* currently no edit options in DishInaMeal */}
            {/* {
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
            } */}
            <IconButton
              size="small"
              onClick={() => {
                const id = row.original.dish.id
                console.log(id)
                window.open(`/dishes/${row.original.dish.id}`, '_blank')
              }}
            >
              <NewTabIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                setCurrentEdit(row.original)
                setDishRemoveDialogOpen(true)
              }}
            >
              <RemoveIcon />
            </IconButton>
          </div>
        )
      }
    }
  ], [currentEdit, currentPage, dishes])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: dishes })

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
                rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                colSpan={4}
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
      {currentEdit && <DialogRemove open={dishRemoveDialogOpen} handleRemove={handleDishRemove} onClose={onCloseDishRemove} elementName={currentEdit.dish.name} />}
    </>
  )
}

export default MealDetailDishList
