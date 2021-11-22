import React, { useState } from 'react'
import { Row, Column } from 'react-table'
import { TableRow, TableCell, Collapse, Table, TableBody, Paper, Typography, Stack } from '@mui/material'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ArrowDropUp from '@mui/icons-material/ArrowDropUp'
import GenericRow from './GenericRow'
import moment from 'moment'
import { MOMENT_DATE_DISPLAY_FORMAT } from 'utils/constants'

interface GenericRowGroup {
  row: Row
  columns: Column<any>[]
  prepareRow: (row: Row) => void
  getTableBodyProps: (prop?: any) => any
  loading: boolean
  lastUpdatedId: string | undefined
  onRowClick?: (row: Row) => void
}

const GenericRowGroup: React.FC<GenericRowGroup> = ({ row, columns, prepareRow, getTableBodyProps, loading, lastUpdatedId, onRowClick }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <TableRow {...row.getRowProps()}>
      <TableCell colSpan={columns.length} sx={{ padding: 0 }}>
        <Paper elevation={2} square
          sx={{
            height: 40,
            cursor: 'pointer'
          }}
          onClick={() => {
            setExpanded(!expanded)
          }}>
          <Stack justifyContent="start" direction="row" alignItems="center" height={40} spacing={1}>
            {expanded ? <ArrowDropDown /> : <ArrowDropUp />}
            <div>
              <Typography variant="overline" sx={{ fontSize: '.95rem' }}>
                {/* Change required here when more group by columns will be implemented */}
                {moment(row.groupByVal).format(MOMENT_DATE_DISPLAY_FORMAT)} ({row.subRows.length})
              </Typography>
            </div>
          </Stack>
        </Paper>

        <Collapse in={expanded}>
          <Table size='small'>
            <TableBody {...getTableBodyProps()}>
              {row.subRows.map((subRow, i) => {
                prepareRow(subRow)
                return (
                  <GenericRow
                    key={`key-${row.id}-${subRow.id}-${i}`}
                    row={subRow}
                    loading={loading}
                    lastUpdatedId={lastUpdatedId}
                    onRowClick={onRowClick}
                  />
                )
              })}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}

export default GenericRowGroup
