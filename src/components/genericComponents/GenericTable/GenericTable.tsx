import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Column, useTable, usePagination, Row, useRowState } from 'react-table'
import { CircularProgress, Paper, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Table } from '@mui/material'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNewTwoTone'
import { ApplicationState } from 'store'
import { ROWS_PER_PAGE_OPTIONS } from 'utils/constants'
import Token from 'components/Token'

interface GenericTableProps {
  columns: Column<any>[],
  data: any[],
  loading: boolean,
  onRowClick?: (row: Row<any>) => void,
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
const EmptyRow = ({ colSpan }: { colSpan: number }) => {

  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" style={{ marginTop: 50 }}>
        <h2><Token value="emptyData" /></h2>
        <AccessibilityNewIcon color="primary" />
      </TableCell>
    </TableRow>
  )
}

const GenericTable = ({ columns, data, loading, onRowClick }: GenericTableProps) => {
  const itemsPerPageFromSettings = useSelector((state: ApplicationState) => state.user.itemsPerPage)
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageFromSettings)
  const [currentPage, setCurrentPage] = useState(0)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, usePagination, useRowState)

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
                      sx={{ fontWeight: 'bold' }}
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
          {loading
            ? <LoadingDataRow colSpan={columns.length} />
            : !rows.length
              ? <EmptyRow colSpan={columns.length} />
              : rows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map(row => {
                prepareRow(row)

                return (
                  <TableRow
                    {...row.getRowProps()}
                    hover
                    onClick={() => {
                      if (onRowClick)
                        onRowClick(row)
                    }}
                    style={{ cursor: onRowClick ? 'pointer' : '' }}
                  >
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
              colSpan={columns.length}
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

export default GenericTable
