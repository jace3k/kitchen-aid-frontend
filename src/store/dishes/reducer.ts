import { Reducer } from "redux";
import { DishActionTypes, DishesState, DishStateActionTypes } from "./types";


const initialState: DishesState = {
	loading: false,
	dishes: [],
	error: null,
}

const reducer: Reducer<DishesState, DishStateActionTypes> = (state = initialState, action) => {
	switch (action.type) {
		case DishActionTypes.FETCH_ALL_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
				dishes: [],
			}
		case DishActionTypes.FETCH_ALL_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				dishes: action.dishes,
			}
		case DishActionTypes.FETCH_ALL_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			}
		case DishActionTypes.CREATE_DISH_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case DishActionTypes.CREATE_DISH_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				dishes: [action.dish, ...state.dishes],
			}
		case DishActionTypes.CREATE_DISH_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			}
		case DishActionTypes.DELETE_DISH_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case DishActionTypes.DELETE_DISH_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				dishes: state.dishes.filter(x => x.id !== action.id),
			}
		case DishActionTypes.DELETE_DISH_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			}
		case DishActionTypes.UPDATE_DISH_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case DishActionTypes.UPDATE_DISH_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				dishes: state.dishes.map(dish => dish.id === action.dish.id ? action.dish : dish),
			}
		case DishActionTypes.UPDATE_DISH_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			}
		default:
			return state
	}
}

export { reducer as dishReducer }