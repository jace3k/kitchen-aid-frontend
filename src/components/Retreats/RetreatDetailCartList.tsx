import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Row } from 'react-table'
import { Typography } from '@mui/material'
import { ApplicationState } from 'store'
import { deleteCartRequest } from 'store/carts/actions'
import { Cart } from 'utils/interfaces/cart.interface'
import * as routes from 'utils/routes'
import Token from 'components/Token'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import CartName from '../Carts/CartName'
import TextFilter from 'components/genericComponents/Filters/TextFilter'


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
      accessor: 'id',
      Header: <Token value="cartLabel" />,
      Cell: ({ row }: CellProps<Cart>) => {
        return (
          <Typography sx={{ minWidth: 150, marginTop: 1, marginBottom: 1 }} variant="body2">
            <CartName id={row.original.id} />
          </Typography>
        )
      },
      Filter: TextFilter,
    },
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
