import Token from 'components/Token'
import React from 'react'

interface CartNameProps {
  id?: number,
}

const CartName: React.FC<CartNameProps> = ({ id }) => {
  return <>
    <Token value={"cartLabel"} /> {`#${id}`}
  </>
}

export default CartName