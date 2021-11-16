import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment, { Moment } from 'moment'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'
import AdapterMoment from '@mui/lab/AdapterMoment'
import { ApplicationState } from 'store'
import { DATE_PICKER_MASK, MOMENT_DATE_DISPLAY_FORMAT, MOMENT_DATE_SAVE_FORMAT } from 'utils/constants'
import { CartItemDto, CartItemStatus } from 'utils/interfaces/cart-item.interface'
import Token from 'components/Token'


interface AddCartItemModalProps {
  open: boolean
  cartId: number
  onClose: () => void
  onCreateCartItem: (cart: CartItemDto) => void
}

const getCurrentDate = () => {
  return moment()
}

const AddCartItemModal = ({ open, cartId, onClose, onCreateCartItem }: AddCartItemModalProps) => {
  const ingredientList = useSelector((state: ApplicationState) => state.ingredients.ingredients)
  const ingredientsLoading = useSelector((state: ApplicationState) => state.ingredients.loading)

  const [selectedIngredient, setSelectedIngredient] = useState('')
  const [selectedAmount, setSelectedAmount] = useState('')
  const [selectedDueDate, setSelectedDueDate] = useState<Moment | null>(getCurrentDate())
  const [selectedStatus, setSelectedStatus] = useState<CartItemStatus>('PE')

  const handleIngredientChange = (e: any) => {
    setSelectedIngredient(e.target.value)
  }

  const handleAmountChange = (e: any) => {
    setSelectedAmount(e.target.value)
  }

  const handleStatusChange = (e: any) => {
    setSelectedStatus(e.target.value)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle><Token value="addNewCartItem" /> </DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <FormControl fullWidth size="small" sx={{ marginTop: 1 }}>
            <InputLabel><Token value="ingredient" /></InputLabel>
            <Select
              value={ingredientsLoading ? '' : selectedIngredient}
              onChange={handleIngredientChange}
              disabled={ingredientsLoading || !ingredientList.length}
              fullWidth
              size="small"
              label={<Token value="ingredient" />}
            >
              {ingredientList.map(ing => (
                <MenuItem value={ing.id} key={ing.id}>{ing.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label={<Token value="amount" />}
              size="small"
              type="number"
              value={selectedAmount}
              onChange={handleAmountChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                mask={DATE_PICKER_MASK}
                inputFormat={MOMENT_DATE_DISPLAY_FORMAT}
                value={selectedDueDate}
                onChange={setSelectedDueDate}
                renderInput={(params) => <TextField {...params} size="small" sx={{ minWidth: 150 }} />}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ marginTop: 1 }}>
            <InputLabel><Token value="status" /></InputLabel>
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              fullWidth
              size="small"
              label={<Token value="status" />}
            >
              <MenuItem value="PE"><Token value="PE" /></MenuItem>
              <MenuItem value="BO"><Token value="BO" /></MenuItem>
              <MenuItem value="SE"><Token value="SE" /></MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <Token value="cancel" />
        </Button>
        <Button
          disabled={selectedIngredient === '' || selectedAmount === ''}
          onClick={() => {
            onCreateCartItem({
              amount: selectedAmount,
              due_date: selectedDueDate ? (selectedDueDate as Moment).format(MOMENT_DATE_SAVE_FORMAT) : '',
              status: selectedStatus,
              ingredient: parseInt(selectedIngredient),
              cart: cartId,
            })
          }}>
          <Token value="add" />
        </Button>
      </DialogActions>
    </Dialog>
  )

}

export default AddCartItemModal
