import { MealInaRetreat } from "./meal-ina-retreat.interface";

export interface Retreat {
  id: number,
  name: string,
}

export interface RetreatDto {
  id?: number,
  name: string,
}

export interface RetreatDetail {
  id: number,
  name: string,
  meal_ina_retreat: MealInaRetreat[]
}
