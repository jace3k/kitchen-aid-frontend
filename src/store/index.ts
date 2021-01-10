import { Store, createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { all } from 'redux-saga/effects'

import { simpleReducer } from './simple/reducer'
import { SimpleState } from './simple/types'
import simpleSaga from './simple/saga'

import { userReducer } from './user/reducer'
import { UserState } from './user/types'
import userSaga from './user/saga'


////////////////////////////////////////////////
// When adding new store object, add it to application state and saga below.

export interface ApplicationState {
  simple: SimpleState,
  user: UserState,
}

const rootReducer = combineReducers<ApplicationState>({
  simple: simpleReducer,
  user: userReducer,
})

function* rootSaga() {
  yield all([
    simpleSaga(),
    userSaga(),
  ])
}

////////////////////////////////////////////////

let store: Store<ApplicationState>
const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  sagaMiddleware,
]

if (process.env.NODE_ENV?.toLowerCase() === 'production') {
  store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  )
}
else {
  store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(...middlewares)
    )
  )
}

sagaMiddleware.run(rootSaga)

export default store
