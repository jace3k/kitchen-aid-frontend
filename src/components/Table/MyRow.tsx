import { TableCell, TableRow } from '@material-ui/core'
import React from 'react'
import { Row } from 'react-table'
interface MyRowProps {
	row: Row,
	onRowClick?: (row: Row) => void
}

const MyRow = ({ row, onRowClick }: MyRowProps) => {
	return (
		<TableRow
			{...row.getRowProps()}
			hover
			style={{ cursor: onRowClick ? 'pointer' : 'default' }}
			onClick={() => {
				if (onRowClick)
					onRowClick(row)
			}}>
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
}

export default MyRow
