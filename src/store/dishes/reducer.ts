import { Reducer } from "redux";
import { DishActionTypes, DishesState, DishStateActionTypes } from "./types";


const initialState: DishesState = {
	loading: false,
	dishes: [],
	error: null,
	dishDetail: null,
	ingredients: [],
	removed: false,
}

const reducer: Reducer<DishesState, DishStateActionTypes> = (state = initialState, action) => {
	switch (action.type) {
		case DishActionTypes.FETCH_ALL_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
				dishes: [],
				removed: false,
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
				dishDetail: null,
				removed: true,
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
				dishDetail: {
					id: state.dishDetail?.id || 0,
					name: action.dish.name,
					size: action.dish.size,
					ingredient_ina_dish: state.dishDetail?.ingredient_ina_dish || []
				}
			}
		case DishActionTypes.UPDATE_DISH_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			}
		case DishActionTypes.FETCH_DISH_DETAIL_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case DishActionTypes.FETCH_DISH_DETAIL_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				ingredients: action.dishDetail.ingredient_ina_dish,
				dishDetail: action.dishDetail,
			}
		case DishActionTypes.FETCH_DISH_DETAIL_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			}
		case DishActionTypes.UPDATE_INGREDIENT_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case DishActionTypes.UPDATE_INGREDIENT_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
			}
		case DishActionTypes.UPDATE_INGREDIENT_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			}
		case DishActionTypes.CREATE_INGREDIENT_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case DishActionTypes.CREATE_INGREDIENT_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
			}
		case DishActionTypes.CREATE_INGREDIENT_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			}
		case DishActionTypes.DELETE_INGREDIENT_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case DishActionTypes.DELETE_INGREDIENT_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				ingredients: state.ingredients.filter(ing => ing.id !== action.id),
			}
		case DishActionTypes.DELETE_INGREDIENT_ERROR:
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