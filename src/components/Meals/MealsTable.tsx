import React, { useEffect, useMemo } from 'react'
import { CellProps, Column, Row } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import { fetchAllMealsRequest } from 'store/meals/actions'
import { Meal } from 'utils/interfaces/meal.interface'
import MealName from './MealName'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import Token from 'components/Token'
import TextFilter from 'components/genericComponents/Filters/TextFilter'


interface MealsTableProps {
  onRowClick: (row: Row<Meal>) => void
}

const MealsTable = ({ onRowClick }: MealsTableProps) => {
  const dispatch = useDispatch()
  const { meals, loading } = useSelector((state: ApplicationState) => state.meals)

  useEffect(() => {
    dispatch(fetchAllMealsRequest())
  }, [])

  const columns: Column<Meal>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="mealLabel" />,
      accessor: 'id',
      Cell: ({ row }: CellProps<Meal>) => {
        return <MealName id={row.original.id} type={row.original.type} />
      },
      sortType: (a: Row<Meal>, b: Row<Meal>) => {
        return a.original.type.localeCompare(b.original.type)
      },
      Filter: TextFilter,
    }
  ], [])

  return <GenericTable columns={columns} data={meals} loading={loading} onRowClick={onRowClick} />
}

export default MealsTable
