import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column, Row } from 'react-table'
import { Typography } from '@mui/material'
import { ApplicationState } from 'store'
import { deleteIngredientInADishRequest, updateIngredientInADishRequest } from 'store/dishes/actions'
import { IngredientInADish, IngredientInaDishDto } from 'utils/interfaces/ingredient-ina-dish.interface'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import Token from 'components/Token'
import TextFilter from 'components/genericComponents/Filters/TextFilter'
import { v } from 'utils/helper'
import CellTextField from 'components/genericComponents/CellTextField/CellTextField'
import CellMore from 'components/genericComponents/CellMore/CellMore'


const DishDetailIngredientsList = () => {
  const dispatch = useDispatch()
  const { ingredients, loading } = useSelector((state: ApplicationState) => state.dishes)
  const [currentEdit, setCurrentEdit] = useState<null | IngredientInADish>(null)
  const [ingredientRemoveDialogOpen, setIngredientRemoveDialogOpen] = useState(false)
  const [lastUpdatedId, setLastUpdatedId] = useState<string | undefined>()

  const handleIngredientUpdate = (ingredient: IngredientInADish, newIngredient: IngredientInaDishDto) => {
    if (ingredient.margin === newIngredient.margin && ingredient.part === newIngredient.part)
      return

    dispatch(updateIngredientInADishRequest(newIngredient))
  }

  const handleUpdate = (row: Row<IngredientInADish>) => {
    setCurrentEdit(null)
    setLastUpdatedId(row.id)
    const newIngredient = {
      id: row.original.id,
      dish: row.original.dish,
      ingredient: row.original.ingredient.id,
      margin: row.state.currentEditMargin as number || row.original.margin,
      part: row.state.currentEditPart as number || row.original.part,
    }
    handleIngredientUpdate(row.original, newIngredient)
  }

  const handleIngredientRemove = () => {
    if (!currentEdit)
      return

    dispatch(deleteIngredientInADishRequest(currentEdit.id))
    setIngredientRemoveDialogOpen(false)
    setCurrentEdit(null)
  }

  const onCloseIngredientRemove = () => {
    setIngredientRemoveDialogOpen(false)
  }

  const columns: Column<IngredientInADish>[] = useMemo(() => [
    {
      id: '1',
      accessor: 'ingredient',
      sortType: (a: Row<IngredientInADish>, b: Row<IngredientInADish>) => {
        return a.original.ingredient.name.toLowerCase().localeCompare(b.original.ingredient.name.toLowerCase())
      },
      Header: <Token value="ingredientNameLabel" />,
      Cell: ({ row }: CellProps<IngredientInADish>) => {
        return (
          <Typography sx={{ minWidth: 150 }}>
            {row.original.ingredient.name}
          </Typography>
        )
      },
      Filter: TextFilter,
      filter: (rows: Row<IngredientInADish>[], columnIds: String[], filterValue: string) => {
        return rows.filter(row => row.original.ingredient.name.toLowerCase().includes(filterValue.toLowerCase()))
      },
    },
    {
      id: '2',
      Header: <Token value="margin" />,
      accessor: 'margin',
      Cell: ({ row }: CellProps<IngredientInADish>) => {
        if (currentEdit?.id === row.original.id) {
          return (
            <CellTextField
              value={v(row.state.currentEditMargin, row.original.margin)}
              onChange={event => {
                row.setState((state: any) => ({ ...state, currentEditMargin: event.target.value }))
              }}
              handleUpdate={() => handleUpdate(row)}
            />
          )
        }
        else {
          return (
            <Typography sx={{ minWidth: 150 }}>
              {row.original.margin}
            </Typography>
          )
        }
      },
      Filter: TextFilter,
    },
    {
      id: '3',
      Header: <Token value="part" />,
      accessor: 'part',
      Cell: ({ row }: CellProps<IngredientInADish>) => {
        if (currentEdit?.id === row.original.id) {
          return (
            <CellTextField
              value={v(row.state.currentEditPart, row.original.part)}
              onChange={event => {
                row.setState((state: any) => ({ ...state, currentEditPart: event.target.value }))
              }}
              handleUpdate={() => handleUpdate(row)}
            />
          )
        }
        else {
          return (
            <Typography sx={{ minWidth: 150 }}>
              {row.original.part}
            </Typography>
          )
        }
      },
      Filter: TextFilter,
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<IngredientInADish>) => {
        return <CellMore canEdit canRemove
          handleUpdate={() => handleUpdate(row)}
          handleClose={() => setCurrentEdit(null)}
          handleEdit={() => setCurrentEdit(row.original)}
          handleRemove={() => {
            setCurrentEdit(row.original)
            setIngredientRemoveDialogOpen(true)
          }}
          editMode={currentEdit?.id === row.original.id}
          loading={loading}
        />
      },
    }
  ], [currentEdit, loading]);

  return (
    <>
      <GenericTable columns={columns} data={ingredients} loading={loading} lastUpdatedId={lastUpdatedId} />
      {currentEdit && <DialogRemove open={ingredientRemoveDialogOpen} handleRemove={handleIngredientRemove} onClose={onCloseIngredientRemove} elementName={currentEdit.ingredient.name} />}
    </>
  )
}

export default DishDetailIngredientsList
