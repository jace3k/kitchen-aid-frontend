import { LanguageType } from "./translations"

enum StorageKeys {
  language = '@@KITCHEN_AID/language',
  darkMode = '@@KITCHEN_AID/darkMode',
  token = '@@KITCHEN_AID/authToken',
  itemsPerPage = '@@KITCHEN_AID/itemsPerPage',
}

const storage = {
  setLanguage: (language: LanguageType) => {
    if (localStorage.getItem(StorageKeys.language) as LanguageType === language)
      return

    localStorage.setItem(StorageKeys.language, language)
    console.log('[Local storage] Language saved')
  },
  getLanguage: (): LanguageType => {
    const savedLanguage = localStorage.getItem(StorageKeys.language)
    if (savedLanguage && savedLanguage as LanguageType)
      return savedLanguage as LanguageType

    return "en" as LanguageType
  },
  setDarkMode: () => {
    if (localStorage.getItem(StorageKeys.darkMode))
      return

    // dark mode enabled whenever key exists
    localStorage.setItem(StorageKeys.darkMode, 'true')
    console.log('[Local storage] Dark mode saved')
  },
  removeDarkMode: () => {
    if (!localStorage.getItem(StorageKeys.darkMode))
      return

    localStorage.removeItem(StorageKeys.darkMode)
    console.log('[Local storage] Dark mode removed')
  },
  isDarkMode: (): boolean => {
    return !!localStorage.getItem(StorageKeys.darkMode)
  },
  saveToken: (token: string) => {
    localStorage.setItem(StorageKeys.token, token)
    console.log('[Local storage] Auth token saved')
  },
  getToken: (): string | null => {
    return localStorage.getItem(StorageKeys.token)
  },
  removeToken: () => {
    if (!localStorage.getItem(StorageKeys.token))
      return

    localStorage.removeItem(StorageKeys.token)
    console.log('[Local storage] Auth token removed')
  },
  getDefaultItemsPerPage: () => {
    return localStorage.getItem(StorageKeys.itemsPerPage)
  },
  setDefaultItemsPerPage: (itemsPerPage: number) => {
    localStorage.setItem(StorageKeys.itemsPerPage, itemsPerPage + '')
  },
  
}

export default storage
