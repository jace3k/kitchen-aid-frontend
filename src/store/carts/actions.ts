import { CartItemDto } from "utils/interfaces/cart-item.interface"
import { Cart, CartDetail, CartDto } from "utils/interfaces/cart.interface"
import { HandleErrorType } from "utils/interfaces/error-handling.interface"
import {
  FetchAllCartsType,
  CartActionTypes,
  FetchCartDetailType,
  CreateCartType,
  DeleteCartType,
  AddCartItemType,
  UpdateCartItemType,
  RemoveCartItemType
} from "./types"


export const fetchAllCartsRequest = (): FetchAllCartsType => ({ type: CartActionTypes.FETCH_ALL_REQUEST })
export const fetchAllCartsSuccess = (carts: Cart[]): FetchAllCartsType => ({ type: CartActionTypes.FETCH_ALL_SUCCESS, carts })

export const fetchCartDetailRequest = (id: number): FetchCartDetailType => ({ type: CartActionTypes.FETCH_CART_DETAIL_REQUEST, id })
export const fetchCartDetailSuccess = (cartDetail: CartDetail): FetchCartDetailType => ({ type: CartActionTypes.FETCH_CART_DETAIL_SUCCESS, cartDetail })

export const createCartRequest = (cartDto: CartDto): CreateCartType => ({ type: CartActionTypes.CREATE_CART_REQUEST, cartDto })
export const createCartSuccess = (cart: Cart, msg: string): CreateCartType => ({ type: CartActionTypes.CREATE_CART_SUCCESS, cart, msg })

export const deleteCartRequest = (id: number): DeleteCartType => ({ type: CartActionTypes.DELETE_CART_REQUEST, id })
export const deleteCartSuccess = (id: number, msg: string): DeleteCartType => ({ type: CartActionTypes.DELETE_CART_SUCCESS, id, msg })

export const addCartItemRequest = (cartItem: CartItemDto): AddCartItemType => ({ type: CartActionTypes.ADD_CART_ITEM_REQUEST, cartItem })
export const addCartItemSuccess = (cartItem: CartItemDto, msg: string): AddCartItemType => ({ type: CartActionTypes.ADD_CART_ITEM_SUCCESS, cartItem, msg })

export const updateCartItemRequest = (cartItem: CartItemDto): UpdateCartItemType => ({ type: CartActionTypes.UPDATE_CART_ITEM_REQUEST, cartItem })
export const updateCartItemSuccess = (cartItem: CartItemDto, msg: string): UpdateCartItemType => ({ type: CartActionTypes.UPDATE_CART_ITEM_SUCCESS, cartItem, msg })

export const removeCartItemRequest = (cartItemId: number): RemoveCartItemType => ({ type: CartActionTypes.REMOVE_CART_ITEM_REQUEST, cartItemId })
export const removeCartItemSuccess = (cartItemId: number, msg: string): RemoveCartItemType => ({ type: CartActionTypes.REMOVE_CART_ITEM_SUCCESS, cartItemId, msg })

export const handleError = (message: string, error: string): HandleErrorType => ({ type: CartActionTypes.HANDLE_ERROR, message, error })
