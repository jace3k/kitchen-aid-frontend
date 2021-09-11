import { TranslationTokensType } from "./translations"

export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100]
export const MEAL_TYPES = ["BR", "LU", "FE"]

export enum MEAL_TYPES_COLORS {
  BR = '#29b6f6',
  LU = '#66bb6a',
  FE = '#ba68c8',
}

export const MEAL_TYPES_NAMES: Record<string, TranslationTokensType> = {
  BR: 'breakfast',
  LU: 'lunch',
  FE: 'feast',
}
