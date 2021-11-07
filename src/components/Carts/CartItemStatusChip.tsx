import { Chip } from '@material-ui/core'
import Token from 'components/Token'
import React from 'react'
import { CartItemStatus } from 'utils/interfaces/cart-item.interface'
import { TranslationTokensType } from 'utils/translations'

interface CartItemStatusChipProps {
  status: TranslationTokensType & CartItemStatus
}

const CartItemStatusChip = ({ status }: CartItemStatusChipProps) => {
  return (
    <Chip label={<Token value={status} />} />
  )
}

export default CartItemStatusChip
