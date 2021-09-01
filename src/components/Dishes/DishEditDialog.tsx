import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Token from 'components/Token'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core'
import { Dish } from 'utils/interfaces/dish.interface'
import { createDishRequest } from 'store/dishes/actions'

interface DishEditDialogProps {
  open: boolean
  dish?: Dish
  onClose: () => void
}

const DishEditDialog = ({ open, dish, onClose }: DishEditDialogProps) => {
  const dispatch = useDispatch()
  const [name, setName] = useState(dish?.name || '')
  const [size, setSize] = useState('')

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <form onSubmit={e => e.preventDefault()}>
        <DialogTitle>
          <Token value="addNewDish" />
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={<Token value="dishNameLabel" />}
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            type="numeric"
          />
          <TextField
            margin="dense"
            label={<Token value="dishSizeLabel" />}
            value={size}
            onChange={e => setSize(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            <Token value="cancel" />
          </Button>
          <Button
            onClick={() => {
              dispatch(createDishRequest(name, parseInt(size)))
              onClose()
              setName('')
              setSize('')
            }}
            color="primary"
            type="submit"
            disabled={name === '' || size === '' || !parseInt(size)}
          >
            <Token value="create" />
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DishEditDialog