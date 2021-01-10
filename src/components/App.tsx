import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navigation from './Navigation'
import Home from './Home'
import About from './About'
import NotFound from './NotFound'
import { useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import Login from './Login'

const App: React.FC = () => {
  const authorized = useSelector((state: ApplicationState) => state.user.authorized)
  let router

  if (authorized) {
    router = (
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
    router = (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/admin" component={Admin} /> */}
          <Route path="/" component={NotFound} />
        </Switch>
      </Router>
    )
  }

  return router
}

export default App