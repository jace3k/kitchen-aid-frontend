import { IngredientRow } from "store/dishes/types";
import { Ingredient } from "store/ingredients/types";
import { MealRow, Retreat } from "store/retreats/types";

export const retreats: Retreat[] = [
  { id: 1, name: 'Korona party', mealsCount: 3, carts: 1 },
  { id: 2, name: 'Przyjęcie staruszków', mealsCount: 30, carts: 3 },
  { id: 3, name: 'Wesele młodych bombelków', mealsCount: 9, carts: 5 },
  { id: 4, name: 'Lolek i Bolek', mealsCount: 32, carts: 1 },
]

export const mealRows: MealRow[] = [
  { id: 1, retreatId: 1, name: 'Jagódki koronowe' },
  { id: 2, retreatId: 1, name: 'Bobolki koronowe' },
  { id: 3, retreatId: 1, name: 'Pszenica koronowa' },
  { id: 4, retreatId: 1, name: 'Koronkowy miodek' },
  { id: 5, retreatId: 1, name: 'Super kwaśny koronowy barszcz' },
  { id: 6, retreatId: 2, name: 'Potrawa starszych pań i panów' },
  { id: 7, retreatId: 2, name: 'Zabytkowy kurczak' },
  { id: 8, retreatId: 2, name: 'Pradawna kaczka w sosie słodko-kwaśnym' },
  { id: 9, retreatId: 2, name: 'To czego szuka wnuczek' },
  { id: 10, retreatId: 3, name: 'Bombelkolada na twardo' },
  { id: 11, retreatId: 3, name: 'Bombelkolada na miękko' },
  { id: 12, retreatId: 3, name: 'Zakochane filety z kurczaka' },
  { id: 13, retreatId: 4, name: 'Pyszne korniszonki' },
]

///////


export const ingredients: Ingredient[] = [
  { id: 1, name: 'Mąka', defaultPrice: 4.49 },
  { id: 2, name: 'Sól', defaultPrice: 1.00 },
  { id: 3, name: 'Keczup', defaultPrice: 9.60 },
  { id: 4, name: 'Musztarda', defaultPrice: 5.55 },
  { id: 5, name: 'Kapusta', defaultPrice: 1.99 },
  { id: 6, name: 'Woda', defaultPrice: 1.20 },
  { id: 7, name: 'Kiełbasa', defaultPrice: 2.20 },
]

interface Dish {
  id: number,
  name: string,
}

export const dishes: Dish[] = [
  { id: 1, name: 'Kurczak z ziemniakami' },
  { id: 2, name: 'Zupa z ziemniaków' },
  { id: 3, name: 'Bigos' },
  { id: 4, name: 'Frytki z batatmi' },
  { id: 5, name: 'Zupa ogórkowa' },
  { id: 6, name: 'Tort' },
]


export const ingredientRows: IngredientRow[] = [
  { id: 1, ingredient: ingredients[1], dishId: 1, customName: '', margin: 4, part: 0.20, price: 40.00 },
  { id: 2, ingredient: ingredients[2], dishId: 1, customName: '', margin: 1, part: 0.40, price: 80.00 },
  { id: 3, ingredient: ingredients[3], dishId: 1, customName: '', margin: 11, part: 0.10, price: 20.00 },
  { id: 4, ingredient: ingredients[4], dishId: 1, customName: '', margin: 5, part: 0.30, price: 60.00 },

  { id: 5, ingredient: ingredients[3], dishId: 2, customName: '', margin: 5, part: 0.20, price: 40.00 },
  { id: 6, ingredient: ingredients[5], dishId: 2, customName: '', margin: 2, part: 0.40, price: 80.00 },
  { id: 7, ingredient: ingredients[4], dishId: 2, customName: '', margin: 1, part: 0.10, price: 20.00 },
  { id: 8, ingredient: ingredients[6], dishId: 3, customName: '', margin: 7, part: 0.30, price: 60.00 },
]
