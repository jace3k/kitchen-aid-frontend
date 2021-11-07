import { GenerateInRangeDto } from "utils/interfaces/cart-generate-in-range.interface";
import { CartItem, CartItemDto } from "utils/interfaces/cart-item.interface";
import { Cart, CartDetail, CartDto } from "utils/interfaces/cart.interface";
import { AppError, HandleErrorType } from "utils/interfaces/error-handling.interface"


export enum CartActionTypes {
  FETCH_ALL_REQUEST = '@@carts/FETCH_ALL_REQUEST',
  FETCH_ALL_SUCCESS = '@@carts/FETCH_ALL_SUCCESS',

  FETCH_CART_DETAIL_REQUEST = '@@carts/FETCH_CART_DETAIL_REQUEST',
  FETCH_CART_DETAIL_SUCCESS = '@@carts/FETCH_CART_DETAIL_SUCCESS',

  CREATE_CART_REQUEST = '@@carts/CREATE_CART_REQUEST',
  CREATE_CART_SUCCESS = '@@carts/CREATE_CART_SUCCESS',

  DELETE_CART_REQUEST = '@@carts/DELETE_CART_REQUEST',
  DELETE_CART_SUCCESS = '@@carts/DELETE_CART_SUCCESS',

  UPDATE_CART_REQUEST = '@@carts/UPDATE_CART_REQUEST',
  UPDATE_CART_SUCCESS = '@@carts/UPDATE_CART_SUCCESS',

  ADD_CART_ITEM_REQUEST = '@@carts/ADD_CART_ITEM_REQUEST',
  ADD_CART_ITEM_SUCCESS = '@@carts/ADD_CART_ITEM_SUCCESS',

  UPDATE_CART_ITEM_REQUEST = '@@carts/UPDATE_CART_ITEM_REQUEST',
  UPDATE_CART_ITEM_SUCCESS = '@@carts/UPDATE_CART_ITEM_SUCCESS',

  REMOVE_CART_ITEM_REQUEST = '@@carts/REMOVE_CART_ITEM_REQUEST',
  REMOVE_CART_ITEM_SUCCESS = '@@carts/REMOVE_CART_ITEM_SUCCESS',

  GENERATE_IN_RANGE_REQUEST = '@@carts/GENERATE_IN_RANGE_REQUEST',
  GENERATE_IN_RANGE_SUCCESS = '@@carts/GENERATE_IN_RANGE_SUCCESS',

  HANDLE_ERROR = '@@carts/HANDLE_ERROR',
}

// ALL
export interface FetchAllCartsRequestType {
  type: typeof CartActionTypes.FETCH_ALL_REQUEST,
}

interface FetchAllCartsSuccessType {
  type: typeof CartActionTypes.FETCH_ALL_SUCCESS,
  carts: Cart[],
}

// DETAIL
export interface FetchCartDetailRequestType {
  type: typeof CartActionTypes.FETCH_CART_DETAIL_REQUEST,
  id: number,
}

interface FetchCartDetailSuccessType {
  type: typeof CartActionTypes.FETCH_CART_DETAIL_SUCCESS,
  cartDetail: CartDetail,
}

// CREATE
export interface CreateCartRequestType {
  type: typeof CartActionTypes.CREATE_CART_REQUEST,
  cartDto: CartDto,
}

interface CreateCartSuccessType {
  type: typeof CartActionTypes.CREATE_CART_SUCCESS,
  cart: Cart,
  msg: string,
}

// DELETE
export interface DeleteCartRequestType {
  type: typeof CartActionTypes.DELETE_CART_REQUEST,
  cart: Cart,
}

interface DeleteCartSuccessType {
  type: typeof CartActionTypes.DELETE_CART_SUCCESS,
  id: number,
  msg: string,
}

// ADD CART ITEM
export interface AddCartItemRequestType {
  type: typeof CartActionTypes.ADD_CART_ITEM_REQUEST,
  cartItem: CartItemDto,
}

interface AddCartItemSuccessType {
  type: typeof CartActionTypes.ADD_CART_ITEM_SUCCESS,
  cartItem: CartItemDto,
  msg: string,
}

// UPDATE CART ITEM
export interface UpdateCartItemRequestType {
  type: typeof CartActionTypes.UPDATE_CART_ITEM_REQUEST,
  cartItem: CartItemDto,
}

interface UpdateCartItemSuccessType {
  type: typeof CartActionTypes.UPDATE_CART_ITEM_SUCCESS,
  cartItem: CartItemDto,
  msg: string,
}

// REMOVE CART ITEM
export interface RemoveCartItemRequestType {
  type: typeof CartActionTypes.REMOVE_CART_ITEM_REQUEST,
  cartItemId: number,
}

interface RemoveCartItemSuccessType {
  type: typeof CartActionTypes.REMOVE_CART_ITEM_SUCCESS,
  cartItemId: number,
  msg: string,
}

// GENERATE IN RANGE

export interface GenerateInRangeRequestType {
  type: typeof CartActionTypes.GENERATE_IN_RANGE_REQUEST,
  cartOptions: GenerateInRangeDto,
}

interface GenerateInRangeSuccessType {
  type: typeof CartActionTypes.GENERATE_IN_RANGE_SUCCESS,
  cartId: number,
  msg: string,
}

export type FetchAllCartsType = FetchAllCartsRequestType | FetchAllCartsSuccessType
export type FetchCartDetailType = FetchCartDetailRequestType | FetchCartDetailSuccessType
export type CreateCartType = CreateCartRequestType | CreateCartSuccessType
export type DeleteCartType = DeleteCartRequestType | DeleteCartSuccessType
export type AddCartItemType = AddCartItemRequestType | AddCartItemSuccessType
export type UpdateCartItemType = UpdateCartItemRequestType | UpdateCartItemSuccessType
export type RemoveCartItemType = RemoveCartItemRequestType | RemoveCartItemSuccessType
export type GenerateInRangeType = GenerateInRangeRequestType | GenerateInRangeSuccessType

export type CartStateActionTypes =
  FetchAllCartsType |
  FetchCartDetailType |
  CreateCartType |
  DeleteCartType |
  AddCartItemType |
  UpdateCartItemType |
  RemoveCartItemType |
  GenerateInRangeType |
  HandleErrorType

export interface CartsState {
  readonly loading: boolean
  readonly error: AppError | null
  readonly carts: Cart[]
  readonly cartDetail: CartDetail | null
  readonly cartItems: CartItem[],
  readonly removed: boolean,
  readonly successMessage: string | null,
}
