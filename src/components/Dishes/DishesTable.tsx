import Token from 'components/Token'
import React, { useEffect, useMemo, useState } from 'react'
import { CellProps, Column, Row, usePagination, useTable } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import MyTable from '../Table/MyTable'
import { fetchAllDishesRequest } from 'store/dishes/actions'
import { IconButton, Table } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import RemoveIcon from '@material-ui/icons/Delete'
import { Dish } from 'utils/interfaces/dish.interface'
import { CircularProgress, Paper, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core'
import { ROWS_PER_PAGE_OPTIONS } from 'utils/constants'

interface DishesTableProps {
	onRowClick: (row: Row<Dish>) => void
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

const DishesTable = ({ onRowClick }: DishesTableProps) => {
	const dispatch = useDispatch()
	const { dishes, loading } = useSelector((state: ApplicationState) => state.dishes)
	const itemsPerPageFromSettings = useSelector((state: ApplicationState) => state.user.itemsPerPage)
	const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageFromSettings);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		dispatch(fetchAllDishesRequest())
	}, [])

	const columns: Column<Dish>[] = useMemo(() => [
		{
			id: '1',
			Header: <Token value="name" />,
			accessor: 'name',
		},
		{
			id: '2',
			Header: <Token value="size" />,
			accessor: 'size',
		},
	], [])

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data: dishes }, usePagination)

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
					{loading ? <LoadingDataRow /> : rows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map(row => {
						prepareRow(row)

						return (
							<TableRow hover onClick={() => { onRowClick(row) }} {...row.getRowProps()} style={{ cursor: 'pointer' }}>
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
							colSpan={3}
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

export default DishesTable
