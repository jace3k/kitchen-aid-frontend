import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Navigation from './scenes/Navigation'
import Home from './scenes/Home'
import { green, red, grey } from '@material-ui/core/colors'
import CreateRetreat from './scenes/CreateRetreat'
import ShowReteat from './scenes/ShowReteat'


const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
    divider: '#eeeeee'
  },
  status: {
    danger: 'orange',
  },
});

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
        
          <Router>
          <Navigation />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/create" component={CreateRetreat} />
              <Route exact path="/retreat/:id" component={ShowReteat} />
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    );
  }
}

export default App
