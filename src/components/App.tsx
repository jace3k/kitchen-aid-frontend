import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navigation from './Navigation'
import Home from './Home'
import About from './About'
import NotFound from './NotFound'
import Login from './Login/Login'

import { useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core'
import { getPalette } from 'utils/palette'
import Notifications from './Notifications/Notifications'

const App: React.FC = () => {
  const authorized = useSelector((state: ApplicationState) => state.user.authorized)
  const isDarkMode = useSelector((state: ApplicationState) => state.user.darkMode)
  const theme = createMuiTheme({
    palette: getPalette(isDarkMode),
    // typography: {
    //   fontFamily: 'Nunito, sans-serif'
    // }
  })

  let RouterComponent: () => any

  if (authorized) {
    RouterComponent = () => (
      <Router>
        <Route path="/" component={Navigation} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
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
          <Route path="/" component={NotFound} />
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