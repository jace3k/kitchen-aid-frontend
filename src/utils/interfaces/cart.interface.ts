import { CartItem } from "./cart-item.interface";
import { Retreat } from "./retreat.interface";

export interface Cart {
  id: number
  retreat: Retreat
}

export interface CartDto {
  id?: number
  retreat: number
}

export interface CartDetail {
  id: number
  retreat: Retreat
  cart_item: CartItem[]
}