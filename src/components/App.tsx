import React, { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// import Navigation from './Navigation/Navigation'

// import NotFound from './NotFound'
// import Login from './Login/Login'
// import Retreats from './Retreats/Retreats'
// import RetreatDetail from './Retreats/RetreatDetail'
// import Ingredients from './Ingredients/Ingredients'
// import Dishes from './Dishes/Dishes'
// import DishesDetail from './Dishes/DishesDetail'
// import Meals from './Meals/Meals'
// import MealDetail from './Meals/MealDetail'
// import Notifications from './Notifications/Notifications'

const Navigation = lazy(() => import('./Navigation/Navigation'))
const NotFound = lazy(() => import('components/NotFound'))
const Login = lazy(() => import('components/Login/Login'))
const Retreats = lazy(() => import('components/Retreats/Retreats'))
const RetreatDetail = lazy(() => import('components/Retreats/RetreatDetail'))
const Ingredients = lazy(() => import('components/Ingredients/Ingredients'))
const Dishes = lazy(() => import('components/Dishes/Dishes'))
const DishesDetail = lazy(() => import('components/Dishes/DishesDetail'))
const Meals = lazy(() => import('components/Meals/Meals'))
const MealDetail = lazy(() => import('components/Meals/MealDetail'))
const Notifications = lazy(() => import('components/Notifications/Notifications'))

import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import { ThemeProvider, createTheme, CssBaseline, CircularProgress } from '@material-ui/core'
import { getPalette } from 'utils/palette'
import storage from 'utils/storage'
import { changeLanguage, tryLogin, toggleDarkMode, setDefaultItemsPerPage } from 'store/user/actions'
import CartDetail from './Carts/CartDetail'
import Carts from './Carts/Carts'


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
        <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '40vh' }}><CircularProgress /></div>}>
          <Switch>
            <Route exact path="/" component={Retreats} />
            <Route exact path="/retreats" component={Retreats} />
            <Route exact path="/retreats/:id" component={RetreatDetail} />
            <Route exact path="/meals" component={Meals} />
            <Route exact path="/meals/:id" component={MealDetail} />
            <Route exact path="/dishes" component={Dishes} />
            <Route exact path="/dishes/:id" component={DishesDetail} />
            <Route exact path="/ingredients" component={Ingredients} />
            <Route exact path="/carts" component={Carts} />
            <Route exact path="/carts/:id" component={CartDetail} />
            <Route path="/" component={NotFound} />
          </Switch>
        </Suspense>
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
