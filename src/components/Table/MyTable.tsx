import React, { ReactElement } from 'react'
import { Column, Row, useTable } from 'react-table'
import { CircularProgress, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import Token from 'components/Token'
import MyRow from './MyRow'
import MyCollapsibleRow from './MyCollapsibleRow'

interface TableProps<T extends object> {
	columns: Column<T>[],
	data: Array<T>,
	loading: boolean,
	renderCollapsedRowContent?: (row: Row<T>) => ReactElement,
	onRowClick?: (row: Row<any>) => void,
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

const MyTable = ({ columns, data, loading, renderCollapsedRowContent, onRowClick }: TableProps<any>) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data })

	return (
		<TableContainer component={Paper} variant="elevation" square>
			<Table {...getTableProps()} size='small'>
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
					{loading ? <LoadingDataRow /> : rows.map(row => {
						prepareRow(row)

						if (renderCollapsedRowContent) {
							return <MyCollapsibleRow row={row} renderCollapsedRowContent={renderCollapsedRowContent} />
						}
						else {
							return <MyRow row={row} onRowClick={onRowClick} />
						}
					})
					}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default MyTable
