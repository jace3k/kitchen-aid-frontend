import { Reducer } from "redux";
import { DishActionTypes, DishesState, DishStateActionTypes } from "./types";


const initialState: DishesState = {
	loading: false,
	dishes: [],
	error: null,
	dishDetail: null,
	ingredients: [],
	removed: false,
	successMessage: null,
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
				dishes: action.dishes.reverse(),
			}
		case DishActionTypes.CREATE_DISH_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
				successMessage: null,
			}
		case DishActionTypes.CREATE_DISH_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				dishes: [action.dish, ...state.dishes],
				successMessage: action.msg,
			}
		case DishActionTypes.DELETE_DISH_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
				successMessage: null,
			}
		case DishActionTypes.DELETE_DISH_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				dishes: state.dishes.filter(x => x.id !== action.id),
				dishDetail: null,
				removed: true,
				successMessage: action.msg,
			}
		case DishActionTypes.UPDATE_DISH_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
				successMessage: null,
			}
		case DishActionTypes.UPDATE_DISH_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				dishes: state.dishes.map(dish => dish.id === action.dish.id ? action.dish : dish),
				dishDetail: {
					id: state.dishDetail?.id || action.dish.id,
					name: action.dish.name,
					size: action.dish.size,
					ingredient_ina_dish: state.dishDetail?.ingredient_ina_dish || [],
					dish_ina_meal: state.dishDetail?.dish_ina_meal || [],
				},
				successMessage: action.msg,
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
				ingredients: action.dishDetail.ingredient_ina_dish.reverse(),
				dishDetail: action.dishDetail,
			}
		case DishActionTypes.UPDATE_INGREDIENT_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
				successMessage: null,
			}
		case DishActionTypes.UPDATE_INGREDIENT_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				successMessage: action.msg,
			}
		case DishActionTypes.CREATE_INGREDIENT_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
				successMessage: null,
			}
		case DishActionTypes.CREATE_INGREDIENT_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				successMessage: action.msg,
			}
		case DishActionTypes.DELETE_INGREDIENT_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
				successMessage: null,
			}
		case DishActionTypes.DELETE_INGREDIENT_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				ingredients: state.ingredients.filter(ing => ing.id !== action.id),
				successMessage: action.msg,
			}
		case DishActionTypes.HANDLE_ERROR:
			return {
				...state,
				loading: false,
				loadingDetail: false,
				error: { error: action.error, message: action.message },
				successMessage: null,
			}
		default:
			return state
	}
}

export { reducer as dishReducer }