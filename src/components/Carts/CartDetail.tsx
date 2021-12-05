import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Container, Divider, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Delete'

import { ApplicationState } from 'store'
import { addCartItemRequest, deleteCartRequest, fetchCartDetailRequest } from 'store/carts/actions'
import { fetchAllIngredientsRequest } from 'store/ingredients/actions'
import * as routes from 'utils/routes'
import { CartItemDto } from 'utils/interfaces/cart-item.interface'
import CartName from './CartName'
import CartItemList from './CartItemList'
import AddCartItemModal from './AddCartItemModal'
import Token from 'components/Token'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'


const CartDetail: React.FC<RouteComponentProps<{ id: string }>> = props => {
  const dispatch = useDispatch()
  const { cartDetail, loading, removed, error } = useSelector((state: ApplicationState) => state.carts)
  const [addToListModalOpen, setAddToListModalOpen] = useState(false)
  const [dialogRemoveOpen, setDialogRemoveOpen] = useState(false)

  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchCartDetailRequest(parseInt(id)))
  }, [])

  useEffect(() => {
    if (removed) {
      props.history.replace(routes.Carts)
    }
  }, [removed])

  const onCloseRemoveCartDialog = () => {
    setDialogRemoveOpen(false)
  }

  const handleRemoveCart = () => {
    if (cartDetail) {
      const cart = {
        id: cartDetail.id,
        retreat: cartDetail.retreat.id
      }
      dispatch(deleteCartRequest(cart))
    }

    onCloseRemoveCartDialog()
  }

  const onCloseAddToListModal = () => {
    setAddToListModalOpen(false)
  }

  const onCreateCartItem = (cartItem: CartItemDto) => {
    dispatch(addCartItemRequest(cartItem))
    setAddToListModalOpen(false)
  }

  if (!loading && !cartDetail)
    return (
      <div style={{ textAlign: 'center' }}>
        <h1><Token value="elementNotFound" /></h1>
        <h3><Token value="elementNotFoundDesc" /></h3>
        <Button variant="outlined" onClick={() => window.location.pathname = '/'}>
          <Token value="backToHome" />
        </Button>
      </div>
    )

  return (
    <div>
      <Container>
        <Box sx={{ marginTop: 1, marginBottom: 1 }}>
          {loading
            ? (
              <Typography variant="h5" sx={{ minWidth: 180 }}>
                <Token value="loadingData" />
              </Typography>
            )
            : <CartName id={cartDetail?.id} isTitle withRetreatName={cartDetail?.retreat.name} />}

        </Box>
        <Divider style={{ marginBottom: 10 }} />
        <div style={{ margin: 10 }}>
          <Button color="primary" onClick={() => {
            dispatch(fetchAllIngredientsRequest())
            setAddToListModalOpen(true)
          }}>
            <AddIcon /> <Token value="add" />
          </Button>
          <Button color="secondary" onClick={() => {
            setDialogRemoveOpen(true)
          }}>
            <RemoveIcon /> <Token value="removeCart" />
          </Button>
        </div>
        <div>
          <CartItemList />
        </div>
      </Container>
      {cartDetail &&
        <>
          <AddCartItemModal
            open={addToListModalOpen}
            cartId={cartDetail.id}
            onClose={onCloseAddToListModal}
            onCreateCartItem={onCreateCartItem}
          />
          <DialogRemove
            open={dialogRemoveOpen}
            handleRemove={handleRemoveCart}
            onClose={onCloseRemoveCartDialog}
            elementName={<CartName id={cartDetail?.id} />}
          />
        </>
      }
    </div>
  )
}

export default CartDetail
