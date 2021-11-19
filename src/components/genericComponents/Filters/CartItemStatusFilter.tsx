import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Token from 'components/Token'
import React from 'react'
import { TableInstance } from 'react-table'


const CartItemStatusFilter = ({ column }: TableInstance) => {
  const { filterValue, setFilter } = column
  return (
    <div>
      <FormControl fullWidth size="small" sx={{ marginTop: 1 }}>
        <InputLabel><Token value="status" /></InputLabel>
        <Select
          value={filterValue || ""}
          onChange={e => setFilter(e.target.value)}
          fullWidth
          size="small"
          label={<Token value="status" />}
        >
          <MenuItem value=""><Token value="all" /></MenuItem>
          <MenuItem value="PE"><Token value="PE" /></MenuItem>
          <MenuItem value="BO"><Token value="BO" /></MenuItem>
          <MenuItem value="SE"><Token value="SE" /></MenuItem>
        </Select>
      </FormControl>

    </div>
  )
}

export default CartItemStatusFilter
