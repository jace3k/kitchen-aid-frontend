import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { DishesApi } from "store/api";
import {
	createDishSuccess,
	addIngredientInADishSuccess,
	deleteDishSuccess,
	deleteIngredientInADishSuccess,
	fetchAllDishesSuccess,
	fetchDishDetailRequest,
	fetchDishDetailSuccess,
	handleError,
	updateDishSuccess,
	updateIngredientInADishSuccess
} from "./actions";
import { CreateDishRequestType, AddIngredientRequestType, DeleteDishRequestType, DeleteIngredientRequestType, DishActionTypes, FetchDishDetailRequestType, UpdateDishRequestType, UpdateIngredientRequestType } from "./types";

function* fetchAllDishes() {
	try {
		const response: AxiosResponse = yield call(DishesApi.getAll)
		yield put(fetchAllDishesSuccess(response.data))
	}
	catch (err: any) {
		yield put(handleError('Fetch all dishes failed', err))
	}
}

function* createDish({ name, size }: CreateDishRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.createDish, name, size)
		yield put(createDishSuccess(response.data, 'Dish created successfully!'))
	}
	catch (err: any) {
		console.log('createDish error', err.response)
		yield put(handleError('Failed to create dish', err))
	}
}

function* deleteDish({ id }: DeleteDishRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.deleteDish, id)
		yield put(deleteDishSuccess(id, 'Dish deleted successfully'))
	}
	catch (err: any) {
		yield put(handleError('Failed to delete dish', err))
	}
}

function* updateDish({ id, name, size }: UpdateDishRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.updateDish, id, name, size)
		yield put(updateDishSuccess(response.data, 'Dish updated successfully'))
	}
	catch (err: any) {
		yield put(handleError('Failed to update dish', err))
	}
}

function* fetchDishDetail({ dishId }: FetchDishDetailRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.getDishDetail, dishId)
		console.log('[fetchDishDetail][success]', dishId)
		yield put(fetchDishDetailSuccess(response.data))
	}
	catch (err: any) {
		console.log('fetchDishDetail error', err.message)
		// err.response, err.response.statusText, network error
		yield put(handleError('Failed to fetch dish details', err))
	}
}

function* updateIngredient({ ingredient }: UpdateIngredientRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.updateIngredient, ingredient)
		yield put(updateIngredientInADishSuccess(response.data, 'Ingredient updated successfully!'))
		yield put(fetchDishDetailRequest(ingredient.dish))
	}
	catch (err: any) {
		yield put(handleError('Failed to update ingredient in a dish', err))
	}
}

function* createIngredient({ ingredient }: AddIngredientRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.addIngredient, ingredient)
		console.log('[createIngredient][success]', ingredient)
		yield put(addIngredientInADishSuccess(response.data, 'Ingredient added successfully!'))
		yield put(fetchDishDetailRequest(ingredient.dish))
	}
	catch (err: any) {
		yield put(handleError('Failed to add ingredient to a dish', err))
	}
}

function* deleteIngredient({ id }: DeleteIngredientRequestType) {
	try {
		const response: AxiosResponse = yield call(DishesApi.removeIngredient, id)
		console.log('[deleteIngredient][success]', id)
		yield put(deleteIngredientInADishSuccess(id, 'Ingredient deleted successfully!'))
	}
	catch (err: any) {
		yield put(handleError('Failed to delete ingredient from a dish', err))
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
