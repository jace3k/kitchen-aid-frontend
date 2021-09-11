import React, { useEffect, useMemo, useState } from 'react'
import Token from 'components/Token'
import { CellProps, Column, Row, useTable } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import { Table } from '@material-ui/core'
import { CircularProgress, Paper, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core'
import { ROWS_PER_PAGE_OPTIONS } from 'utils/constants'
import { Meal } from 'utils/interfaces/meal.interface'
import { fetchAllMealsRequest } from 'store/meals/actions'
import MealName from './MealName'

interface MealsTableProps {
  onRowClick: (row: Row<Meal>) => void
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


const MealsTable = ({ onRowClick }: MealsTableProps) => {
  const dispatch = useDispatch()
  const { meals, loading } = useSelector((state: ApplicationState) => state.meals)
  const itemsPerPageFromSettings = useSelector((state: ApplicationState) => state.user.itemsPerPage)
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageFromSettings);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchAllMealsRequest())
  }, [])

  const columns: Column<Meal>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="mealLabel" />,
      Cell: ({ row }: CellProps<Meal>) => {
        return <MealName id={row.original.id} type={row.original.type} />
      }
    }
  ], [meals])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: meals })

  return (
    <div>
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
                <TableRow hover onClick={() => { onRowClick(row) }} {...row.getRowProps()} style={{ cursor: 'pointer' }}>
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
    </div>
  )
}

export default MealsTable
