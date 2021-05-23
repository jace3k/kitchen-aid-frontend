import { TableRow, TableCell, Collapse } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { Row } from 'react-table'

interface MyCollapsibleRowProps {
	row: Row,
	renderCollapsedRowContent: (row: Row) => ReactElement,
}

const MyCollapsibleRow = ({ row, renderCollapsedRowContent }: MyCollapsibleRowProps) => {
	const [open, setOpen] = useState(false)
	return (
		<React.Fragment>
			<TableRow
				{...row.getRowProps()}
				hover
				style={{ cursor: 'pointer' }}
				onClick={() => setOpen(!open)}>
				{
					row.cells.map(cell => (
						<TableCell
							width={100}
							{...cell.getCellProps()}
							align={cell.column.id === '99' ? 'right' : 'left'}
						>
							{cell.render('Cell')}
						</TableCell>
					))
				}
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
					<Collapse in={open}>
						{renderCollapsedRowContent(row)}
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}

export default MyCollapsibleRow
