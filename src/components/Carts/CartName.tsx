import React from 'react'
import Token from 'components/Token'
import { Typography } from '@mui/material'


interface CartNameProps {
  id?: number,
  isTitle?: boolean
  withRetreatName?: string
}

const CartName: React.FC<CartNameProps> = ({ id, isTitle, withRetreatName }) => {
  return (
    <Typography sx={{ minWidth: 180, marginTop: 1, marginBottom: 1 }} variant={isTitle ? 'h5' : 'body1'}>
      <Token value={"cartLabel"} /> {`#${id}`}
      {' '}
      {withRetreatName && (`(${withRetreatName})`)}
    </Typography>
  )
}

export default CartName