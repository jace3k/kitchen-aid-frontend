import { TranslationTokensType } from "./translations"

export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100]
export const MEAL_TYPES = ["BR", "LU", "FE"]

export enum MEAL_TYPES_COLORS {
  BR = '#c8e6c9',
  LU = '#b2ebf2',
  FE = '#ef9a9a',
}

export const MEAL_TYPES_NAMES: Record<string, TranslationTokensType> = {
  BR: 'breakfast',
  LU: 'lunch',
  FE: 'feast',
}
