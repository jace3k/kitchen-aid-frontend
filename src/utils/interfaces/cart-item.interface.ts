import { Ingredient } from "store/ingredients/types";

export type CartItemStatus = "PE" | "BO" | "SE"

export interface CartItem {
  id: number
  amount: string
  due_date: string
  status: CartItemStatus
  ingredient: number
  cart: number
}

export interface CartItemInCart {
  id: number
  amount: string
  due_date: string
  status: CartItemStatus
  ingredient: Ingredient
  cart: number
}

export interface CartItemDto {
  id?: number
  amount: string
  due_date: string
  status: CartItemStatus
  ingredient: number
  cart: number
}