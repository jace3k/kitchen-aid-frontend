import React from 'react'
import { styled } from '@mui/material/styles'
import { Fab, FabProps } from '@mui/material'

const StyledFab = styled(Fab)<FabProps>(({ theme }) => {
  return {
    // position: 'fixed',
    // bottom: theme.spacing(10),
    // right: theme.spacing(2),
    // [theme.breakpoints.up('md')]: {
    //   right: theme.spacing(10),
    // }
  }
})

export default StyledFab
