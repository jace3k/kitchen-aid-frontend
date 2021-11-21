import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column, Row } from 'react-table'
import moment, { Moment } from 'moment';
import { TextField, Typography } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { ApplicationState } from 'store'
import { removeMealRequest, updateMealRequest } from 'store/retreats/actions'
import { MealInaRetreat, MealInaRetreatDto } from 'utils/interfaces/meal-ina-retreat.interface'
import { DATE_PICKER_MASK, MOMENT_DATE_DISPLAY_FORMAT, MOMENT_DATE_SAVE_FORMAT } from 'utils/constants';
import Token from 'components/Token'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import MealName from 'components/Meals/MealName'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import TextFilter from 'components/genericComponents/Filters/TextFilter';
import { v } from 'utils/helper';
import CellTextField from 'components/genericComponents/CellTextField/CellTextField'
import CellMore from 'components/genericComponents/CellMore/CellMore'

const RetreatDetailMealList = () => {
  const dispatch = useDispatch()
  const { meals, loading } = useSelector((state: ApplicationState) => state.retreats)
  const [currentEdit, setCurrentEdit] = useState<null | MealInaRetreat>(null)
  const [mealRemoveDialogOpen, setMealRemoveDialogOpen] = useState(false)
  const [lastUpdatedId, setLastUpdatedId] = useState<string | undefined>()

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

  const handleUpdate = (row: Row<MealInaRetreat>) => {
    setCurrentEdit(null)
    setLastUpdatedId(row.id)
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
  }

  const columns: Column<MealInaRetreat>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="mealLabel" />,
      accessor: 'meal',
      sortType: (a: Row<MealInaRetreat>, b: Row<MealInaRetreat>) => {
        return a.original.meal.type.localeCompare(b.original.meal.type)
      },
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
        return (
          <Typography sx={{ minWidth: 150 }} variant="body2">
            <MealName id={row.original.meal.id} type={row.original.meal.type} />
          </Typography>
        )
      },
      Filter: TextFilter,
      filter: (rows: Row<MealInaRetreat>[], columnIds: String[], filterValue: string) => {
        return rows.filter(row => row.original.meal.id.toString().includes(filterValue.toLowerCase()))
      }
    },
    {
      id: '2',
      Header: <Token value="servings" />,
      accessor: 'servings',
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
        if (currentEdit?.id === row.original.id) {
          return (
            <CellTextField number
              value={v(row.state.currentEditServings, row.original.servings)}
              onChange={event => {
                row.setState((state: any) => ({ ...state, currentEditServings: event.target.value }))
              }}
              handleUpdate={() => handleUpdate(row)}
            />
          )
        }
        else {
          return row.original.servings
        }
      },
      Filter: TextFilter,
    },
    {
      id: '3',
      Header: <Token value="date" />,
      accessor: 'date',
      sortType: (a: Row<MealInaRetreat>, b: Row<MealInaRetreat>) => {
        if (new Date(a.original.date) > new Date(b.original.date))
          return 1
        return -1
      },
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
      },
      Filter: TextFilter,
      filter: (rows: Row<MealInaRetreat>[], columnIds: String[], filterValue: string) => {
        return rows.filter(row => moment(row.original.date).format(MOMENT_DATE_DISPLAY_FORMAT).includes(filterValue))
      },
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<MealInaRetreat>) => {
        return (
          <CellMore canEdit canOpenNewWindow canRemove
            handleUpdate={() => handleUpdate(row)}
            handleClose={() => setCurrentEdit(null)}
            handleEdit={() => setCurrentEdit(row.original)}
            handleRemove={() => {
              setCurrentEdit(row.original)
              setMealRemoveDialogOpen(true)
            }}
            handleOpenNewWindow={() => {
              const id = row.original.meal.id
              window.open(`/meals/${id}`, '_blank')
            }}
            editMode={currentEdit?.id === row.original.id}
            loading={loading}
          />
        )
      }
    }
  ], [currentEdit, loading])

  return (
    <>
      <GenericTable columns={columns} data={meals} loading={loading} lastUpdatedId={lastUpdatedId} />
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