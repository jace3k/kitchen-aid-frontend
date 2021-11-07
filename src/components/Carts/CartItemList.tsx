import React, { useState } from 'react'
import { IconButton, MenuItem, Select, TextField } from '@material-ui/core'
import Token from 'components/Token'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column } from 'react-table'
import { ApplicationState } from 'store'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import { DishInaMeal } from 'utils/interfaces/dish-ina-meal.interface'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import { CartItemDto, CartItemInCart } from 'utils/interfaces/cart-item.interface'
import { removeCartItemRequest, updateCartItemRequest } from 'store/carts/actions'
import CloseIcon from '@material-ui/icons/Check'
import RemoveIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CartItemStatusChip from './CartItemStatusChip'


const CartItemList = () => {
  const dispatch = useDispatch()
  const { cartItems, loading } = useSelector((state: ApplicationState) => state.carts)
  const [currentEdit, setCurrentEdit] = useState<null | CartItemInCart>(null)
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)

  const handleCartItemUpdate = (cart: CartItemInCart, newCart: CartItemDto) => {
    if (
      cart.amount === newCart.amount &&
      cart.due_date === newCart.due_date &&
      cart.status === newCart.status
    ) return

    dispatch(updateCartItemRequest(newCart))
  }

  const handleRemove = () => {
    if (!currentEdit)
      return

    dispatch(removeCartItemRequest(currentEdit.id))
    setRemoveDialogOpen(false)
    setCurrentEdit(null)
  }

  const onCloseRemove = () => {
    setRemoveDialogOpen(false)
  }

  const columns: Column<DishInaMeal>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="cartItem" />,
      Cell: ({ row }: CellProps<CartItemInCart>) => {
        return row.original.ingredient.name
      }
    },
    {
      id: '2',
      Header: <Token value="amount" />,
      Cell: ({ row }: CellProps<CartItemInCart>) => {
        const [currentEditAmount, setCurrentEditAmount] = useState(row.original.amount)
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              value={currentEditAmount}
              onChange={e => setCurrentEditAmount(e.target.value)}
              onBlur={() => {
                handleCartItemUpdate(row.original, {
                  id: row.original.id,
                  amount: currentEditAmount.replace(',', '.'),
                  due_date: row.original.due_date,
                  status: row.original.status,
                  ingredient: row.original.ingredient.id,
                  cart: row.original.cart,
                })
                setCurrentEdit(null)
              }}
            />
          )
        }
        return (
          // <TextField disabled value={row.original.amount} />
          row.original.amount
        )
      }
    },
    {
      id: '3',
      Header: <Token value="dueDate" />,
      Cell: ({ row }: CellProps<CartItemInCart>) => {
        const [currentEditDueDate, setCurrentEditDueDate] = useState(row.original.due_date)
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              type="date"
              value={currentEditDueDate}
              onChange={e => setCurrentEditDueDate(e.target.value)}
              onBlur={() => {
                handleCartItemUpdate(row.original, {
                  id: row.original.id,
                  amount: row.original.amount,
                  due_date: currentEditDueDate,
                  status: row.original.status,
                  ingredient: row.original.ingredient.id,
                  cart: row.original.cart,
                })
                setCurrentEdit(null)
              }}
            />
          )
        }
        return (
          // <TextField disabled type="date" value={row.original.due_date} />
          row.original.due_date
        )
      }
    },
    {
      id: '4',
      Header: <Token value="status" />,
      Cell: ({ row }: CellProps<CartItemInCart>) => {
        const [currentEditStatus, setCurrentEditStatus] = useState(row.original.status)
        if (currentEdit?.id === row.original.id) {
          return (
            <Select
              value={currentEditStatus}
              onChange={(e: any) => setCurrentEditStatus(e.target.value)}
              onBlur={() => {
                handleCartItemUpdate(row.original, {
                  id: row.original.id,
                  amount: row.original.amount,
                  due_date: row.original.due_date,
                  status: currentEditStatus,
                  ingredient: row.original.ingredient.id,
                  cart: row.original.cart,
                })
                setCurrentEdit(null)
              }}
            >
              <MenuItem value="PE"><Token value="PE" /></MenuItem>
              <MenuItem value="BO"><Token value="BO" /></MenuItem>
              <MenuItem value="SE"><Token value="SE" /></MenuItem>
            </Select>
          )
        }
        return <CartItemStatusChip status={row.original.status} />
      }
    },
    {
      id: '99',
      Header: <Token value="more" />,
      Cell: ({ row }: CellProps<CartItemInCart>) => {
        return (
          <div style={{ minWidth: 60 }}>
            {
              currentEdit?.id === row.original.id
                ? (
                  <IconButton
                    size="small"
                    onClick={() => setCurrentEdit(null)}
                  >
                    <CloseIcon />
                  </IconButton>
                )
                : (
                  <IconButton
                    size="small"
                    onClick={() => setCurrentEdit(row.original)}
                  >
                    <EditIcon />
                  </IconButton>
                )
            }
            <IconButton
              size="small"
              onClick={() => {
                setCurrentEdit(row.original)
                setRemoveDialogOpen(true)
              }}
            >
              <RemoveIcon />
            </IconButton>
          </div>
        )
      },
    }
  ], [currentEdit])

  return (
    <>
      <GenericTable columns={columns} data={cartItems} loading={loading} />
      {currentEdit && <DialogRemove open={removeDialogOpen} handleRemove={handleRemove} onClose={onCloseRemove} elementName={currentEdit.ingredient.name} />}
    </>
  )
}

export default CartItemList
