import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { RetreatsApi } from 'store/api'
import {
  // addMealFailed,
  addMealSuccess,
  // createRetreatFailed,
  createRetreatSuccess,
  // deleteRetreatFailed,
  deleteRetreatSuccess,
  // fetchAllRetreatsFailed,
  fetchAllRetreatsSuccess,
  fetchRetreatDetailRequest,
  // fetchRetreatDetailFailed,
  fetchRetreatDetailSuccess,
  handleError,
  // removeMealFailed,
  removeMealSuccess,
  // upadteRetreatFailed,
  // updateMealFailed,
  updateMealSuccess,
  updateRetreatSuccess
} from './actions'
import {
  AddMealRequestType,
  CreateRetreatRequestType,
  DeleteRetreatRequestType,
  FetchRetreatDetailRequestType,
  RemoveMealRequestType,
  RetreatActionTypes,
  UpdateMealRequestType,
  UpdateRetreatRequestType
} from './types'

function* fetchAllRetreats() {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.getAll)
    yield put(fetchAllRetreatsSuccess(response.data))
  }
  catch (err: any) {
    yield put(handleError('Failed to fetch all retreats', err))
  }
}

function* getRetreatDetail({ id }: FetchRetreatDetailRequestType) {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.getDetail, id)
    yield put(fetchRetreatDetailSuccess(response.data))
  }
  catch (err: any) {
    yield put(handleError('Failed to fetch retreat details', err))
  }
}

function* createRetreat({ retreatDto }: CreateRetreatRequestType) {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.createRetreat, retreatDto)
    yield put(createRetreatSuccess(response.data))
  }
  catch (err: any) {
    yield put(handleError('Failed to create retreat', err))
  }
}

function* deleteRetreat({ id }: DeleteRetreatRequestType) {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.deleteRetreat, id)
    yield put(deleteRetreatSuccess(response.data))
  }
  catch (err: any) {
    yield put(handleError('Failed to delete retreat', err))
  }
}

function* updateRetreat({ retreat }: UpdateRetreatRequestType) {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.updateRetreat, retreat)
    yield put(updateRetreatSuccess(response.data))
  }
  catch (err: any) {
    yield put(handleError('Failed to update retreat', err))
  }
}

function* addMealToRetreat({ meal }: AddMealRequestType) {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.addMeal, meal)
    yield put(addMealSuccess(response.data))
    yield put(fetchRetreatDetailRequest(meal.retreat))

  }
  catch (err: any) {
    yield put(handleError('Failed to add meal to retreat', err))
  }
}

function* updateMealInRetreat({ meal }: UpdateMealRequestType) {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.updateMeal, meal)
    console.log('updateMealInRetreat - saga', meal)
    yield put(updateMealSuccess(response.data))
    yield put(fetchRetreatDetailRequest(meal.retreat))
  }
  catch (err: any) {
    yield put(handleError('Failed to update meal in a retreat', err))
  }
}

function* removeMealFromRetreat({ mealInaRetreatId }: RemoveMealRequestType) {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.removeMeal, mealInaRetreatId)
    yield put(removeMealSuccess(mealInaRetreatId))
  }
  catch (err: any) {
    yield put(handleError('Failed to remove meal from retreat', err))
  }
}

export default function* watch() {
  yield takeLatest(RetreatActionTypes.FETCH_ALL_REQUEST, fetchAllRetreats)
  yield takeLatest(RetreatActionTypes.FETCH_RETREAT_DETAIL_REQUEST, getRetreatDetail)
  yield takeLatest(RetreatActionTypes.CREATE_RETREAT_REQUEST, createRetreat)
  yield takeLatest(RetreatActionTypes.DELETE_RETREAT_REQUEST, deleteRetreat)
  yield takeLatest(RetreatActionTypes.UPDATE_RETREAT_REQUEST, updateRetreat)
  yield takeLatest(RetreatActionTypes.ADD_MEAL_REQUEST, addMealToRetreat)
  yield takeLatest(RetreatActionTypes.UPDATE_MEAL_REQUEST, updateMealInRetreat)
  yield takeLatest(RetreatActionTypes.REMOVE_MEAL_REQUEST, removeMealFromRetreat)
}
