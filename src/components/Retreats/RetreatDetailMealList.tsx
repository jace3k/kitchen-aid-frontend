import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column } from 'react-table'
import moment, { Moment } from 'moment';
import { IconButton, Stack, TextField, Typography } from '@mui/material'
import { DesktopDatePicker, MobileDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import CloseIcon from '@mui/icons-material/Check'
import RemoveIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import NewTabIcon from '@mui/icons-material/OpenInNew'
import { ApplicationState } from 'store'
import { removeMealRequest, updateMealRequest } from 'store/retreats/actions'
import { MealInaRetreat, MealInaRetreatDto } from 'utils/interfaces/meal-ina-retreat.interface'
import { DATE_PICKER_MASK, MOMENT_DATE_DISPLAY_FORMAT, MOMENT_DATE_SAVE_FORMAT } from 'utils/constants';
import Token from 'components/Token'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
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

    dispatch(updateMealRequest(newMeal))
  }

  const columns: Column<MealInaRetreat>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="mealLabel" />,
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
        return (
          <Typography sx={{ minWidth: 150 }} variant="body2">
            <MealName id={row.original.meal.id} type={row.original.meal.type} />
          </Typography>
        )
      }
    },
    {
      id: '2',
      Header: <Token value="servings" />,
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              size="small"
              type="number"
              sx={{ minWidth: 150 }}
              value={row.state.currentEditServings || row.original.servings}
              onChange={event => {
                row.setState((state: any) => ({ ...state, currentEditServings: event.target.value }))
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
        if (currentEdit?.id === row.original.id) {
          return (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                mask={DATE_PICKER_MASK}
                inputFormat={MOMENT_DATE_DISPLAY_FORMAT}
                value={row.state.currentEditDate || row.original.date}
                onChange={value => {
                  row.setState((state: any) => ({ ...state, currentEditDate: value }))
                }}
                renderInput={(params) => <TextField {...params} size="small" sx={{ minWidth: 150 }} />}
              />
            </LocalizationProvider>
          )
        }
        return (
          <Typography variant="body2" sx={{ minWidth: 100 }}>
            {moment(row.original.date).format(MOMENT_DATE_DISPLAY_FORMAT)}
          </Typography>
        )
      }
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
        return (
          <Stack direction="row" justifyContent="end">
            {
              currentEdit?.id === row.original.id
                ? (
                  <IconButton
                    size="small"
                    onClick={() => {
                      setCurrentEdit(null)
                      const newMeal = {
                        id: row.original.id,
                        meal: row.original.meal.id,
                        retreat: row.original.retreat,
                        servings: row.state.currentEditServings as number || row.original.servings,
                        date: row.state.currentEditDate
                          ? (row.state.currentEditDate as Moment).format(MOMENT_DATE_SAVE_FORMAT)
                          : row.original.date
                      }
                      handleMealUpdate(row.original, newMeal)
                    }}
                  >
                    <CloseIcon color="success" />
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
          </Stack>
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