import React from 'react'
import { TextField } from '@mui/material'

interface CellTextFieldProps {
  value: any
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  handleUpdate: () => void
  number?: boolean
}

const CellTextField: React.FC<CellTextFieldProps> = ({ value, onChange, handleUpdate, number }) => {
  return (
    <TextField
      type={number ? "number" : "text"}
      autoFocus
      value={value}
      onChange={onChange}
      size="small"
      sx={{ minWidth: 100 }}
      onKeyPress={e => {
        if (e.key === 'Enter')
          handleUpdate()
      }}
    />
  )
}

export default CellTextField
