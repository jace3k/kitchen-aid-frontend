import { call, put, takeLatest } from 'redux-saga/effects'
import { IngredientsApi } from 'store/api'
import { fetchAllIngredientsFailed, fetchAllIngredientsSuccess } from './actions'
import { IngredientActionTypes, IngredientsResponse } from './types'

function* fetchAllIngredients() {
  try {
    const response: IngredientsResponse = yield call(IngredientsApi.getAll)
    const allIngredients = response.ingredients

    yield put(fetchAllIngredientsSuccess(allIngredients))
  }
  catch (err) {
    yield put(fetchAllIngredientsFailed(err))
  }
}

export default function* watch() {
  yield takeLatest(IngredientActionTypes.FETCH_ALL_REQUEST, fetchAllIngredients)
}
