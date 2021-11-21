import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Column, useTable, Row, useRowState, useSortBy, useFilters } from 'react-table'
import { CircularProgress, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Stack, Pagination, IconButton, Badge, styled, Tooltip, Skeleton, Typography } from '@mui/material'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ArrowDropUp from '@mui/icons-material/ArrowDropUp'
import FilterIcon from '@mui/icons-material/FilterAlt'
import RowsPerPageIcon from '@mui/icons-material/ListAlt'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNewTwoTone'
import { ApplicationState } from 'store'
import { ROWS_PER_PAGE_OPTIONS } from 'utils/constants'
import Token from 'components/Token'
import { typography } from '@mui/system'

interface GenericTableProps {
  columns: Column<any>[],
  data: any[],
  loading: boolean,
  onRowClick?: (row: Row<any>) => void,
  lastUpdatedId?: string,
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -4,
    top: 7,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const GenericTable = ({ columns, data, loading, onRowClick, lastUpdatedId }: GenericTableProps) => {
  const itemsPerPageFromSettings = useSelector((state: ApplicationState) => state.user.itemsPerPage)
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageFromSettings)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterRowOn, setIsFilterRowOn] = useState(false)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useFilters, useSortBy, useRowState)

  return (
    <TableContainer component={Paper} variant="elevation">
      <Table {...getTableProps()} size='small'>
        <TableHead>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={3}>
                  <Tooltip placement="top" title={<Token value="onOffFilters" />}>
                    <StyledBadge badgeContent={isFilterRowOn ? "ON" : "OFF"} color={isFilterRowOn ? "success" : "primary"}>
                      <IconButton size="small" onClick={() => setIsFilterRowOn(!isFilterRowOn)}>
                        <FilterIcon />
                      </IconButton>
                    </StyledBadge>
                  </Tooltip>
                  <Tooltip placement="top" title={<Token value="changeRowsPerPage" />}>
                    <StyledBadge badgeContent={rowsPerPage} color="primary" max={100}>
                      <IconButton size="small" onClick={() => {
                        // change rows per page
                        const index = ROWS_PER_PAGE_OPTIONS.findIndex(v => v === rowsPerPage)

                        if (index === ROWS_PER_PAGE_OPTIONS.length - 1) {
                          setRowsPerPage(ROWS_PER_PAGE_OPTIONS[0])
                        }
                        else {
                          setRowsPerPage(ROWS_PER_PAGE_OPTIONS[index + 1])
                        }
                      }}>
                        <RowsPerPageIcon />
                      </IconButton>
                    </StyledBadge>
                  </Tooltip>
                </Stack >
                <Pagination color="primary" count={Math.ceil(rows.length / rowsPerPage)} page={currentPage} onChange={(e, v) => setCurrentPage(v)} />
                <div></div>
              </Stack>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableHead>
          {
            headerGroups.map((headerGroup, i) => (
              <React.Fragment key={`table-head-keyx-${i}`}>
                <TableRow {...headerGroup.getHeaderGroupProps()} key={`table-head-keyz-${i}`}>
                  {
                    headerGroup.headers.map(column => (
                      <TableCell {...column.getHeaderProps()} sx={{ fontWeight: 'bold' }}>
                        <Stack direction="row" justifyContent={column.id === '99' ? 'end' : 'start'} {...column.getSortByToggleProps()}>
                          {column.render('Header')}
                          {column.isSorted
                            ? column.isSortedDesc
                              ? <ArrowDropDown />
                              : <ArrowDropUp />
                            : ''}
                        </Stack>

                      </TableCell>
                    ))
                  }
                </TableRow>
                {isFilterRowOn && (
                  <TableRow {...headerGroup.getHeaderGroupProps()} key={`table-head-keyp-${i}`}>
                    {
                      headerGroup.headers.map(column => (
                        <TableCell {...column.getHeaderProps()}>
                          <div>{(column.canFilter && column.Filter) ? column.render('Filter') : null}</div>
                        </TableCell>
                      ))
                    }
                  </TableRow>
                )}
              </React.Fragment>
            ))
          }
        </TableHead>

        <TableBody {...getTableBodyProps()}>
          {(loading && !rows.length)
            ? <LoadingDataRow colSpan={columns.length} />
            : !rows.length
              ? <EmptyRow colSpan={columns.length} />
              : rows.slice((currentPage - 1) * rowsPerPage, (currentPage - 1) * rowsPerPage + rowsPerPage).map(row => {
                prepareRow(row)

                return (
                  <TableRow
                    {...row.getRowProps()}
                    hover
                    onClick={() => {
                      if (onRowClick)
                        onRowClick(row)
                    }}
                    style={{ cursor: onRowClick ? 'pointer' : '', opacity: (loading && lastUpdatedId === row.id) ? '.5' : '' }}
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

      </Table>
    </TableContainer>
  )
}

export default GenericTable
