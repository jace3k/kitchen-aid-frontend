import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navigation from './Navigation'
import Home from './Home'
import About from './About'
import NotFound from './NotFound'

const App: React.FC = () => {
  return (
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

export default App