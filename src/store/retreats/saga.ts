import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { RetreatsApi } from 'store/api'
import {
  addMealSuccess,
  createRetreatSuccess,
  deleteRetreatSuccess,
  fetchAllRetreatsSuccess,
  fetchRetreatDetailRequest,
  fetchRetreatDetailSuccess,
  handleError,
  removeMealSuccess,
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
    yield put(createRetreatSuccess(response.data, 'Retreat created successfully!'))
  }
  catch (err: any) {
    yield put(handleError('Failed to create retreat', err))
  }
}

function* deleteRetreat({ id }: DeleteRetreatRequestType) {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.deleteRetreat, id)
    yield put(deleteRetreatSuccess(response.data, 'Retreat deleted successfully!'))
  }
  catch (err: any) {
    yield put(handleError('Failed to delete retreat', err))
  }
}

function* updateRetreat({ retreat }: UpdateRetreatRequestType) {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.updateRetreat, retreat)
    yield put(updateRetreatSuccess(response.data, 'Retreat updated successfully!'))
  }
  catch (err: any) {
    yield put(handleError('Failed to update retreat', err))
  }
}

function* addMealToRetreat({ meal }: AddMealRequestType) {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.addMeal, meal)
    yield put(addMealSuccess(response.data, 'Meal added successfully!'))
    yield put(fetchRetreatDetailRequest(meal.retreat))

  }
  catch (err: any) {
    yield put(handleError('Failed to add meal to retreat', err))
  }
}

function* updateMealInRetreat({ meal }: UpdateMealRequestType) {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.updateMeal, meal)
    yield put(updateMealSuccess(response.data, 'Meal updated successfully!'))
    yield put(fetchRetreatDetailRequest(meal.retreat))
  }
  catch (err: any) {
    yield put(handleError('Failed to update meal in a retreat', err))
  }
}

function* removeMealFromRetreat({ mealInaRetreatId }: RemoveMealRequestType) {
  try {
    const response: AxiosResponse = yield call(RetreatsApi.removeMeal, mealInaRetreatId)
    yield put(removeMealSuccess(mealInaRetreatId, 'Meal removed successfully!'))
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
