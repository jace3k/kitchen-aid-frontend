import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <AppBar sx={{ flex: '0 1 40px', marginTop: 2 }} position="static">
      <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="overline" sx={{ fontStyle: 'italic' }}>
          Copyright &copy; Kitchen Aid {(new Date()).getFullYear()}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
