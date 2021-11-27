import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { CartsApi } from 'store/api'
import { fetchRetreatDetailRequest } from 'store/retreats/actions'
import {
  addCartItemSuccess,
  createCartSuccess,
  deleteCartSuccess,
  fetchAllCartsSuccess,
  fetchCartDetailRequest,
  fetchCartDetailSuccess,
  generateInRangeSuccess,
  handleError,
  removeCartItemSuccess,
  updateCartItemSuccess
} from './actions'
import {
  AddCartItemRequestType,
  CartActionTypes,
  CreateCartRequestType,
  DeleteCartRequestType,
  FetchCartDetailRequestType,
  GenerateInRangeRequestType,
  RemoveCartItemRequestType,
  UpdateCartItemRequestType
} from './types'


function* fetchAllCarts() {
  try {
    const response: AxiosResponse = yield call(CartsApi.getAll)
    yield put(fetchAllCartsSuccess(response.data))
  }
  catch (err: any) {
    yield put(handleError('Failed to fetch all carts', err))
  }
}

function* getCartDetail({ id }: FetchCartDetailRequestType) {
  try {
    const response: AxiosResponse = yield call(CartsApi.getDetail, id)
    yield put(fetchCartDetailSuccess(response.data))
  }
  catch (err: any) {
    yield put(handleError('Failed to fetch cart details', err))
  }
}

function* createCart({ cartDto }: CreateCartRequestType) {
  try {
    const response: AxiosResponse = yield call(CartsApi.createCart, cartDto)
    yield put(createCartSuccess(response.data, 'Cart created successfully!'))
    // Retreat Detail list of carts have to be refreshed
    yield put(fetchRetreatDetailRequest(cartDto.retreat))
  }
  catch (err: any) {
    yield put(handleError('Failed to create cart', err))
  }
}

function* deleteCart({ cart }: DeleteCartRequestType) {
  try {
    const response: AxiosResponse = yield call(CartsApi.deleteCart, cart.id)
    yield put(deleteCartSuccess(cart.id, 'Cart deleted successfully!'))
    // Retreat Detail list of carts have to be refreshed
    yield put(fetchRetreatDetailRequest(cart.retreat.id))
  }
  catch (err: any) {
    yield put(handleError('Failed to delete cart', err))
  }
}

function* addCartItem({ cartItem }: AddCartItemRequestType) {
  try {
    const response: AxiosResponse = yield call(CartsApi.addCartItem, cartItem)
    yield put(addCartItemSuccess(response.data, 'Cart item added successfully!'))
    yield put(fetchCartDetailRequest(cartItem.cart))

  }
  catch (err: any) {
    yield put(handleError('Failed to add cart item to cart', err))
  }
}

function* updateCartItem({ cartItem }: UpdateCartItemRequestType) {
  try {
    const response: AxiosResponse = yield call(CartsApi.updateCartItem, cartItem)

    yield put(updateCartItemSuccess(response.data, 'Cart Item updated successfully!'))
    // yield put(fetchCartDetailRequest(cartItem.cart))
  }
  catch (err: any) {
    yield put(handleError('Failed to update cart item', err))
  }
}

function* removeCartItem({ cartItemId }: RemoveCartItemRequestType) {
  try {
    const response: AxiosResponse = yield call(CartsApi.removeCartItem, cartItemId)
    yield put(removeCartItemSuccess(cartItemId, 'Cart item removed successfully!'))
  }
  catch (err: any) {
    yield put(handleError('Failed to remove cart item from cart', err))
  }
}

function* generateInRange({ cartOptions }: GenerateInRangeRequestType) {
  try {
    const response: AxiosResponse = yield call(CartsApi.generateInRange, cartOptions)
    yield put(generateInRangeSuccess(response.data.id, 'Cart generated successfully!'))
    // Retreat Detail list of carts have to be refreshed
    yield put(fetchRetreatDetailRequest(cartOptions.retreat))
  }
  catch (err: any) {
    yield put(handleError(`Failed to generate cart in range from: ${cartOptions.begin_date} to: ${cartOptions.end_date}`, err))
  }
}

export default function* watch() {
  yield takeLatest(CartActionTypes.FETCH_ALL_REQUEST, fetchAllCarts)
  yield takeLatest(CartActionTypes.FETCH_CART_DETAIL_REQUEST, getCartDetail)
  yield takeLatest(CartActionTypes.CREATE_CART_REQUEST, createCart)
  yield takeLatest(CartActionTypes.DELETE_CART_REQUEST, deleteCart)
  yield takeLatest(CartActionTypes.ADD_CART_ITEM_REQUEST, addCartItem)
  yield takeLatest(CartActionTypes.UPDATE_CART_ITEM_REQUEST, updateCartItem)
  yield takeLatest(CartActionTypes.REMOVE_CART_ITEM_REQUEST, removeCartItem)
  yield takeLatest(CartActionTypes.GENERATE_IN_RANGE_REQUEST, generateInRange)
}
