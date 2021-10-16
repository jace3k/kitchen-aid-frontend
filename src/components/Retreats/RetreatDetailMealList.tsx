import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column } from 'react-table'
import { IconButton, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Check'
import RemoveIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import NewTabIcon from '@material-ui/icons/OpenInNew'
import { ApplicationState } from 'store'
import Token from 'components/Token'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import { MealInaRetreat, MealInaRetreatDto } from 'utils/interfaces/meal-ina-retreat.interface'
import { removeMealRequest, updateMealRequest } from 'store/retreats/actions'
import MealName from 'components/Meals/MealName'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'

const RetreatDetailMealList = () => {
  const dispatch = useDispatch()
  const { meals, loading } = useSelector((state: ApplicationState) => state.retreats)
  const [currentEdit, setCurrentEdit] = useState<null | MealInaRetreat>(null)
  const [mealRemoveDialogOpen, setMealRemoveDialogOpen] = useState(false)

  const handleMealRemove = () => {
    if (!currentEdit)
      return

    dispatch(removeMealRequest(currentEdit.id))
    setMealRemoveDialogOpen(false)
    setCurrentEdit(null)
  }

  const onCloseMealRemove = () => {
    setMealRemoveDialogOpen(false)
  }

  const handleMealUpdate = (meal: MealInaRetreat, newMeal: MealInaRetreatDto) => {
    if (meal.servings === newMeal.servings && meal.date === newMeal.date)
      return

    console.log('[handleMealUpdate]', newMeal)
    dispatch(updateMealRequest(newMeal))
  }

  const columns: Column<MealInaRetreat>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="mealLabel" />,
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
        return <MealName id={row.original.meal.id} type={row.original.meal.type} />
      }
    },
    {
      id: '2',
      Header: <Token value="servings" />,
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
        const [currentEditServings, setCurrentEditServings] = useState<number>(row.original.servings)
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              value={currentEditServings}
              onChange={(e) => setCurrentEditServings(parseInt(e.target.value) || 0)}
              onBlur={() => {
                handleMealUpdate(row.original, {
                  id: row.original.id,
                  meal: row.original.meal.id,
                  retreat: row.original.retreat,
                  servings: currentEditServings,
                  date: row.original.date,
                })
                setCurrentEdit(null)
              }}
            />
          )
        }
        else {
          return row.original.servings
        }
      }
    },
    {
      id: '3',
      Header: <Token value="date" />,
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
        const [currentEditDate, setCurrentEditDate] = useState(row.original.date)
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              type="date"
              value={currentEditDate}
              onChange={(e) => setCurrentEditDate(e.target.value)}
              onBlur={() => {
                handleMealUpdate(row.original, {
                  id: row.original.id,
                  meal: row.original.meal.id,
                  retreat: row.original.retreat,
                  servings: row.original.servings,
                  date: currentEditDate,
                })
                setCurrentEdit(null)
              }}
            />
          )
        }
        else {
          const date = new Date(row.original.date).toLocaleDateString('pl-PL')
          return date
        }
      }
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
        return (
          <div style={{ minWidth: 60 }}>
            {
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
            }
            <IconButton
              size="small"
              onClick={() => {
                const id = row.original.meal.id
                console.log(id)
                window.open(`/meals/${id}`, '_blank')
              }}
            >
              <NewTabIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                setCurrentEdit(row.original)
                setMealRemoveDialogOpen(true)
              }}
            >
              <RemoveIcon />
            </IconButton>
          </div>
        )
      }
    }
  ], [currentEdit])

  return (
    <>
      <GenericTable columns={columns} data={meals} loading={loading} />
      {currentEdit && <DialogRemove
        open={mealRemoveDialogOpen}
        handleRemove={handleMealRemove}
        onClose={onCloseMealRemove}
        elementName={<MealName id={currentEdit.meal.id} type={currentEdit.meal.type} />}
      />}
    </>
  )
}

export default RetreatDetailMealList