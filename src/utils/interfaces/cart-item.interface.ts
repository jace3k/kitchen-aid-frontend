import { Ingredient } from "store/ingredients/types";

export interface CartItem {
  id: number
  amount: string
  due_date: string
  status: string
  ingredient: number
  cart: number
}

export interface CartItemInCart {
  id: number
  amount: string
  due_date: string
  status: string
  ingredient: Ingredient
  cart: number
}

export interface CartItemDto {
  id?: number
  amount: string
  due_date: string
  status: string
  ingredient: number
  cart: number
}