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

import { retreatReducer } from './retreats/reducer'
import { RetreatsState } from './retreats/types'
import retreatsSaga from './retreats/saga'

import { ingredientReducer } from './ingredients/reducer'
import { IngredientsState } from './ingredients/types'
import ingredientsSaga from './ingredients/saga'

import { dishReducer } from './dishes/reducer'
import { DishesState } from './dishes/types'
import dishesSaga from './dishes/saga'

import { mealsReducer } from './meals/reducer'
import { MealsState } from './meals/types'
import mealsSaga from './meals/saga'

import { cartReducer } from './carts/reducer'
import { CartsState } from './carts/types'
import cartsSaga from './carts/saga'

////////////////////////////////////////////////
// When adding new store object, add it to application state and saga below.

export interface ApplicationState {
  simple: SimpleState,
  user: UserState,
  retreats: RetreatsState,
  ingredients: IngredientsState,
  dishes: DishesState,
  meals: MealsState,
  carts: CartsState,
}

const rootReducer = combineReducers<ApplicationState>({
  simple: simpleReducer,
  user: userReducer,
  retreats: retreatReducer,
  ingredients: ingredientReducer,
  dishes: dishReducer,
  meals: mealsReducer,
  carts: cartReducer
})

function* rootSaga() {
  yield all([
    simpleSaga(),
    userSaga(),
    retreatsSaga(),
    ingredientsSaga(),
    dishesSaga(),
    mealsSaga(),
    cartsSaga(),
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
