import React, { useEffect, useMemo } from 'react'
import { CellProps, Column, Row } from 'react-table'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from 'store'
import { fetchAllMealsRequest } from 'store/meals/actions'
import { Meal } from 'utils/interfaces/meal.interface'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import Token from 'components/Token'
import TextFilter from 'components/genericComponents/Filters/TextFilter'
import MealType from './MealType'
import { Typography } from '@mui/material'
import MealTypeFilter from 'components/genericComponents/Filters/MealTypeFilter'
import { TYPE_MAP } from 'utils/constants'


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
      accessor: 'name',
      Cell: ({ row }: CellProps<Meal>) => {
        return (
          <Typography>
            {row.original.name}
          </Typography>
        )
      },
      sortType: (a: Row<Meal>, b: Row<Meal>) => {
        return a.original.name.toLowerCase().localeCompare(b.original.name.toLowerCase())
      },
      Filter: TextFilter,
    },
    {
      id: '2',
      Header: <Token value="mealTypeLabel" />,
      accessor: 'type',
      Cell: ({ row }: CellProps<Meal>) => {
        return <MealType type={row.original.type} />
      },
      sortType: (a: Row<Meal>, b: Row<Meal>) => {
        return TYPE_MAP[a.original.type] - TYPE_MAP[b.original.type]
      },
      Filter: MealTypeFilter,
    },
  ], [])

  return <GenericTable columns={columns} data={meals} loading={loading} onRowClick={onRowClick} />
}

export default MealsTable
