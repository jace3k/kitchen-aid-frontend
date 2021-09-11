import { Button, Table, TableBody, TableCell, TableFooter, TableRow, TextField } from '@material-ui/core'
import DetailWithListView from 'components/genericComponents/DetailWithListView/DetailWithListView'
import Token from 'components/Token'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { ApplicationState } from 'store'
import { createIngredientInADishRequest, deleteDishRequest, fetchDishDetailRequest, updateDishRequest } from 'store/dishes/actions'
import * as routes from 'utils/routes'
import DishDetailIngredientsList from './DishDetailIngredientsList'
import AddToListModal from './AddToListModal'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import { fetchAllIngredientsRequest } from 'store/ingredients/actions'
import { IngredientInaDishDto } from 'utils/interfaces/ingredient-ina-dish.interface'
import MealName from 'components/Meals/MealName'
import DialogRemoveDescription from 'components/genericComponents/DialogRemove/DialogRemoveDescription'

const DishesDetail: React.FC<RouteComponentProps<{ id: string }>> = props => {
  const dispatch = useDispatch()
  const { dishDetail, loading, removed } = useSelector((state: ApplicationState) => state.dishes)
  const [dishSize, setDishSize] = useState(0)
  const [addToListModalOpen, setAddToListModalOpen] = useState(false)
  const [dialogRemoveOpen, setDialogRemoveOpen] = useState(false)

  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchDishDetailRequest(parseInt(id)))
  }, [])

  useEffect(() => {
    if (dishDetail)
      setDishSize(dishDetail.size)
  }, [dishDetail])

  useEffect(() => {
    if (removed) {
      props.history.replace(routes.Dishes)
    }
  }, [removed])

  const onCloseRemoveDishDialog = () => setDialogRemoveOpen(false)

  const handleRemoveDish = () => {
    if (dishDetail)
      dispatch(deleteDishRequest(dishDetail.id))

    onCloseRemoveDishDialog()
  }

  const dialogRemoveDescription = () => {
    const usedInMeals = dishDetail?.dish_ina_meal.map(dish => <MealName id={dish.meal.id} type={dish.meal.type} />)
    return <DialogRemoveDescription
      usedInElementsJsx={usedInMeals}
      loading={false}
      headerUsed="warningDishUsed"
      headerUnused="dishNotUsed"
    />
  }

  const onCloseAddToListModal = () => {
    setAddToListModalOpen(false)
  }

  const onCreateIngredient = (ingredient: IngredientInaDishDto) => {
    dispatch(createIngredientInADishRequest(ingredient))
    setAddToListModalOpen(false)
  }

  return (
    <div>
      <DetailWithListView
        loading={loading}
        name={dishDetail?.name}
        listTitle="ingredients"
        onCloseEditMode={(name) => {
          if (!dishDetail)
            return

          if (dishDetail.size === dishSize && dishDetail.name === name) {
            return
          }
          dispatch(updateDishRequest(dishDetail.id, name, dishSize))
        }}
        onAddToListClick={() => {
          dispatch(fetchAllIngredientsRequest())
          setAddToListModalOpen(true)
        }}
        generateContent={(editMode) => {
          return (
            <div>
              <Table>
                <TableBody>
                  <TableRow hover>
                    <TableCell>
                      <Token value="dishSizeLabel" />:
                    </TableCell>
                    <TableCell>
                      {editMode ? (
                        <TextField value={dishSize} onChange={(e) => setDishSize(parseInt(e.target.value) || 0)} />
                      ) : dishSize}
                    </TableCell>
                  </TableRow>

                </TableBody>
                <TableFooter>
                  {editMode && (
                    <TableRow>
                      <TableCell colSpan={2} align="right" onClick={() => setDialogRemoveOpen(true)}>
                        <Button color="secondary" size="small"><Token value="removeDish" /></Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableFooter>
              </Table>
            </div>
          )
        }}
        generateItemsList={() => {
          return <DishDetailIngredientsList />
        }}
      />
      {dishDetail &&
        <>
          <AddToListModal open={addToListModalOpen} dishId={dishDetail.id} onClose={onCloseAddToListModal} onCreateIngredient={onCreateIngredient} />
          <DialogRemove
            open={dialogRemoveOpen}
            handleRemove={handleRemoveDish}
            onClose={onCloseRemoveDishDialog}
            elementName={dishDetail.name}
            description={dialogRemoveDescription()}
          />
        </>
      }
    </div>
  )
}

export default DishesDetail
