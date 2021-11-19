import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column, Row } from 'react-table'
import { IconButton } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Delete'
import NewTabIcon from '@mui/icons-material/OpenInNew'
import { ApplicationState } from 'store'
import { deleteDishInAMealRequest } from 'store/meals/actions'
import { DishInaMeal } from 'utils/interfaces/dish-ina-meal.interface'
import Token from 'components/Token'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import TextFilter from 'components/genericComponents/Filters/TextFilter'


const MealDetailDishList = () => {
  const dispatch = useDispatch()
  const { dishes, loading } = useSelector((state: ApplicationState) => state.meals)
  const [currentEdit, setCurrentEdit] = useState<null | DishInaMeal>(null)
  const [dishRemoveDialogOpen, setDishRemoveDialogOpen] = useState(false)

  const handleDishRemove = () => {
    if (!currentEdit)
      return

    dispatch(deleteDishInAMealRequest(currentEdit.id))
    setDishRemoveDialogOpen(false)
    setCurrentEdit(null)
  }

  const onCloseDishRemove = () => {
    setDishRemoveDialogOpen(false)
  }

  const columns: Column<DishInaMeal>[] = useMemo(() => [
    {
      id: '1',
      accessor: 'dish',
      sortType: (a: Row<DishInaMeal>, b: Row<DishInaMeal>) => {
        return a.original.dish.name.toLowerCase().localeCompare(b.original.dish.name.toLowerCase())
      },
      Header: <Token value="dishNameLabel" />,
      Cell: ({ row }: CellProps<DishInaMeal>) => {
        return row.original.dish.name
      },
      Filter: TextFilter,
      filter: (rows: Row<DishInaMeal>[], columnIds: String[], filterValue: string) => {
        return rows.filter(row => row.original.dish.name.toLocaleLowerCase().includes(filterValue.toLowerCase()))
      }
    },
    {
      id: '2',
      accessor: 'dish',
      sortType: (a: Row<DishInaMeal>, b: Row<DishInaMeal>) => {
        return a.original.dish.size - b.original.dish.size
      },
      Header: <Token value="size" />,
      Cell: ({ row }: CellProps<DishInaMeal>) => {
        return row.original.dish.size
      },
      Filter: TextFilter,
      filter: (rows: Row<DishInaMeal>[], columnIds: String[], filterValue: string) => {
        return rows.filter(row => row.original.dish.size.toString().includes(filterValue))
      }
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<DishInaMeal>) => {
        return (
          <div style={{ minWidth: 60 }}>
            {/* currently no edit options in DishInaMeal */}
            {/* {
              currentEdit?.id === row.original.id
                ? (
                  <IconButton
                    size="small"
                    onClick={() => setCurrentEdit(null)}
                  >
                    <CloseIcon />
                  </IconButton>
                )
                : (
                  <IconButton
                    size="small"
                    onClick={() => setCurrentEdit(row.original)}
                  >
                    <EditIcon />
                  </IconButton>
                )
            } */}
            <IconButton
              size="small"
              onClick={() => {
                const id = row.original.dish.id
                console.log(id)
                window.open(`/dishes/${row.original.dish.id}`, '_blank')
              }}
            >
              <NewTabIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                setCurrentEdit(row.original)
                setDishRemoveDialogOpen(true)
              }}
            >
              <RemoveIcon />
            </IconButton>
          </div>
        )
      }
    }
  ], [])

  return (
    <>
      <GenericTable columns={columns} data={dishes} loading={loading} />
      {currentEdit && <DialogRemove open={dishRemoveDialogOpen} handleRemove={handleDishRemove} onClose={onCloseDishRemove} elementName={currentEdit.dish.name} />}
    </>
  )
}

export default MealDetailDishList
