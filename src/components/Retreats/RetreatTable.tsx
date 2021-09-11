import React, { useEffect, useMemo, useState } from 'react'
import { CellProps, Column, Row, usePagination, useTable } from 'react-table'
import { Retreat } from 'utils/interfaces/retreat.interface'
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import Token from 'components/Token'
import { fetchAllRetreatsRequest } from 'store/retreats/actions'
import { ROWS_PER_PAGE_OPTIONS } from 'utils/constants'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'

interface RetreatTableProps {
  onRowClick: (row: Row<Retreat>) => void
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


const RetreatTable = ({ onRowClick }: RetreatTableProps) => {
  const dispatch = useDispatch()
  const { retreats, loading } = useSelector((state: ApplicationState) => state.retreats)
  // const itemsPerPageFromSettings = useSelector((state: ApplicationState) => state.user.itemsPerPage)
  // const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageFromSettings);
  // const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchAllRetreatsRequest())
  }, [])

  const columns: Column<Retreat>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="name" />,
      accessor: 'name',
    },
  ], [])

  return <GenericTable columns={columns} data={retreats} loading={loading} onRowClick={onRowClick} />

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  // } = useTable({ columns, data: retreats }, usePagination)



  // return (
  //   <TableContainer component={Paper} variant="elevation" square>
  //     <Table {...getTableProps()} size='small'>
  //       <TableHead>
  //         {
  //           headerGroups.map(headerGroup => (
  //             <TableRow {...headerGroup.getHeaderGroupProps()}>
  //               {
  //                 headerGroup.headers.map(column => (
  //                   <TableCell {...column.getHeaderProps()}
  //                     align={column.id === '99' ? 'right' : 'left'}
  //                   >
  //                     {column.render('Header')}
  //                   </TableCell>
  //                 ))
  //               }
  //             </TableRow>
  //           ))
  //         }
  //       </TableHead>
  //       <TableBody {...getTableBodyProps()}>
  //         {loading ? <LoadingDataRow /> : rows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map(row => {
  //           prepareRow(row)

  //           return (
  //             <TableRow hover onClick={() => { onRowClick(row) }} {...row.getRowProps()} style={{ cursor: 'pointer' }}>
  //               {
  //                 row.cells.map(cell => {

  //                   return (
  //                     <TableCell
  //                       width={100}
  //                       {...cell.getCellProps()}
  //                       align={cell.column.id === '99' ? 'right' : 'left'}
  //                     >
  //                       {cell.render('Cell')}
  //                     </TableCell>
  //                   )
  //                 })
  //               }
  //             </TableRow>
  //           )
  //         })
  //         }
  //       </TableBody>
  //       <TableFooter>
  //         <TableRow>
  //           <TablePagination
  //             labelRowsPerPage={<Token value="rowsPerPage" />}
  //             rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
  //             colSpan={3}
  //             count={rows.length}
  //             rowsPerPage={rowsPerPage}
  //             page={currentPage}
  //             onPageChange={(e, newPage) => {
  //               setCurrentPage(newPage)
  //             }}
  //             onRowsPerPageChange={(e) => {
  //               setRowsPerPage(parseInt(e.target.value, 10))
  //               setCurrentPage(0)
  //             }}
  //             labelDisplayedRows={info => <>{`${info.from}-${info.to}`} <Token value="total" /> {info.count}</>}
  //           />
  //         </TableRow>
  //       </TableFooter>
  //     </Table>
  //   </TableContainer>
  // )
}

export default RetreatTable
