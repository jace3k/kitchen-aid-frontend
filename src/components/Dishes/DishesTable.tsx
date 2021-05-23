import Token from 'components/Token'
import React, { useEffect, useMemo } from 'react'
import { CellProps, Column, Row } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import { Dish } from 'store/dishes/types'
import MyTable from '../Table/MyTable'
import { fetchAllDishesRequest } from 'store/dishes/actions'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import RemoveIcon from '@material-ui/icons/Delete'

interface DishesTableProps {
	
}

const DishesTable = () => {
	const { dishes, loading } = useSelector((state: ApplicationState) => state.dishes)
	const dispatch = useDispatch()

	const onRowClick = (row: Row<Dish>) => {
		alert(`row ${row.original.name} clicked`)
	}

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
	return (
		<MyTable columns={columns} data={dishes} loading={loading} onRowClick={onRowClick} />
	)
}

export default DishesTable
