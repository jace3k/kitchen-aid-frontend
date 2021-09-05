import { Button, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import DetailWithListView from 'components/genericComponents/DetailWithListView/DetailWithListView'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import Token from 'components/Token'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { ApplicationState } from 'store'
import { fetchAllDishesRequest } from 'store/dishes/actions'
import { createDishInAMealRequest, deleteMealRequest, fetchMealDetailRequest } from 'store/meals/actions'
import { MEAL_TYPES_NAMES } from 'utils/constants'
import { DishInaMealDto } from 'utils/interfaces/dish-ina-meal.interface'
import * as routes from 'utils/routes'
import AddToListModal from './AddToListModal'
import MealDetailDishList from './MealDetailDishList'

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
    
    if (usedInRetreats?.length)
      return <div>
        <Token value="warningMealUsed" />
        {Array.from(new Set(usedInRetreats)).map(retreat => <p key={`key-${retreat}`}>{retreat}</p>)}
      </div>

    return <Token value="mealNotUsed" />
  }

  const onCloseAddToListModal = () => {
    setAddToListModalOpen(false)
  }

  const onCreateDish = (dish: DishInaMealDto) => {
    dispatch(createDishInAMealRequest(dish))
    setAddToListModalOpen(false)
  }

  const mealName = () => {
    if (mealDetail)
      return <>
        <Token value={MEAL_TYPES_NAMES[mealDetail.type]} /> {`#${mealDetail.id}`}
      </>

    return ''
  }

  return (
    <div>
      <DetailWithListView
        loading={loading}
        disableEditMode
        name={mealName()}
        listTitle="dishes"

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
            elementName={mealName()}
            description={dialogRemoveDescription()}
          />
        </>
      }
    </div>
  )
}

export default MealDetail
