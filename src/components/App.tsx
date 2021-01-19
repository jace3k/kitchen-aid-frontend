import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Navigation from './Navigation/Navigation'

import About from './About'
import NotFound from './NotFound'
import Login from './Login/Login'
import Retreats from './Retreats/Retreats'
import Notifications from './Notifications/Notifications'

import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core'
import { getPalette } from 'utils/palette'
import storage from 'utils/storage'
import { changeLanguage, tryLogin, toggleDarkMode } from 'store/user/actions'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const authorized = useSelector((state: ApplicationState) => state.user.authorized)
  const isDarkMode = useSelector((state: ApplicationState) => state.user.darkMode)
  const theme = createMuiTheme({
    palette: getPalette(isDarkMode),
  })

  useEffect(() => {
    const currentLanguage = storage.getLanguage()
    dispatch(changeLanguage(currentLanguage))

    const darkMode = storage.isDarkMode()
    dispatch(toggleDarkMode(darkMode))

    dispatch(tryLogin())
  }, [])

  let RouterComponent: () => any

  if (authorized) {
    RouterComponent = () => (
      <Router>
        <Route path="/" component={Navigation} />
        <Redirect from="/" to="/retreats" />
        <Switch>
          <Route path="/retreats" component={Retreats} />
          <Route exact path="/ingredients" component={About} />
          <Route exact path="/meals" component={About} />
          <Route path="/" component={NotFound} />
        </Switch>
      </Router>
    )
  }
  else {
    RouterComponent = () => (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/admin" component={Admin} /> */}
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterComponent />
      <Notifications />
    </ThemeProvider>
  )
}

export default App
