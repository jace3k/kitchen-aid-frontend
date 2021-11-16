import React from 'react'
import { Chip } from '@mui/material'
import { CartItemStatus } from 'utils/interfaces/cart-item.interface'
import { TranslationTokensType } from 'utils/translations'
import Token from 'components/Token'


interface CartItemStatusChipProps {
  status: TranslationTokensType & CartItemStatus
}

const CartItemStatusChip = ({ status }: CartItemStatusChipProps) => {
  return (
    <Chip label={<Token value={status} />} />
  )
}

export default CartItemStatusChip
