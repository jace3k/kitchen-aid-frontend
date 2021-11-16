import React, { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardActions, CardContent, TextField, Typography, Snackbar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ApplicationState } from 'store'
import { loginRequest } from 'store/user/actions'
import Token from 'components/Token'

const LoginContainer = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column-reverse',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    minWidth: 300,
  }
})

const Title = styled(Typography)(({ theme }) => {
  return {
    fontSize: 20,
    [theme.breakpoints.up('sm')]: {
      fontSize: 40,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 70,
    },
  }
})

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { loading } = useSelector((state: ApplicationState) => state.user)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginRequest(username, password))
  }

  const handleChangeUsername = (e: any) => {
    setUsername(e.target.value)
  }

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value)
  }

  return (
    <LoginContainer>
      <Title variant="h1">
        <Token value="welcomeIn" />
        <div style={{ fontWeight: 'bold' }}>
          <Token value="kitchenAid" />!
        </div>
      </Title>
      <div />
      <Card>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Typography sx={{
              textAlign: 'center',
              marginBottom: '30px',
            }}>
              <Token value="kitchenAid" />
            </Typography>
            <TextField
              label={<Token value="username" />}
              variant='outlined'
              sx={{ margin: '5px' }}
              size='small'
              value={username}
              onChange={handleChangeUsername}
              disabled={loading}
            // autoFocus
            />

            <TextField
              label={<Token value="password" />}
              type='password'
              variant='outlined'
              sx={{ margin: '5px' }}
              size='small'
              value={password}
              onChange={handleChangePassword}
              disabled={loading}
            />
          </CardContent>
          <CardActions>
            <Button
              sx={{ width: '100%' }}
              variant='contained'
              type='submit'
              color='primary'
              disabled={loading || password === '' || username === ''}
            >
              <Token value="login" />
            </Button>
          </CardActions>
        </form>
      </Card>
      <div />
    </LoginContainer>
  )
}

export default Login
