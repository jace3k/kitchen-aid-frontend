import { ITranslations } from './languages/interface'
import { pl } from './languages/pl'
import { en } from './languages/en'

export type LanguageType = "pl" | "en"
export type TranslationTokensType = keyof ITranslations

export const getTranslation = (label: TranslationTokensType, lang: LanguageType): string => {
  switch (lang) {
    case "pl":
      return pl[label]
    default:
      return en[label]
  }
}
