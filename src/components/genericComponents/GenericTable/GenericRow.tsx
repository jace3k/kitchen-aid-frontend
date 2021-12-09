import { TableRow, TableCell } from '@mui/material'
import React from 'react'
import { Row } from 'react-table'

interface GenericRowProps {
  row: Row
  loading: boolean
  lastUpdatedId: string | undefined
  onRowClick?: (row: Row) => void
}

const GenericRow: React.FC<GenericRowProps> = ({ row, loading, lastUpdatedId, onRowClick }) => {
  return (
    <TableRow
      id={`table-row-el-${row.id}`}
      {...row.getRowProps()}
      hover
      onClick={() => {
        if (onRowClick)
          onRowClick(row)
      }}
      sx={{
        cursor: onRowClick ? 'pointer' : '',
        opacity: (loading && lastUpdatedId === row.id) ? '.5' : '',
        height: '47px',
      }}
    >
      {
        row.cells.map(cell => {
          return (
            <TableCell
              width={100}
              {...cell.getCellProps()}
            >
              {cell.render('Cell')}
            </TableCell>
          )
        })
      }
    </TableRow>
  )
}

export default GenericRow
