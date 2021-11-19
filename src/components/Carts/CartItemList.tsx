import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CellProps, Column, Row } from 'react-table'
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
import { DATE_PICKER_MASK, MOMENT_DATE_DISPLAY_FORMAT, MOMENT_DATE_SAVE_FORMAT, STATUS_MAP } from 'utils/constants';
import Token from 'components/Token'
import DialogRemove from 'components/genericComponents/DialogRemove/DialogRemove'
import GenericTable from 'components/genericComponents/GenericTable/GenericTable'
import CartItemStatusChip from './CartItemStatusChip'
import TextFilter from 'components/genericComponents/Filters/TextFilter';
import CartItemStatusFilter from 'components/genericComponents/Filters/CartItemStatusFilter';
import { v } from 'utils/helper';


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

  const columns: Column<CartItemInCart>[] = useMemo(() => [
    {
      id: '1',
      Header: <Token value="cartItem" />,
      accessor: 'ingredient',
      sortType: (a: Row<CartItemInCart>, b: Row<CartItemInCart>) => {
        return a.original.ingredient.name.toLowerCase().localeCompare(b.original.ingredient.name.toLowerCase())
      },
      Cell: ({ row }: CellProps<CartItemInCart>) => {
        return (
          <Typography sx={{ minWidth: 150 }}>
            {row.original.ingredient.name}
          </Typography>
        )
      },
      Filter: TextFilter,
      filter: (rows: Row<CartItemInCart>[], columnIds: String[], filterValue: string) => {
        return rows.filter(row => row.original.ingredient.name.toLowerCase().includes(filterValue.toLowerCase()))
      }
    },
    {
      id: '2',
      Header: <Token value="amount" />,
      accessor: 'amount',
      Cell: ({ row }: CellProps<CartItemInCart>) => {
        if (currentEdit?.id === row.original.id) {
          return (
            <TextField
              size="small"
              type="number"
              sx={{ minWidth: 150 }}
              value={v(row.state.currentEditAmount, row.original.amount)}
              onChange={event => {
                row.setState((state: any) => ({ ...state, currentEditAmount: event.target.value }))
              }}
            />
          )
        }
        return (
          row.original.amount
        )
      },
      Filter: TextFilter
    },
    {
      id: '3',
      Header: <Token value="dueDate" />,
      accessor: 'due_date',
      sortType: (a: Row<CartItemInCart>, b: Row<CartItemInCart>) => {
        if (new Date(a.original.due_date) > new Date(b.original.due_date))
          return 1
        return -1
      },
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
      },
      Filter: TextFilter,
      filter: (rows: Row<CartItemInCart>[], columnIds: String[], filterValue: string) => {
        return rows.filter(row => moment(row.original.due_date).format(MOMENT_DATE_DISPLAY_FORMAT).includes(filterValue))
      },
    },
    {
      id: '4',
      Header: <Token value="status" />,
      accessor: 'status',
      sortType: (a: Row<CartItemInCart>, b: Row<CartItemInCart>) => {
        return STATUS_MAP[a.original.status] - STATUS_MAP[b.original.status]
      },
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
      },
      Filter: CartItemStatusFilter,
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
