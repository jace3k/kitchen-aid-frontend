import { HandleErrorType } from "utils/interfaces/error-handling.interface";
import { MealInaRetreatDto } from "utils/interfaces/meal-ina-retreat.interface";
import { Retreat, RetreatDetail, RetreatDto } from "utils/interfaces/retreat.interface";
import {
  RetreatActionTypes,
  FetchAllRetreatsType,
  FetchRetreatDetailType,
  CreateRetreatType,
  DeleteRetreatType,
  UpdateRetreatType,
  UpdateMealType,
  AddMealType,
  RemoveMealType,
} from "./types";

export const fetchAllRetreatsRequest = (): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_REQUEST })
export const fetchAllRetreatsSuccess = (retreats: Retreat[]): FetchAllRetreatsType => ({ type: RetreatActionTypes.FETCH_ALL_SUCCESS, retreats })

export const fetchRetreatDetailRequest = (id: number): FetchRetreatDetailType => ({ type: RetreatActionTypes.FETCH_RETREAT_DETAIL_REQUEST, id })
export const fetchRetreatDetailSuccess = (retreatDetail: RetreatDetail): FetchRetreatDetailType => ({ type: RetreatActionTypes.FETCH_RETREAT_DETAIL_SUCCESS, retreatDetail })

export const createRetreatRequest = (retreatDto: RetreatDto): CreateRetreatType => ({ type: RetreatActionTypes.CREATE_RETREAT_REQUEST, retreatDto })
export const createRetreatSuccess = (retreat: Retreat, msg: string): CreateRetreatType => ({ type: RetreatActionTypes.CREATE_RETREAT_SUCCESS, retreat, msg })

export const deleteRetreatRequest = (id: number): DeleteRetreatType => ({ type: RetreatActionTypes.DELETE_RETREAT_REQUEST, id })
export const deleteRetreatSuccess = (id: number, msg: string): DeleteRetreatType => ({ type: RetreatActionTypes.DELETE_RETREAT_SUCCESS, id, msg })

export const updateRetreatRequest = (retreat: Retreat): UpdateRetreatType => ({ type: RetreatActionTypes.UPDATE_RETREAT_REQUEST, retreat })
export const updateRetreatSuccess = (retreat: Retreat, msg: string): UpdateRetreatType => ({ type: RetreatActionTypes.UPDATE_RETREAT_SUCCESS, retreat, msg })

export const addMealRequest = (meal: MealInaRetreatDto): AddMealType => ({ type: RetreatActionTypes.ADD_MEAL_REQUEST, meal })
export const addMealSuccess = (meal: MealInaRetreatDto, msg: string): AddMealType => ({ type: RetreatActionTypes.ADD_MEAL_SUCCESS, meal, msg })

export const updateMealRequest = (meal: MealInaRetreatDto): UpdateMealType => ({ type: RetreatActionTypes.UPDATE_MEAL_REQUEST, meal })
export const updateMealSuccess = (meal: MealInaRetreatDto, msg: string): UpdateMealType => ({ type: RetreatActionTypes.UPDATE_MEAL_SUCCESS, meal, msg })

export const removeMealRequest = (mealInaRetreatId: number): RemoveMealType => ({ type: RetreatActionTypes.REMOVE_MEAL_REQUEST, mealInaRetreatId })
export const removeMealSuccess = (mealInaRetreatId: number, msg: string): RemoveMealType => ({ type: RetreatActionTypes.REMOVE_MEAL_SUCCESS, mealInaRetreatId, msg })

export const handleError = (message: string, error: string): HandleErrorType => ({ type: RetreatActionTypes.HANDLE_ERROR, message, error })
