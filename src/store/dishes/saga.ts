import { call, put, takeLatest } from 'redux-saga/effects'
import { DishesApi } from 'store/api'

import { fetchAllDishesFailed, fetchAllDishesSuccess, fetchIngredientRowsFailed, fetchIngredientRowsSuccess } from './actions'
import { DishActionTypes, DishesResponse, FetchIngredientsRequestType, IngredientRowsResponse } from './types'

function* fetchAllDishes() {
  try {
    const response: DishesResponse = yield call(DishesApi.getAll)
    const allDishes = response.dishes

    yield put(fetchAllDishesSuccess(allDishes))
  }
  catch (err) {
    yield put(fetchAllDishesFailed(err))
  }
}

function* fetchIngredientRows({ dishId }: FetchIngredientsRequestType) {
  try {
    const response: IngredientRowsResponse = yield call(DishesApi.getIngredientsForDish, dishId)
    const ingredientRows = response.ingredientRows

    yield put(fetchIngredientRowsSuccess(ingredientRows))
  }
  catch (err) {
    yield put(fetchIngredientRowsFailed(err))
  }
}

export default function* watch() {
  yield takeLatest(DishActionTypes.FETCH_ALL_REQUEST, fetchAllDishes)
  yield takeLatest(DishActionTypes.FETCH_INGREDIENTS_REQUEST, fetchIngredientRows)
}
