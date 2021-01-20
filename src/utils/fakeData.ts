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