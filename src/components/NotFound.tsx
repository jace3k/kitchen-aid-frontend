import React from 'react'
import { Button } from '@mui/material'
import Token from './Token'


const NotFound: React.FC = () => {

  return (
    <div style={{ textAlign: 'center' }}>
      <h2><Token value="notFound" /></h2>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => window.location.pathname = '/'}>
        <Token value="backToHome" />
      </Button>
    </div>
  )
}

export default NotFound
