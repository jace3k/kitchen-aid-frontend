import { Button, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import DetailWithListView from 'components/genericComponents/DetailWithListView/DetailWithListView'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import DialogRemoveDescription from 'components/genericComponents/DialogRemove/DialogRemoveDescription'
import Token from 'components/Token'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { ApplicationState } from 'store'
import { fetchAllDishesRequest } from 'store/dishes/actions'
import { addDishInAMealRequest, deleteMealRequest, fetchMealDetailRequest } from 'store/meals/actions'
import { DishInaMealDto } from 'utils/interfaces/dish-ina-meal.interface'
import * as routes from 'utils/routes'
import AddToListModal from './AddToListModal'
import MealDetailDishList from './MealDetailDishList'
import MealName from './MealName'

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

  return (
    <div>
      <DetailWithListView
        loading={loading}
        disableEditMode
        name={<MealName id={mealDetail?.id} type={mealDetail?.type} />}
        listTitle="dishes"
        notFound={!mealDetail}
        onAddToListClick={() => {
          dispatch(fetchAllDishesRequest())
          setAddToListModalOpen(true)
        }}
        generateContent={(editMode) => {
          return <div>
            <Table>
              <TableBody>
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
        generateItemsList={() => {
          return <MealDetailDishList />
        }}
      />
      {mealDetail &&
        <>
          <AddToListModal open={addToListModalOpen} mealId={mealDetail.id} onClose={onCloseAddToListModal} onCreateDish={onCreateDish} />
          <DialogRemove
            open={dialogRemoveOpen}
            handleRemove={handleRemoveMeal}
            onClose={onCloseRemoveMealDialog}
            elementName={<MealName id={mealDetail?.id} type={mealDetail?.type} />}
            description={dialogRemoveDescription()}
          />
        </>
      }
    </div>
  )
}

export default MealDetail
