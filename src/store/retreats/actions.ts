import { MealInaRetreatDto } from "utils/interfaces/meal-ina-retreat.interface";
import { Retreat, RetreatDetail, RetreatDto } from "utils/interfaces/retreat.interface";
import { RetreatActionTypes, FetchAllRetreatsType, FetchRetreatDetailType, CreateRetreatType, DeleteRetreatType, UpdateRetreatType, UpdateMealType, AddMealType, RemoveMealType, HandleErrorType } from "./types";

export const fetchAllRetreatsRequest = (): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_REQUEST })
export const fetchAllRetreatsSuccess = (retreats: Retreat[]): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_SUCCESS, retreats })
// export const fetchAllRetreatsFailed = (error: string): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_ERROR, error })

export const fetchRetreatDetailRequest = (id: number): FetchRetreatDetailType => ({ type: RetreatActionTypes.FETCH_RETREAT_DETAIL_REQUEST, id })
export const fetchRetreatDetailSuccess = (retreatDetail: RetreatDetail): FetchRetreatDetailType => ({ type: RetreatActionTypes.FETCH_RETREAT_DETAIL_SUCCESS, retreatDetail })
// export const fetchRetreatDetailFailed = (error: string): FetchRetreatDetailType => ({ type: RetreatActionTypes.FETCH_RETREAT_DETAIL_ERROR, error })


export const createRetreatRequest = (retreatDto: RetreatDto): CreateRetreatType => ({ type: RetreatActionTypes.CREATE_RETREAT_REQUEST, retreatDto })
export const createRetreatSuccess = (retreat: Retreat): CreateRetreatType => ({ type: RetreatActionTypes.CREATE_RETREAT_SUCCESS, retreat })
// export const createRetreatFailed = (error: string): CreateRetreatType => ({ type: RetreatActionTypes.CREATE_RETREAT_ERROR, error })

export const deleteRetreatRequest = (id: number): DeleteRetreatType => ({ type: RetreatActionTypes.DELETE_RETREAT_REQUEST, id })
export const deleteRetreatSuccess = (id: number): DeleteRetreatType => ({ type: RetreatActionTypes.DELETE_RETREAT_SUCCESS, id })
// export const deleteRetreatFailed = (error: string): DeleteRetreatType => ({ type: RetreatActionTypes.DELETE_RETREAT_ERROR, error })

export const updateRetreatRequest = (retreat: Retreat): UpdateRetreatType => ({ type: RetreatActionTypes.UPDATE_RETREAT_REQUEST, retreat })
export const updateRetreatSuccess = (retreat: Retreat): UpdateRetreatType => ({ type: RetreatActionTypes.UPDATE_RETREAT_SUCCESS, retreat })
// export const upadteRetreatFailed = (error: string): UpdateRetreatType => ({ type: RetreatActionTypes.UPDATE_RETREAT_ERROR, error })

export const addMealRequest = (meal: MealInaRetreatDto): AddMealType => ({ type: RetreatActionTypes.ADD_MEAL_REQUEST, meal })
export const addMealSuccess = (meal: MealInaRetreatDto): AddMealType => ({ type: RetreatActionTypes.ADD_MEAL_SUCCESS, meal })
// export const addMealFailed = (error: string): AddMealType => ({ type: RetreatActionTypes.ADD_MEAL_ERROR, error })

export const updateMealRequest = (meal: MealInaRetreatDto): UpdateMealType => ({ type: RetreatActionTypes.UPDATE_MEAL_REQUEST, meal })
export const updateMealSuccess = (meal: MealInaRetreatDto): UpdateMealType => ({ type: RetreatActionTypes.UPDATE_MEAL_SUCCESS, meal })
// export const updateMealFailed = (error: string): UpdateMealType => ({ type: RetreatActionTypes.UPDATE_MEAL_ERROR, error })

export const removeMealRequest = (mealInaRetreatId: number): RemoveMealType => ({ type: RetreatActionTypes.REMOVE_MEAL_REQUEST, mealInaRetreatId })
export const removeMealSuccess = (mealInaRetreatId: number): RemoveMealType => ({ type: RetreatActionTypes.REMOVE_MEAL_SUCCESS, mealInaRetreatId })
// export const removeMealFailed = (error: string): RemoveMealType => ({ type: RetreatActionTypes.REMOVE_MEAL_ERROR, error })

export const handleError = (message: string, error: string): HandleErrorType => ({ type: RetreatActionTypes.HANDLE_ERROR, message, error })
