import React, { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardActions, CardContent, TextField, Typography, Snackbar } from '@material-ui/core'
import { useStyles } from './styles'
import { ApplicationState } from 'store'
import { loginRequest } from 'store/user/actions'

const Login = () => {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { loading } = useSelector((state: ApplicationState) => state.user)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginRequest(username, password))
  }

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h1">
        Welcome in
        <div className={classes.bold}>Kitchen Aid!</div>
      </Typography>
      <div />
      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className={classes.formContainer}>
            <Typography variant='h5' className={classes.formTitle}>
              Kitchen Aid
            </Typography>
            <TextField
              label='username'
              variant='outlined'
              className={classes.littleMargin}
              size='small'
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={loading}
              autoFocus
            />

            <TextField
              label='password'
              type='password'
              variant='outlined'
              className={classes.littleMargin}
              size='small'
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
          </CardContent>
          <CardActions>
            <Button
              className={classes.fullWidth}
              variant='contained'
              type='submit'
              color='primary'
              disabled={loading || password === '' || username === ''}
            >
              Login
            </Button>
          </CardActions>
        </form>
      </Card>
      <div />
    </div>
  )
}

export default Login
