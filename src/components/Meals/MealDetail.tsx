import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { ApplicationState } from 'store'
import { fetchAllDishesRequest } from 'store/dishes/actions'
import { DishInaMealDto } from 'utils/interfaces/dish-ina-meal.interface'
import * as routes from 'utils/routes'
import DetailWithListView from 'components/genericComponents/DetailWithListView/DetailWithListView'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import DialogRemoveDescription from 'components/genericComponents/DialogRemove/DialogRemoveDescription'
import Token from 'components/Token'
import { addDishInAMealRequest, deleteMealRequest, fetchMealDetailRequest, updateMealRequest } from 'store/meals/actions'
import AddToListModal from './AddToListModal'
import MealDetailDishList from './MealDetailDishList'
import MealType from './MealType'


const MealDetail: React.FC<RouteComponentProps<{ id: string }>> = props => {
  const dispatch = useDispatch()
  const { mealDetail, loading, error, removed } = useSelector((state: ApplicationState) => state.meals)
  const [addToListModalOpen, setAddToListModalOpen] = useState(false)
  const [dialogRemoveOpen, setDialogRemoveOpen] = useState(false)

  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchMealDetailRequest(parseInt(id)))
  }, [])

  useEffect(() => {
    if (removed) {
      props.history.replace(routes.Meals)
    }
  }, [removed])

  const onCloseRemoveMealDialog = () => {
    setDialogRemoveOpen(false)
  }

  const handleRemoveMeal = () => {
    if (mealDetail)
      dispatch(deleteMealRequest(mealDetail.id))

    onCloseRemoveMealDialog()
  }

  const dialogRemoveDescription = () => {
    const usedInRetreats = mealDetail?.meal_ina_retreat.map(meal => meal.retreat.name)
    return (
      <DialogRemoveDescription
        usedInElements={usedInRetreats}
        loading={loading}
        headerUsed="warningMealUsed"
        headerUnused="mealNotUsed"
      />
    )
  }

  const onCloseAddToListModal = () => {
    setAddToListModalOpen(false)
  }

  const onCreateDish = (dish: DishInaMealDto) => {
    dispatch(addDishInAMealRequest(dish))
    setAddToListModalOpen(false)
  }

  const handleUpdateMeal = (name: string) => {
    if (!mealDetail)
      return

    if (mealDetail.name === name)
      return

    dispatch(updateMealRequest({
      id: mealDetail.id,
      type: mealDetail.type,
      name
    }))
  }

  return (
    <div>
      <DetailWithListView
        loading={loading}
        name={mealDetail?.name}
        notFound={!mealDetail}
        onCloseEditMode={handleUpdateMeal}
        generateContent={(editMode) => {
          return <div>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <MealType type={mealDetail?.type} />
                  </TableCell>
                </TableRow>
                {editMode && (
                  <TableRow>
                    <TableCell colSpan={2} align="right" onClick={() => setDialogRemoveOpen(true)}>
                      <Button color="secondary" size="small"><Token value="removeMeal" /></Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        }}
        generateItemsList={[
          {
            name: 'dishes',
            list: () => <MealDetailDishList />,
            onAddToListClick: () => {
              dispatch(fetchAllDishesRequest())
              setAddToListModalOpen(true)
            }
          }
        ]}
      />
      {mealDetail &&
        <>
          <AddToListModal
            open={addToListModalOpen}
            mealId={mealDetail.id}
            onClose={onCloseAddToListModal}
            onCreateDish={onCreateDish}
          />
          <DialogRemove
            open={dialogRemoveOpen}
            handleRemove={handleRemoveMeal}
            onClose={onCloseRemoveMealDialog}
            elementName={mealDetail.name}
            description={dialogRemoveDescription()}
          />
        </>
      }
    </div>
  )
}

export default MealDetail
