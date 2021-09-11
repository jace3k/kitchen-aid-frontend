import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { IngredientsApi } from 'store/api'
import {
  createIngredientSuccess,
  deleteIngredientSuccess,
  fetchAllIngredientsSuccess,
  fetchIngredientDetailSuccess,
  handleError,
  updateIngredientSuccess
} from './actions'
import {
  CreateIngredientRequestType,
  DeleteIngredientRequestType,
  FetchIngredientDetailRequestType,
  IngredientActionTypes,
  UpdateIngredientRequestType
} from './types'


function* fetchAllIngredients() {
  try {
    const response: AxiosResponse = yield call(IngredientsApi.getAll)
    yield put(fetchAllIngredientsSuccess(response.data))
  }
  catch (err: any) {
    yield put(handleError('Failed to fetch all ingredients', err))
  }
}

function* createIngredient({ name }: CreateIngredientRequestType) {
  try {
    const response: AxiosResponse = yield call(IngredientsApi.createIngredient, name)
    yield put(createIngredientSuccess(response.data, 'Ingredient created successfully!'))
  }
  catch (err: any) {
    yield put(handleError('Failed to create ingredient', err))
  }
}

function* deleteIngredient({ id }: DeleteIngredientRequestType) {
  try {
    const response: AxiosResponse = yield call(IngredientsApi.deleteIngredient, id)
    yield put(deleteIngredientSuccess(id, 'Ingredient deleted successfully!'))
  }
  catch (err: any) {
    yield put(handleError('Failed to delete ingredient', err))
  }
}

function* updateIngredient({ id, name }: UpdateIngredientRequestType) {
  try {
    const response: AxiosResponse = yield call(IngredientsApi.updateIngredient, id, name)
    yield put(updateIngredientSuccess(id, name, 'Ingredient updated successfully!'))
  }
  catch (err: any) {
    yield put(handleError('Failed to update ingredient', err))
  }
}

function* fetchIngredientDetail({ id }: FetchIngredientDetailRequestType) {
  try {
    const response: AxiosResponse = yield call(IngredientsApi.get, id)
    yield put(fetchIngredientDetailSuccess(response.data))
  }
  catch (err: any) {
    yield put(handleError('Failed to fetch ingredient details', err))
  }
}

export default function* watch() {
  yield takeLatest(IngredientActionTypes.FETCH_ALL_REQUEST, fetchAllIngredients)
  yield takeLatest(IngredientActionTypes.CREATE_INGREDIENT_REQUEST, createIngredient)
  yield takeLatest(IngredientActionTypes.DELETE_INGREDIENT_REQUEST, deleteIngredient)
  yield takeLatest(IngredientActionTypes.UPDATE_INGREDIENT_REQUEST, updateIngredient)
  yield takeLatest(IngredientActionTypes.FETCH_INGREDIENT_DETAIL_REQUEST, fetchIngredientDetail)
}
