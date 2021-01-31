import React, { useState } from 'react'
import Token from 'components/Token'
import DataGrid from 'components/DataGrid/DataGrid'
import { useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import { CellProps, Column, Row } from 'react-table'
import { Dish } from 'store/dishes/types'
import { Ingredient } from 'store/ingredients/types'
import { IconButton } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Delete'

interface DishesTableProps {
  className?: string,
  handleOpenConfirmDialogRemove: (dish: Dish) => void,
  rowOnClick: (row: Row<Dish>) => void,
  selectedDish: Dish | null,
}

const DishesTable = ({ className, handleOpenConfirmDialogRemove, rowOnClick, selectedDish }: DishesTableProps) => {
  const { dishes, loading } = useSelector((state: ApplicationState) => state.dishes)
  

  const columns: Column<Dish>[] = [
    {
      id: '1',
      accessor: 'name',
      Header: <Token value="dishName" />,
      // Cell: ({ row }: CellProps<Ingredient>) => { }
    }
  ]

  return (
    <DataGrid
      columns={columns}
      className={className}
      data={dishes}
      loading={loading}
      rowOnClick={rowOnClick}
      selectedRow={selectedDish}
    />
  )
}

export default DishesTable
