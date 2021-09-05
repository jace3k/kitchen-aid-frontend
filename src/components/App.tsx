import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Navigation from './Navigation/Navigation'

import About from './About'
import NotFound from './NotFound'
import Login from './Login/Login'
import Retreats from './Retreats/Retreats'
import RetreatDetail from './Retreats/RetreatDetail'
import Ingredients from './Ingredients/Ingredients'
import Notifications from './Notifications/Notifications'
import Loader from './Loader/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import { ThemeProvider, createTheme, CssBaseline } from '@material-ui/core'
import { getPalette } from 'utils/palette'
import storage from 'utils/storage'
import { changeLanguage, tryLogin, toggleDarkMode, setDefaultItemsPerPage } from 'store/user/actions'
import Dishes from './Dishes/Dishes'
import DishesDetail from './Dishes/DishesDetail'
import Meals from './Meals/Meals'
import MealDetail from './Meals/MealDetail'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const authorized = useSelector((state: ApplicationState) => state.user.authorized)
  const redirect = useSelector((state: ApplicationState) => state.user.redirect)
  const isDarkMode = useSelector((state: ApplicationState) => state.user.darkMode)
  const theme = createTheme({
    palette: getPalette(isDarkMode),
  })

  useEffect(() => {
    const currentLanguage = storage.getLanguage()
    dispatch(changeLanguage(currentLanguage))

    const darkMode = storage.isDarkMode()
    dispatch(toggleDarkMode(darkMode))

    const itemsPerPage = storage.getDefaultItemsPerPage()
    if (itemsPerPage) {
      dispatch(setDefaultItemsPerPage(parseInt(itemsPerPage)))
    }

    dispatch(tryLogin())
  }, [])

  useEffect(() => {
    if (redirect) {
      console.log('Logged out. Redirection to Home')
      window.location.pathname = redirect
    }
  }, [redirect])

  let RouterComponent: () => any

  if (authorized) {
    RouterComponent = () => (
      <Router>
        <Route path="/" component={Navigation} />
        <Route path="/" component={Loader} />
        <Switch>
          <Route exact path="/" component={Retreats} />
          <Route exact path="/retreats" component={Retreats} />
          <Route exact path="/retreats/:id" component={RetreatDetail} />
          <Route exact path="/meals" component={Meals} />
          <Route exact path="/meals/:id" component={MealDetail} />
          <Route exact path="/dishes" component={Dishes} />
          <Route exact path="/dishes/:id" component={DishesDetail} />
          <Route exact path="/ingredients" component={Ingredients} />
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
