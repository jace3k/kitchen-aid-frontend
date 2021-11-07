import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, MenuItem, Select, Input } from '@material-ui/core'
import Token from 'components/Token'
import React, { useState } from 'react'
import { CartItemDto, CartItemStatus } from 'utils/interfaces/cart-item.interface'
import { useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import moment from 'moment'
import { MOMENT_DATE_FORMAT } from 'utils/constants'

interface AddCartItemModalProps {
  open: boolean
  cartId: number
  onClose: () => void
  onCreateCartItem: (cart: CartItemDto) => void
}

const getCurrentDate = () => {
  return moment().format(MOMENT_DATE_FORMAT)
}

const AddCartItemModal = ({ open, cartId, onClose, onCreateCartItem }: AddCartItemModalProps) => {
  const ingredientList = useSelector((state: ApplicationState) => state.ingredients.ingredients)
  const ingredientsLoading = useSelector((state: ApplicationState) => state.ingredients.loading)

  const [selectedIngredient, setSelectedIngredient] = useState('')
  const [selectedAmount, setSelectedAmount] = useState('')
  const [selectedDueDate, setSelectedDueDate] = useState(getCurrentDate())
  const [selectedStatus, setSelectedStatus] = useState<CartItemStatus>('PE')

  const handleIngredientChange = (e: any) => {
    setSelectedIngredient(e.target.value)
  }

  const handleAmountChange = (e: any) => {
    setSelectedAmount(e.target.value)
  }

  const handleDueDateChange = (e: any) => {
    setSelectedDueDate(e.target.value)
  }

  const handleStatusChange = (e: any) => {
    setSelectedStatus(e.target.value)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle><Token value="addNewCartItem" /> </DialogTitle>
      <DialogContent>
        <FormControl fullWidth disabled={ingredientsLoading}>
          <InputLabel><Token value="ingredient" /></InputLabel>
          <Select
            value={ingredientsLoading ? '' : selectedIngredient}
            onChange={handleIngredientChange}
            disabled={!ingredientList.length}
          >
            {ingredientList.map(ing => (
              <MenuItem value={ing.id} key={ing.id}>{ing.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ margin: 10 }} />
        <FormControl fullWidth>
          <InputLabel><Token value="amount" /></InputLabel>
          <Input value={selectedAmount} onChange={handleAmountChange} type="number" />
        </FormControl>
        <div style={{ margin: 10 }} />
        <FormControl fullWidth>
          <InputLabel><Token value="dueDate" /></InputLabel>
          <Input value={selectedDueDate} onChange={handleDueDateChange} type="date" />
        </FormControl>
        <div style={{ margin: 10 }} />
        <FormControl fullWidth>
          <InputLabel><Token value="status" /></InputLabel>
          <Select value={selectedStatus} onChange={handleStatusChange} >
            <MenuItem value="PE"><Token value="PE" /></MenuItem>
            <MenuItem value="BO"><Token value="BO" /></MenuItem>
            <MenuItem value="SE"><Token value="SE" /></MenuItem>
          </Select>
        </FormControl>
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
              due_date: selectedDueDate,
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
