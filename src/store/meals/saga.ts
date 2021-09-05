import { AxiosResponse } from "axios"
import { call, put, takeLatest } from "redux-saga/effects";
import { MealsApi } from "store/api";
import { fetchDishDetailFailed, fetchDishDetailRequest, fetchDishDetailSuccess } from "store/dishes/actions";
import {
  createDishInAMealFailed,
  createDishInAMealSuccess,
  createMealFailed,
  createMealSuccess,
  deleteDishInAMealFailed,
  deleteDishInAMealSuccess,
  deleteMealFailed,
  deleteMealSuccess,
  fetchAllMealsFailed,
  fetchAllMealsSuccess,
  fetchMealDetailFailed,
  fetchMealDetailRequest,
  fetchMealDetailSuccess
} from "./actions";
import {
  CreateDishRequestType,
  CreateMealRequestType,
  DeleteDishRequestType,
  DeleteMealRequestType,
  FetchMealDetailRequestType,
  MealActionTypes
} from "./types";

function* fetchAllMeals() {
  try {
    const response: AxiosResponse = yield call(MealsApi.getAll)
    yield put(fetchAllMealsSuccess(response.data))
  }
  catch (err: any) {
    yield put(fetchAllMealsFailed(err))
  }
}

function* createMeal({ meal }: CreateMealRequestType) {
  try {
    const response: AxiosResponse = yield call(MealsApi.createMeal, meal)
    yield put(createMealSuccess(response.data))
  }
  catch (err: any) {
    yield put(createMealFailed(err))
  }
}

function* deleteMeal({ id }: DeleteMealRequestType) {
  try {
    const response: AxiosResponse = yield call(MealsApi.deleteMeal, id)
    yield put(deleteMealSuccess(response.data))
  }
  catch (err: any) {
    yield put(deleteMealFailed(err))
  }
}

function* fetchMealDetail({ mealId }: FetchMealDetailRequestType) {
  try {
    const response: AxiosResponse = yield call(MealsApi.getMealDetail, mealId)
    console.log('fetchMealDetail', response.data)
    yield put(fetchMealDetailSuccess(response.data))
  }
  catch (err: any) {
    yield put(fetchMealDetailFailed(err))
  }
}

function* createDish({ dish }: CreateDishRequestType) {
  try {
    const response: AxiosResponse = yield call(MealsApi.addDish, dish)
    yield put(createDishInAMealSuccess(response.data))
    yield put(fetchMealDetailRequest(dish.meal))
  }
  catch (err: any) {
    yield put(createDishInAMealFailed(err))
  }
}

function* deleteDish({ id }: DeleteDishRequestType) {
  try {
    const response: AxiosResponse = yield call(MealsApi.removeDish, id)
    yield put(deleteDishInAMealSuccess(id))
  }
  catch (err: any) {
    yield put(deleteDishInAMealFailed(err))
  }
}

export default function* watch() {
  yield takeLatest(MealActionTypes.FETCH_ALL_REQUEST, fetchAllMeals)
  yield takeLatest(MealActionTypes.CREATE_MEAL_REQUEST, createMeal)
  yield takeLatest(MealActionTypes.DELETE_MEAL_REQUEST, deleteMeal)
  // yield takeLatest(MealActionTypes.UPDATE_MEAL_REQUEST, updateMeal)
  yield takeLatest(MealActionTypes.FETCH_MEAL_DETAIL_REQUEST, fetchMealDetail)
  // yield takeLatest(MealActionTypes.UPDATE_DISH_REQUEST, updateDish)
  yield takeLatest(MealActionTypes.CREATE_DISH_REQUEST, createDish)
  yield takeLatest(MealActionTypes.DELETE_DISH_REQUEST, deleteDish)
}
