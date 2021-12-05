import { AxiosResponse } from "axios"
import { call, put, takeLatest } from "redux-saga/effects";
import { MealsApi } from "store/api";
import {
  addDishInAMealSuccess,
  createMealSuccess,
  deleteDishInAMealSuccess,
  deleteMealSuccess,
  fetchAllMealsSuccess,
  fetchMealDetailRequest,
  fetchMealDetailSuccess,
  handleError
} from "./actions";
import {
  AddDishRequestType,
  CreateMealRequestType,
  DeleteDishRequestType,
  DeleteMealRequestType,
  FetchMealDetailRequestType,
  MealActionTypes,
  UpdateMealRequestType
} from "./types";

function* fetchAllMeals() {
  try {
    const response: AxiosResponse = yield call(MealsApi.getAll)
    yield put(fetchAllMealsSuccess(response.data))
  }
  catch (err: any) {
    yield put(handleError('Failed to fetch all meals', err))
  }
}

function* createMeal({ meal }: CreateMealRequestType) {
  try {
    const response: AxiosResponse = yield call(MealsApi.createMeal, meal)
    yield put(createMealSuccess(response.data, 'Meal created successfully!'))
  }
  catch (err: any) {
    yield put(handleError('Failed to create meal', err))
  }
}

function* updateMeal({ meal }: UpdateMealRequestType) {
  try {
    const response: AxiosResponse = yield call(MealsApi.updateMeal, meal)
    yield put(createMealSuccess(response.data, 'Meal updated successfully!'))
  }
  catch (err: any) {
    yield put(handleError('Failed to update meal', err))
  }
}

function* deleteMeal({ id }: DeleteMealRequestType) {
  try {
    const response: AxiosResponse = yield call(MealsApi.deleteMeal, id)
    yield put(deleteMealSuccess(response.data, 'Meal deleted successfully!'))
  }
  catch (err: any) {
    yield put(handleError('Failed to delete meal', err))
  }
}

function* fetchMealDetail({ mealId }: FetchMealDetailRequestType) {
  try {
    const response: AxiosResponse = yield call(MealsApi.getMealDetail, mealId)
    console.log('fetchMealDetail', response.data)
    yield put(fetchMealDetailSuccess(response.data))
  }
  catch (err: any) {
    yield put(handleError('Failed to fetch meal details', err))
  }
}

function* addDish({ dish }: AddDishRequestType) {
  try {
    const response: AxiosResponse = yield call(MealsApi.addDish, dish)
    yield put(addDishInAMealSuccess(response.data, 'Dish added successfully!'))
    yield put(fetchMealDetailRequest(dish.meal))
  }
  catch (err: any) {
    yield put(handleError('Failed to add dish to a meal', err))
  }
}

function* deleteDish({ id }: DeleteDishRequestType) {
  try {
    const response: AxiosResponse = yield call(MealsApi.removeDish, id)
    yield put(deleteDishInAMealSuccess(id, 'Dish deleted successfully!'))
  }
  catch (err: any) {
    yield put(handleError('Failed to delete dish from a meal', err))
  }
}

export default function* watch() {
  yield takeLatest(MealActionTypes.FETCH_ALL_REQUEST, fetchAllMeals)
  yield takeLatest(MealActionTypes.CREATE_MEAL_REQUEST, createMeal)
  yield takeLatest(MealActionTypes.DELETE_MEAL_REQUEST, deleteMeal)
  yield takeLatest(MealActionTypes.UPDATE_MEAL_REQUEST, updateMeal)
  yield takeLatest(MealActionTypes.FETCH_MEAL_DETAIL_REQUEST, fetchMealDetail)
  // yield takeLatest(MealActionTypes.UPDATE_DISH_REQUEST, updateDish)
  yield takeLatest(MealActionTypes.CREATE_DISH_REQUEST, addDish)
  yield takeLatest(MealActionTypes.DELETE_DISH_REQUEST, deleteDish)
}
