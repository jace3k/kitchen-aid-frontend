import React, { useState } from 'react'
import { IconButton } from '@material-ui/core'
import Token from 'components/Token'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column } from 'react-table'
import { ApplicationState } from 'store'
import RemoveIcon from '@material-ui/icons/Delete'
import NewTabIcon from '@material-ui/icons/OpenInNew'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import { DishInaMeal } from 'utils/interfaces/dish-ina-meal.interface'
import { deleteDishInAMealRequest } from 'store/meals/actions'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'

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
      Header: <Token value="dishNameLabel" />,
      Cell: ({ row }: CellProps<DishInaMeal>) => {
        return row.original.dish.name
      }
    },
    {
      id: '2',
      Header: <Token value="size" />,
      Cell: ({ row }: CellProps<DishInaMeal>) => {
        return row.original.dish.size
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
