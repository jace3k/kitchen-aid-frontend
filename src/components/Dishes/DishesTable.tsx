import React, { useEffect, useMemo } from 'react'
import { Column, Row } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'
import Token from 'components/Token'
import { ApplicationState } from 'store'
import { fetchAllDishesRequest } from 'store/dishes/actions'
import { Dish } from 'utils/interfaces/dish.interface'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import TextFilter from 'components/genericComponents/Filters/TextFilter'


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
			sortType: (a: Row<Dish>, b: Row<Dish>) => {
				return a.original.name.toLowerCase().localeCompare(b.original.name.toLowerCase())
			},
			Filter: TextFilter,
		},
		{
			id: '2',
			Header: <Token value="size" />,
			accessor: 'size',
			Filter: TextFilter,
		},
	], [])

	return <GenericTable columns={columns} data={dishes} loading={loading} onRowClick={onRowClick} />
}

export default DishesTable
