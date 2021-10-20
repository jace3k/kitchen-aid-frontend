import { CartItem } from "./cart-item.interface";

export interface Cart {
  id: number
  retreat: number
}

export interface CartDto {
  id?: number
  retreat: number
}

export interface CartDetail {
  id: number
  retreat: number
  cart_item: CartItem[]
}