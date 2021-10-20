import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column } from 'react-table'
import { IconButton, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Check'
import RemoveIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import NewTabIcon from '@material-ui/icons/OpenInNew'
import { ApplicationState } from 'store'
import Token from 'components/Token'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import { Cart } from 'utils/interfaces/cart.interface'
import { deleteCartRequest } from 'store/carts/actions'
import CartName from '../Carts/CartName'

const RetreatDetailCartList = () => {
  const dispatch = useDispatch()
  const { carts, loading } = useSelector((state: ApplicationState) => state.carts)
  const [currentEdit, setCurrentEdit] = useState<null | Cart>(null)
  const [cartRemoveDialogOpen, setCartRemoveDialogOpen] = useState(false)

  const handleCartRemove = () => {
    if (!currentEdit)
      return

    dispatch(deleteCartRequest(currentEdit.id))
    setCartRemoveDialogOpen(false)
    setCurrentEdit(null)
  }

  const onCloseCartRemove = () => {
    setCartRemoveDialogOpen(false)
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
        <div style={{ minWidth: 60 }}>
          <IconButton
            size="small"
            onClick={() => {
              const id = row.original.id
              window.open(`/cart/${id}`, '_blank')
            }}
          >
            <NewTabIcon />
          </IconButton>
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
      <GenericTable columns={columns} data={carts} loading={loading} />
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
