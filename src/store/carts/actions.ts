import { GenerateInRangeDto } from "utils/interfaces/cart-generate-in-range.interface"
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
  RemoveCartItemType,
  GenerateInRangeType
} from "./types"


export const fetchAllCartsRequest = (): FetchAllCartsType => ({ type: CartActionTypes.FETCH_ALL_REQUEST })
export const fetchAllCartsSuccess = (carts: Cart[]): FetchAllCartsType => ({ type: CartActionTypes.FETCH_ALL_SUCCESS, carts })

export const fetchCartDetailRequest = (id: number): FetchCartDetailType => ({ type: CartActionTypes.FETCH_CART_DETAIL_REQUEST, id })
export const fetchCartDetailSuccess = (cartDetail: CartDetail): FetchCartDetailType => ({ type: CartActionTypes.FETCH_CART_DETAIL_SUCCESS, cartDetail })

export const createCartRequest = (cartDto: CartDto): CreateCartType => ({ type: CartActionTypes.CREATE_CART_REQUEST, cartDto })
export const createCartSuccess = (cart: Cart, msg: string): CreateCartType => ({ type: CartActionTypes.CREATE_CART_SUCCESS, cart, msg })

export const deleteCartRequest = (cart: CartDto): DeleteCartType => ({ type: CartActionTypes.DELETE_CART_REQUEST, cart })
export const deleteCartSuccess = (id: number, msg: string): DeleteCartType => ({ type: CartActionTypes.DELETE_CART_SUCCESS, id, msg })

export const addCartItemRequest = (cartItem: CartItemDto): AddCartItemType => ({ type: CartActionTypes.ADD_CART_ITEM_REQUEST, cartItem })
export const addCartItemSuccess = (cartItem: CartItemDto, msg: string): AddCartItemType => ({ type: CartActionTypes.ADD_CART_ITEM_SUCCESS, cartItem, msg })

export const updateCartItemRequest = (cartItem: CartItemDto): UpdateCartItemType => ({ type: CartActionTypes.UPDATE_CART_ITEM_REQUEST, cartItem })
export const updateCartItemSuccess = (cartItem: CartItemDto, msg: string): UpdateCartItemType => ({ type: CartActionTypes.UPDATE_CART_ITEM_SUCCESS, cartItem, msg })

export const removeCartItemRequest = (cartItemId: number): RemoveCartItemType => ({ type: CartActionTypes.REMOVE_CART_ITEM_REQUEST, cartItemId })
export const removeCartItemSuccess = (cartItemId: number, msg: string): RemoveCartItemType => ({ type: CartActionTypes.REMOVE_CART_ITEM_SUCCESS, cartItemId, msg })

export const generateInRangeRequest = (cartOptions: GenerateInRangeDto): GenerateInRangeType => ({ type: CartActionTypes.GENERATE_IN_RANGE_REQUEST, cartOptions })
export const generateInRangeSuccess = (cartId: number, msg: string): GenerateInRangeType => ({ type: CartActionTypes.GENERATE_IN_RANGE_SUCCESS, cartId, msg })

export const handleError = (message: string, error: string): HandleErrorType => ({ type: CartActionTypes.HANDLE_ERROR, message, error })
