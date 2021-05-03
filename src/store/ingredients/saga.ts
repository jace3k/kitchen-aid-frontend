import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { IngredientsApi } from 'store/api'
import { createIngredientFailed, createIngredientSuccess, deleteIngredientFailed, deleteIngredientSuccess, fetchAllIngredientsFailed, fetchAllIngredientsSuccess, updateIngredientFailed, updateIngredientSuccess } from './actions'
import { CreateIngredientRequestType, DeleteIngredientRequestType, Ingredient, IngredientActionTypes, UpdateIngredientRequestType } from './types'

function* fetchAllIngredients() {
  try {
    const response: AxiosResponse = yield call(IngredientsApi.getAll)
    yield put(fetchAllIngredientsSuccess(response.data))
  }
  catch (err) {
    yield put(fetchAllIngredientsFailed(err))
  }
}

function* createIngredient({ name }: CreateIngredientRequestType) {
  try {
    const response: AxiosResponse = yield call(IngredientsApi.createIngredient, name)
    yield put(createIngredientSuccess(response.data))
  }
  catch (err) {
    yield put(createIngredientFailed('addIngredientError'))
  }
}

function* deleteIngredient({ id }: DeleteIngredientRequestType) {
  try {
    const response: AxiosResponse = yield call(IngredientsApi.deleteIngredient, id)
    // check if response 204 No Content then return id of removed ingredient
    yield put(deleteIngredientSuccess(id))
  }
  catch (err) {
    yield put(deleteIngredientFailed(err))
  }
}

function* updateIngredient({ id, name }: UpdateIngredientRequestType) {
  try {
    const response: AxiosResponse = yield call(IngredientsApi.updateIngredient, id, name)
    yield put(updateIngredientSuccess(id, name))
  }
  catch (err) {
    yield put(updateIngredientFailed(err))
  }
}

export default function* watch() {
  yield takeLatest(IngredientActionTypes.FETCH_ALL_REQUEST, fetchAllIngredients)
  yield takeLatest(IngredientActionTypes.CREATE_INGREDIENT_REQUEST, createIngredient)
  yield takeLatest(IngredientActionTypes.DELETE_INGREDIENT_REQUEST, deleteIngredient)
  yield takeLatest(IngredientActionTypes.UPDATE_INGREDIENT_REQUEST, updateIngredient)
}
