import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import { IconButton } from '@material-ui/core'
import PlusIcon from '@material-ui/icons/Add'
import { Link } from "react-router-dom"


const useStyles = makeStyles({
  root: {
    background: grey[100],
    marginBottom: '1em'
  },
  logo: {
    flex: 2
  },
  toolbar: {
    display: 'flex',
    // justifyContent: 'space-between',
  },
  clean: {
    textDecoration: 'none',
    color: 'inherit'
  },
  flex1: {
    flex: 1
  }
});


export default (props) => {
  const classes = useStyles()

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>

        <div className={classes.flex1}></div>

        <Typography variant="h6" className={classes.logo}>
          <Link to ="/" className={classes.clean}>
            Kitchen Aid
          </Link>
        </Typography>

        <div className={classes.flex1}>
         <Link to='/create'>
            <IconButton>
              <PlusIcon />
            </IconButton>
          </Link>
        </div>
      </Toolbar>

    </AppBar>
  )
}
