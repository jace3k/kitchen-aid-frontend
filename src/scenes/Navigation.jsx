import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import { Button } from '@material-ui/core'
import PlusIcon from '@material-ui/icons/AddBox'
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


export default () => {
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
         <Link to='/create' className={classes.clean}>
            <Button>
              <PlusIcon />
              Utwórz retreat
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  )
}
