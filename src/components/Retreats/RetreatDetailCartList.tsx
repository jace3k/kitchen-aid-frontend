import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Row } from 'react-table'
import { IconButton } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Delete'
import NewTabIcon from '@material-ui/icons/OpenInNew'
import { ApplicationState } from 'store'
import Token from 'components/Token'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import { Cart } from 'utils/interfaces/cart.interface'
import { deleteCartRequest } from 'store/carts/actions'
import CartName from '../Carts/CartName'
import * as routes from 'utils/routes'

const RetreatDetailCartList = () => {
  const dispatch = useDispatch()
  const { carts, loading, retreatDetail } = useSelector((state: ApplicationState) => state.retreats)
  const [currentEdit, setCurrentEdit] = useState<null | Cart>(null)
  const [cartRemoveDialogOpen, setCartRemoveDialogOpen] = useState(false)

  const handleCartRemove = () => {
    if (!currentEdit)
      return

    dispatch(deleteCartRequest(currentEdit))
    setCartRemoveDialogOpen(false)
    setCurrentEdit(null)
  }

  const onCloseCartRemove = () => {
    setCartRemoveDialogOpen(false)
  }

  const onRowCartClick = (row: Row<Cart>) => {
    const id = row.original.id
    window.open(routes.Carts + '/' + id, '_blank')
  }

  const columns = [
    {
      id: '1',
      Header: <Token value="cartLabel" />,
      Cell: ({ row }: CellProps<Cart>) => {
        return <CartName id={row.original.id} />
      }
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<Cart>) => {
        return <div style={{ minWidth: 60 }}>
          <IconButton
            size="small"
            onClick={() => {
              setCurrentEdit(row.original)
              setCartRemoveDialogOpen(true)
            }}
          >
            <RemoveIcon />
          </IconButton>
        </div>
      }
    }
  ]
  return (
    <>
      <GenericTable columns={columns} data={carts} loading={loading} onRowClick={onRowCartClick} />
      {currentEdit && <DialogRemove
        open={cartRemoveDialogOpen}
        handleRemove={handleCartRemove}
        onClose={onCloseCartRemove}
        elementName={<CartName id={currentEdit.id} />}
      />}
    </>
  )
}

export default RetreatDetailCartList
