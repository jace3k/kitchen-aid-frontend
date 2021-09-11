import React, { useEffect, useMemo } from 'react'
import Token from 'components/Token'
import { CellProps, Column, Row } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import { Meal } from 'utils/interfaces/meal.interface'
import { fetchAllMealsRequest } from 'store/meals/actions'
import MealName from './MealName'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'

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
      Cell: ({ row }: CellProps<Meal>) => {
        return <MealName id={row.original.id} type={row.original.type} />
      }
    }
  ], [])

  return <GenericTable columns={columns} data={meals} loading={loading} onRowClick={onRowClick} />
}

export default MealsTable
