import Token from 'components/Token'
import React, { useEffect, useMemo } from 'react'
import { Column, Row } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import { fetchAllDishesRequest } from 'store/dishes/actions'
import { Dish } from 'utils/interfaces/dish.interface'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'

interface DishesTableProps {
	onRowClick: (row: Row<Dish>) => void
}

const DishesTable = ({ onRowClick }: DishesTableProps) => {
	const dispatch = useDispatch()
	const { dishes, loading } = useSelector((state: ApplicationState) => state.dishes)

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

	return <GenericTable columns={columns} data={dishes} loading={loading} onRowClick={onRowClick} />
}

export default DishesTable
