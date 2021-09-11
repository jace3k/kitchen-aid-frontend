import React, { useEffect, useState } from 'react'
import { Button, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import Token from 'components/Token'
import DetailWithListView from 'components/genericComponents/DetailWithListView/DetailWithListView'
import { addMealRequest, deleteRetreatRequest, fetchRetreatDetailRequest, updateRetreatRequest } from 'store/retreats/actions'
import * as routes from 'utils/routes'
import { MealInaRetreatDto } from 'utils/interfaces/meal-ina-retreat.interface'
import { fetchAllMealsRequest } from 'store/meals/actions'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import AddToListModal from './AddToListModal'
import RetreatDetailMealList from './RetreatDetailMealList'


const RetreatDetail: React.FC<RouteComponentProps<{ id: string }>> = props => {
  const dispatch = useDispatch()
  const { retreatDetail, loading, removed, error } = useSelector((state: ApplicationState) => state.retreats)
  const [addToListModalOpen, setAddToListModalOpen] = useState(false)
  const [dialogRemoveOpen, setDialogRemoveOpen] = useState(false)

  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchRetreatDetailRequest(parseInt(id)))
  }, [])

  useEffect(() => {
    if (removed) {
      props.history.replace(routes.Retreats)
    }
  }, [removed])

  const onCloseRemoveDialog = () => {
    setDialogRemoveOpen(false)
  }

  const handleRemoveRetreat = () => {
    if (retreatDetail)
      dispatch(deleteRetreatRequest(retreatDetail.id))

    onCloseRemoveDialog()
  }

  const onCloseAddToListModal = () => {
    setAddToListModalOpen(false)
  }

  const onCreateMeal = (meal: MealInaRetreatDto) => {
    dispatch(addMealRequest(meal))
    setAddToListModalOpen(false)
  }

  const handleUpdateRetreat = (name: string) => {
    if (!retreatDetail)
      return

    if (retreatDetail.name === name)
      return

    dispatch(updateRetreatRequest({ id: retreatDetail.id, name }))
  }

  return (
    <div>
      <DetailWithListView
        loading={loading}
        name={retreatDetail?.name}
        listTitle="meals"

        onAddToListClick={() => {
          dispatch(fetchAllMealsRequest())
          setAddToListModalOpen(true)
        }}
        generateContent={(editMode) => {
          return <div>
            <Table>
              <TableBody>
                {editMode && (
                  <TableRow>
                    <TableCell colSpan={2} align="right" onClick={() => setDialogRemoveOpen(true)}>
                      <Button color="secondary" size="small"><Token value="removeRetreat" /></Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        }}
        generateItemsList={() => {
          return <RetreatDetailMealList />
        }}
        onCloseEditMode={handleUpdateRetreat}
      />
      {retreatDetail &&
        <>
          <AddToListModal open={addToListModalOpen} retreatId={retreatDetail.id} onClose={onCloseAddToListModal} onCreateMeal={onCreateMeal} />
          <DialogRemove
            open={dialogRemoveOpen}
            handleRemove={handleRemoveRetreat}
            onClose={onCloseRemoveDialog}
            elementName={retreatDetail.name}
          />
        </>
      }
    </div>
  )
}

export default RetreatDetail
