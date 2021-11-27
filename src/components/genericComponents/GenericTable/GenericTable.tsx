import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Column, useTable, Row, useRowState, useSortBy, useFilters, useGroupBy } from 'react-table'
import { CircularProgress, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Stack, Pagination, IconButton, Badge, styled, Tooltip, useMediaQuery } from '@mui/material'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ArrowDropUp from '@mui/icons-material/ArrowDropUp'
import FilterIcon from '@mui/icons-material/FilterAlt'
import RowsPerPageIcon from '@mui/icons-material/ListAlt'
import GroupByDateButton from '@mui/icons-material/DateRangeOutlined'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNewTwoTone'
import { ApplicationState } from 'store'
import { ROWS_PER_PAGE_OPTIONS } from 'utils/constants'
import Token from 'components/Token'
import GenericRow from './GenericRow'
import GenericRowGroup from './GenericRowGroup'
import { setGroupByView } from 'store/user/actions'

interface GenericTableProps {
  columns: Column<any>[]
  data: any[]
  loading: boolean
  onRowClick?: (row: Row<any>) => void
  lastUpdatedId?: string
  hasGroupBy?: string
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

const GenericTable = ({ columns, data, loading, onRowClick, lastUpdatedId, hasGroupBy }: GenericTableProps) => {
  const isDesktop = useMediaQuery('(min-width:960px)')
  const dispatch = useDispatch()
  const itemsPerPageFromSettings = useSelector((state: ApplicationState) => state.user.itemsPerPage)
  const groupedByViews = useSelector((state: ApplicationState) => state.user.groupByViews)
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageFromSettings)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterRowOn, setIsFilterRowOn] = useState(false)

  const isGroupByViewFromStore = groupedByViews.find(x => x === location.pathname)
  const initialState = { groupBy: (isGroupByViewFromStore && hasGroupBy) ? [hasGroupBy] : [] }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    toggleGroupBy,
  } = useTable({ columns, data, initialState }, useFilters, useRowState, useGroupBy, useSortBy)


  useEffect(() => {
    if (rows.some(x => x.isGrouped))
      console.log('GRUPPED')
  }, [rows])

  const isGroupByView = rows.some(x => x.isGrouped)

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
                      <IconButton disabled={loading} size="small" onClick={() => setIsFilterRowOn(!isFilterRowOn)}>
                        <FilterIcon />
                      </IconButton>
                    </StyledBadge>
                  </Tooltip>
                  {hasGroupBy && (
                    <Tooltip placement="top" title={<Token value="toggleGroupByView" />}>
                      <StyledBadge badgeContent={isGroupByView ? "ON" : "OFF"} color={isGroupByView ? "success" : "primary"}>
                        <IconButton disabled={loading} size="small" onClick={() => {
                          dispatch(setGroupByView(location.pathname, !isGroupByView))
                          toggleGroupBy(hasGroupBy, !isGroupByView)
                        }}>
                          <GroupByDateButton />
                        </IconButton>
                      </StyledBadge>
                    </Tooltip>
                  )}
                  <Tooltip placement="top" title={<Token value="changeRowsPerPage" />}>
                    <StyledBadge badgeContent={rowsPerPage} color="primary" max={100}>
                      <IconButton disabled={loading} size="small" onClick={() => {
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
                <Pagination
                  color="primary"
                  count={Math.ceil(rows.length / rowsPerPage)}
                  page={currentPage}
                  onChange={(e, v) => setCurrentPage(v)}
                  sx={{ marginLeft: 3 }}
                />

                {isDesktop && <div></div>}
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
                      <TableCell {...column.getHeaderProps()} sx={{ fontWeight: 'bold', minWidth: '100px' }}>
                        <Stack
                          direction="row"
                          justifyContent={column.id === '99' ? 'end' : 'start'}
                          {...(rows.some(x => x.isGrouped) ? {} : column.getSortByToggleProps())}
                        >
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
                return row.isGrouped && hasGroupBy
                  ? (
                    <GenericRowGroup
                      key={`key-${row.id}`}
                      row={row}
                      columns={columns}
                      prepareRow={prepareRow}
                      getTableBodyProps={getTableBodyProps}
                      loading={loading}
                      lastUpdatedId={lastUpdatedId}
                      onRowClick={onRowClick}
                    />
                  )
                  : (
                    <GenericRow
                      key={`key-${row.id}`}
                      row={row}
                      loading={loading}
                      lastUpdatedId={lastUpdatedId}
                      onRowClick={onRowClick}
                    />
                  )
              })
          }
        </TableBody>
      </Table>
    </TableContainer >
  )
}

export default GenericTable
