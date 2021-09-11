import React, { useState } from 'react'
import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core'
import Token from 'components/Token'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column, useTable } from 'react-table'
import { ApplicationState } from 'store'
import CloseIcon from '@material-ui/icons/Check'
import RemoveIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import NewTabIcon from '@material-ui/icons/OpenInNew'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import { ROWS_PER_PAGE_OPTIONS } from 'utils/constants'
import { MealInaRetreat, MealInaRetreatDto } from 'utils/interfaces/meal-ina-retreat.interface'
import { removeMealRequest, updateMealRequest } from 'store/retreats/actions'
import MealName from 'components/Meals/MealName'

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

const RetreatDetailMealList = () => {
  const dispatch = useDispatch()
  const { meals, retreatDetail, loading } = useSelector((state: ApplicationState) => state.retreats)
  const itemsPerPageFromSettings = useSelector((state: ApplicationState) => state.user.itemsPerPage)
  const [currentEdit, setCurrentEdit] = useState<null | MealInaRetreat>(null)
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageFromSettings);
  const [currentPage, setCurrentPage] = useState(0);
  const [mealRemoveDialogOpen, setMealRemoveDialogOpen] = useState(false)

  const handleMealRemove = () => {
    if (!currentEdit)
      return

    dispatch(removeMealRequest(currentEdit.id))
    setMealRemoveDialogOpen(false)
    setCurrentEdit(null)
  }

  const onCloseMealRemove = () => {
    setMealRemoveDialogOpen(false)
  }

  const handleMealUpdate = (meal: MealInaRetreat, newMeal: MealInaRetreatDto) => {
    if (meal.servings === newMeal.servings && meal.date === newMeal.date)
      return

    console.log('[handleMealUpdate]', newMeal)
    dispatch(updateMealRequest(newMeal))
  }

  const columns: Column<MealInaRetreat>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="mealLabel" />,
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
        return <MealName id={row.original.meal.id} type={row.original.meal.type} />
      }
    },
    {
      id: '2',
      Header: <Token value="servings" />,
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
        const [currentEditServings, setCurrentEditServings] = useState<number>(row.original.servings)
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              value={currentEditServings}
              onChange={(e) => setCurrentEditServings(parseInt(e.target.value) || 0)}
              onBlur={() => {
                handleMealUpdate(row.original, {
                  id: row.original.id,
                  meal: row.original.meal.id,
                  retreat: row.original.retreat,
                  servings: currentEditServings,
                  date: row.original.date,
                })
                setCurrentEdit(null)
              }}
            />
          )
        }
        else {
          return row.original.servings
        }
      }
    },
    {
      id: '3',
      Header: <Token value="date" />,
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
        const [currentEditDate, setCurrentEditDate] = useState(row.original.date)
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              value={currentEditDate}
              onChange={(e) => setCurrentEditDate(e.target.value)}
              onBlur={() => {
                handleMealUpdate(row.original, {
                  id: row.original.id,
                  meal: row.original.meal.id,
                  retreat: row.original.retreat,
                  servings: row.original.servings,
                  date: currentEditDate,
                })
                setCurrentEdit(null)
              }}
            />
          )
        }
        else {
          return row.original.date
        }
      }
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
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
                const id = row.original.meal.id
                console.log(id)
                window.open(`/meals/${id}`, '_blank')
              }}
            >
              <NewTabIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                setCurrentEdit(row.original)
                setMealRemoveDialogOpen(true)
              }}
            >
              <RemoveIcon />
            </IconButton>
          </div>
        )
      }
    }
  ], [currentEdit, currentPage, meals])
  

  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: meals })

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
      {currentEdit && <DialogRemove open={mealRemoveDialogOpen} handleRemove={handleMealRemove} onClose={onCloseMealRemove} elementName={currentEdit.meal.type} />}
    </>
  )
}

export default RetreatDetailMealList