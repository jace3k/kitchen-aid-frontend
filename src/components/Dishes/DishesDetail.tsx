import { Button, Table, TableBody, TableCell, TableFooter, TableRow, TextField } from '@material-ui/core'
import DetailWithListView from 'components/genericComponents/DetailWithListView/DetailWithListView'
import Loader from 'components/Loader/Loader'
import Token from 'components/Token'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { ApplicationState } from 'store'
import { createIngredientInADishRequest, deleteDishRequest, fetchDishDetailRequest, updateDishRequest } from 'store/dishes/actions'
import * as routes from 'utils/routes'
import { useStyles } from 'components/genericComponents/styles'
import DishDetailIngredientsList from './DishDetailIngredientsList'
import AddToListModal from './AddToListModal'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import { fetchAllIngredientsRequest } from 'store/ingredients/actions'
import { IngredientInaDishDto } from 'utils/interfaces/ingredient-ina-dish.interface'

const DishesDetail: React.FC<RouteComponentProps<{ id: string }>> = props => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { history } = props
  const { dishDetail, loading, error, removed } = useSelector((state: ApplicationState) => state.dishes)
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

  const onCloseAddToListModal = () => {
    setAddToListModalOpen(false)
  }

  const onCreateIngredient = (ingredient: IngredientInaDishDto) => {
    dispatch(createIngredientInADishRequest(ingredient))
    setAddToListModalOpen(false)
  }

  return (
    <div>
      <Loader />
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
          <DialogRemove open={dialogRemoveOpen} handleRemove={handleRemoveDish} onClose={onCloseRemoveDishDialog} elementName={dishDetail.name} />
        </>
      }
    </div>
  )
}

export default DishesDetail
