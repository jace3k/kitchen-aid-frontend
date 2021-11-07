import { Reducer } from "redux";
import { CartActionTypes, CartsState, CartStateActionTypes } from "./types";

const initialState: CartsState = {
  loading: false,
  carts: [],
  cartItems: [],
  cartDetail: null,
  error: null,
  removed: false,
  successMessage: null,
}

const reducer: Reducer<CartsState, CartStateActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.FETCH_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        errorMessage: null,
        carts: [],
      }
    case CartActionTypes.FETCH_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        carts: action.carts,
        removed: false,
      }
    case CartActionTypes.FETCH_CART_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        // cartDetail: null,
        cartItems: [],
      }
    case CartActionTypes.FETCH_CART_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        cartDetail: action.cartDetail,
        cartItems: action.cartDetail.cart_item,
      }
    case CartActionTypes.CREATE_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
        cartDetail: null,
      }
    case CartActionTypes.CREATE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        errorMessage: null,
        successMessage: action.msg,
        carts: [action.cart, ...state.carts]
      }
    case CartActionTypes.DELETE_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      }
    case CartActionTypes.DELETE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        carts: state.carts.filter(x => x.id !== action.id),
        cartDetail: null,
        removed: true,
        successMessage: action.msg,
      }
    case CartActionTypes.ADD_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      }
    case CartActionTypes.ADD_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successMessage: action.msg,
      }
    case CartActionTypes.UPDATE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      }
    case CartActionTypes.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successMessage: action.msg,
        cartItems: state.cartItems.map(x => {
          if (x.id !== action.cartItem.id)
            return x

          const { amount, due_date, status } = action.cartItem
          return { ...x, amount, due_date, status }
        })
      }
    case CartActionTypes.REMOVE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      }
    case CartActionTypes.REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter(x => x.id !== action.cartItemId),
        error: null,
        successMessage: action.msg,
      }
    case CartActionTypes.GENERATE_IN_RANGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      }
    case CartActionTypes.GENERATE_IN_RANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successMessage: action.msg,
      }
    case CartActionTypes.HANDLE_ERROR:
      return {
        ...state,
        loading: false,
        error: { error: action.error, message: action.message },
        successMessage: null,
      }
    default:
      return state
  }
}

export { reducer as cartReducer }