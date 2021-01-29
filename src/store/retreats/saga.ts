import { call, put, takeLatest } from 'redux-saga/effects'
import { RetreatsApi } from 'store/api'
import { fetchAllRetreatsFailed, fetchAllRetreatsSuccess, fetchMealsForRetreatFailed, fetchMealsForRetreatSuccess } from './actions'
import { FetchAllMealsForRetreatRequestType, MealRowResponse, RetreatActionTypes, RetreatResponse } from './types'

function* fetchAllRetreats() {
  try {
    const response: RetreatResponse = yield call(RetreatsApi.getAll)
    const allRetreats = response.retreats

    yield put(fetchAllRetreatsSuccess(allRetreats))
  }
  catch (err) {
    yield put(fetchAllRetreatsFailed(err))
  }
}

function* fetchMealsForRetreat({ retreatId }: FetchAllMealsForRetreatRequestType) {
  try {
    const response: MealRowResponse = yield call(RetreatsApi.getMeals, retreatId)
    yield put(fetchMealsForRetreatSuccess(response.mealRows, response.retreat))
  }
  catch (err) {
    yield put(fetchMealsForRetreatFailed(err))
  }
}

export default function* watch() {
  yield takeLatest(RetreatActionTypes.FETCH_ALL_REQUEST, fetchAllRetreats)
  yield takeLatest(RetreatActionTypes.FETCH_MEALS_FOR_RETREAT_REQUEST, fetchMealsForRetreat)
}
