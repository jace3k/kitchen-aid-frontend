import { TableContainer, Card, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@material-ui/core'
import Token from 'components/Token'
import React from 'react'
import { Column, Row, useTable } from 'react-table'
import { Ingredient } from 'store/ingredients/types'
import { Retreat } from 'store/retreats/types'

interface DataGridProps {
  columns: Column<any>[],
  className?: string,
  data: any[],
  loading: boolean,
  rowOnClick?: (row: Row<any>) => void,
  selectedRow?: any & { id: number },
}

const LoadingDataRow = ({ colSpan }: { colSpan: number }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" style={{ marginTop: 50 }}>
        <h2><Token value="loadingData" /></h2>
        <CircularProgress />
      </TableCell>
    </TableRow>
  )
}

const Empty = ({ colSpan }: { colSpan: number }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" style={{ marginTop: 50 }}>
        <h2>Pusto</h2>
      </TableCell>
    </TableRow>
  )
}

const DataGrid = ({ columns, className, data, loading, rowOnClick, selectedRow }: DataGridProps) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <TableContainer component={Card} className={className} style={{ width: 'auto' }}>
      <Table {...getTableProps()} size='small'>
        <TableHead>
          {
            headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps()}
                      align={column.id === '3' ? 'right' : 'left'}
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
          {loading && <LoadingDataRow colSpan={columns.length} />}
          {rows.length === 0 && !loading && <Empty colSpan={columns.length} />}
          {
            rows.map(row => {

              prepareRow(row)

              return (
                <TableRow {...row.getRowProps()}
                  selected={selectedRow?.id === row.original.id}
                  hover={true}
                  onClick={() => {
                    if (rowOnClick)
                      rowOnClick(row)
                  }}>
                  {
                    row.cells.map(cell => {

                      return (
                        <TableCell
                          width={100}
                          {...cell.getCellProps()}
                          align={cell.column.id === '3' ? 'right' : 'left'}
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

export default DataGrid
