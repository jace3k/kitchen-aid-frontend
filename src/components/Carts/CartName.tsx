import React from 'react'
import Token from 'components/Token'


interface CartNameProps {
  id?: number,
}

const CartName: React.FC<CartNameProps> = ({ id }) => {
  return <>
    <Token value={"cartLabel"} /> {`#${id}`}
  </>
}

export default CartName