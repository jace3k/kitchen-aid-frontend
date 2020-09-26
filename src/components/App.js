import React from 'react'
import '../styles/app.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './Navigation'
import Home from './Home'
import About from './About'

const App = () => {
  return (
      <Router>
        <Route path="/" component={Navigation} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </Switch>
      </Router>
  )
}

export default App