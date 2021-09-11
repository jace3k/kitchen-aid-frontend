import { CircularProgress } from '@material-ui/core'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'store/index'

// import App from 'components/App'
const App = lazy(() => import('components/App'))

import './styles.css'

ReactDOM.render(
  <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '40vh' }}><CircularProgress /></div>}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById('root')
);
