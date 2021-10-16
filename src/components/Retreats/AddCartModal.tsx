import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@material-ui/core'
import MealName from 'components/Meals/MealName'
import Token from 'components/Token'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from 'store'


interface AddCartModalProps {
  open: boolean
  retreatId: number
  onClose: () => void
  onCreateCart: () => void
}

const getCurrentDate = () => {
  const date = new Date().toLocaleDateString('pl-PL')
  const [d, m, y] = date.split('.')

  return [y, m, d].join('-')
}

const AddCartModal = ({ open, onClose, onCreateCart, retreatId }: AddCartModalProps) => {
  const [selectedCart, setSelectedCart] = useState("empty")
  const [selectedDateFrom, setSelectedDateFrom] = useState(getCurrentDate());
  const [selectedDateTo, setSelectedDateTo] = useState(getCurrentDate());

  const handleChange = (e: any) => {
    setSelectedCart(e.target.value)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle><Token value="createNewCart" /> </DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup name="cartType" value={selectedCart} onChange={handleChange}>
            <FormControlLabel value={"empty"} control={<Radio />} label={<Token value="emptyCart" />} />
            <FormControlLabel value={"generated"} control={<Radio />} label={<Token value="autoGeneratedCart" />} />
          </RadioGroup>
        </FormControl>
        <div style={{ margin: 10 }} />
        <FormControl fullWidth disabled={selectedCart !== 'generated'}>
          <InputLabel><Token value="cartDateFrom" /></InputLabel>
          <Input value={selectedDateFrom} onChange={e => setSelectedDateFrom(e.target.value)} type="date" />
        </FormControl>
        <FormControl fullWidth disabled={selectedCart !== 'generated'}>
          <InputLabel><Token value="cartDateTo" /></InputLabel>
          <Input value={selectedDateTo} onChange={e => setSelectedDateTo(e.target.value)} type="date" />
        </FormControl>

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <Token value="cancel" />
        </Button>
        <Button
          onClick={() => onCreateCart()}
          color="primary"
        >
          <Token value="create" />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCartModal
