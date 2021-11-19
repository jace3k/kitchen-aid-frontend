import { TranslationTokensType } from "./translations"

export const BASE_URL = 'https://kitchenaid.pythonanywhere.com/cookbook/'
// export const BASE_URL = 'http://127.0.0.1:8000/cookbook/'

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

export const MOMENT_DATE_DISPLAY_FORMAT = 'DD.MM.YYYY'
export const MOMENT_DATE_SAVE_FORMAT = 'YYYY-MM-DD'
export const DATE_PICKER_MASK = "__.__.____"

export const STATUS_MAP = {
  'PE': 1,
  'BO': 2,
  'SE': 3,
}
