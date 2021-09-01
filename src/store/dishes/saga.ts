import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { DishesApi } from "store/api";
import { createDishFailed, createDishSuccess, createIngredientInADishFailed, createIngredientInADishSuccess, deleteDishFailed, deleteDishSuccess, deleteIngredientInADishFailed, deleteIngredientInADishSuccess, fetchAllDishesFailed, fetchAllDishesSuccess, fetchDishDetailFailed, fetchDishDetailRequest, fetchDishDetailSuccess, updateDishFailed, updateDishSuccess, updateIngredientInADishFailed, updateIngredientInADishRequest, updateIngredientInADishSuccess } from "./actions";
import { CreateDishRequestType, CreateIngredientRequestType, DeleteDishRequestType, DeleteIngredientRequestType, DishActionTypes, FetchDishDetailRequestType, UpdateDishRequestType, UpdateIngredientRequestType } from "./types";

function* fetchAllDishes() {
	try {
		const response: AxiosResponse = yield call(DishesApi.getAll)
		yield put(fetchAllDishesSuccess(response.data))
	}
	catch (err) {
		yield put(fetchAllDishesFailed(err))
	}
}

function* createDish({ name, size }: CreateDishRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.createDish, name, size)
		yield put(createDishSuccess(response.data))
	}
	catch (err) {
		console.log('createDish error', err.response)
		yield put(createDishFailed(err))
	}
}

function* deleteDish({ id }: DeleteDishRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.deleteDish, id)
		yield put(deleteDishSuccess(id))
	}
	catch (err) {
		yield put(deleteDishFailed(err))
	}
}

function* updateDish({ id, name, size }: UpdateDishRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.updateDish, id, name, size)
		yield put(updateDishSuccess(response.data))
	}
	catch (err) {
		yield put(updateDishFailed(err))
	}
}

function* fetchDishDetail({ dishId }: FetchDishDetailRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.getDishDetail, dishId)
		console.log('[fetchDishDetail][success]', dishId)
		yield put(fetchDishDetailSuccess(response.data))
	}
	catch (err) {
		console.log('fetchDishDetail error', err.response)
		yield put(fetchDishDetailFailed(err.response.statusText))
	}
}


function* updateIngredient({ ingredient }: UpdateIngredientRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.updateIngredient, ingredient)
		yield put(updateIngredientInADishSuccess(response.data))
		yield put(fetchDishDetailRequest(ingredient.dish))
	}
	catch (err) {
		yield put(updateIngredientInADishFailed(err))
	}
}

function* createIngredient({ ingredient }: CreateIngredientRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.addIngredient, ingredient)
		console.log('[createIngredient][success]', ingredient)
		yield put(createIngredientInADishSuccess(response.data))
		yield put(fetchDishDetailRequest(ingredient.dish))
	}
	catch (err) {
		yield put(createIngredientInADishFailed(err))
	}
}

function* deleteIngredient({ id }: DeleteIngredientRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.removeIngredient, id)
		console.log('[deleteIngredient][success]', id)
		yield put(deleteIngredientInADishSuccess(id))
	}
	catch (err) {
		yield put(deleteIngredientInADishFailed(err))
	}
}

export default function* watch() {
	yield takeLatest(DishActionTypes.FETCH_ALL_REQUEST, fetchAllDishes)
	yield takeLatest(DishActionTypes.CREATE_DISH_REQUEST, createDish)
	yield takeLatest(DishActionTypes.DELETE_DISH_REQUEST, deleteDish)
	yield takeLatest(DishActionTypes.UPDATE_DISH_REQUEST, updateDish)
	yield takeLatest(DishActionTypes.FETCH_DISH_DETAIL_REQUEST, fetchDishDetail)
	yield takeLatest(DishActionTypes.UPDATE_INGREDIENT_REQUEST, updateIngredient)
	yield takeLatest(DishActionTypes.CREATE_INGREDIENT_REQUEST, createIngredient)
	yield takeLatest(DishActionTypes.DELETE_INGREDIENT_REQUEST, deleteIngredient)
}
