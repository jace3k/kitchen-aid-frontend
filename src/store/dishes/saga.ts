import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { DishesApi } from "store/api";
import { updateIngredientSuccess } from "store/ingredients/actions";
import { createDishFailed, createDishSuccess, deleteDishFailed, deleteDishSuccess, fetchAllDishesFailed, fetchAllDishesSuccess, updateDishFailed, updateDishSuccess } from "./actions";
import { CreateDishRequestType, DeleteDishRequestType, DishActionTypes, UpdateDishRequestType } from "./types";

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

export default function* watch() {
	yield takeLatest(DishActionTypes.FETCH_ALL_REQUEST, fetchAllDishes)
	yield takeLatest(DishActionTypes.CREATE_DISH_REQUEST, createDish)
	yield takeLatest(DishActionTypes.DELETE_DISH_REQUEST, deleteDish)
	yield takeLatest(DishActionTypes.UPDATE_DISH_REQUEST, updateDish)
}
