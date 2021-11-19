import { TextField } from '@mui/material'
import React from 'react'
import { TableInstance } from 'react-table'


const TextFilter = ({ column }: TableInstance) => {
  const { filterValue, setFilter } = column
  return (
    <div>
      <TextField
        value={filterValue || ""}
        onChange={e => setFilter(e.target.value)}
        size="small"
        // fullWidth
      />

    </div>
  )
}

export default TextFilter
