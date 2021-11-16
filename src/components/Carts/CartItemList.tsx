import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column } from 'react-table'
import moment, { Moment } from 'moment';
import { IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { DesktopDatePicker, MobileDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import CloseIcon from '@mui/icons-material/Check'
import RemoveIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { ApplicationState } from 'store'
import { removeCartItemRequest, updateCartItemRequest } from 'store/carts/actions'
import { DishInaMeal } from 'utils/interfaces/dish-ina-meal.interface'
import { CartItemDto, CartItemInCart, CartItemStatus } from 'utils/interfaces/cart-item.interface'
import { DATE_PICKER_MASK, MOMENT_DATE_DISPLAY_FORMAT, MOMENT_DATE_SAVE_FORMAT } from 'utils/constants';
import Token from 'components/Token'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
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
        return (
          <Typography sx={{ minWidth: 150 }}>
            {row.original.ingredient.name}
          </Typography>
        )
      }
    },
    {
      id: '2',
      Header: <Token value="amount" />,
      Cell: ({ row }: CellProps<CartItemInCart>) => {
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              size="small"
              type="number"
              sx={{ minWidth: 150 }}
              value={row.state.currentEditAmount || row.original.amount}
              onChange={event => {
                row.setState((state: any) => ({ ...state, currentEditAmount: event.target.value }))
              }}
            />
          )
        }
        return (
          row.original.amount
        )
      }
    },
    {
      id: '3',
      Header: <Token value="dueDate" />,
      Cell: ({ row }: CellProps<CartItemInCart>) => {
        if (currentEdit?.id === row.original.id) {
          return (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                mask={DATE_PICKER_MASK}
                inputFormat={MOMENT_DATE_DISPLAY_FORMAT}
                value={row.state.currentEditDueDate || row.original.due_date}
                onChange={value => {
                  row.setState((state: any) => ({ ...state, currentEditDueDate: value }))
                }}
                renderInput={(params) => <TextField {...params} size="small" sx={{ minWidth: 150 }} />}
              />
            </LocalizationProvider>
          )
        }
        return (
          <Typography variant="body2" sx={{ minWidth: 100 }}>
            {moment(row.original.due_date).format(MOMENT_DATE_DISPLAY_FORMAT)}
          </Typography>
        )
      }
    },
    {
      id: '4',
      Header: <Token value="status" />,
      Cell: ({ row }: CellProps<CartItemInCart>) => {
        if (currentEdit?.id === row.original.id) {
          return (
            <Select
              sx={{ minWidth: 150 }}
              size="small"
              value={row.state.currentEditStatus || row.original.status}
              onChange={event => {
                row.setState((state: any) => ({ ...state, currentEditStatus: event.target.value }))
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
          <Stack direction="row" justifyContent="end">
            {
              currentEdit?.id === row.original.id
                ? (
                  <IconButton
                    size="small"
                    onClick={() => {
                      setCurrentEdit(null)
                      const newCart = {
                        id: row.original.id,
                        ingredient: row.original.ingredient.id,
                        cart: row.original.cart,
                        amount: row.state.currentEditAmount as string || row.original.amount,
                        due_date: row.state.currentEditDueDate
                          ? (row.state.currentEditDueDate as Moment).format(MOMENT_DATE_SAVE_FORMAT)
                          : row.original.due_date,
                        status: row.state.currentEditStatus as CartItemStatus || row.original.status,
                      }
                      handleCartItemUpdate(row.original, newCart)
                    }}
                  >
                    <CloseIcon color="success" />
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
          </Stack>
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
