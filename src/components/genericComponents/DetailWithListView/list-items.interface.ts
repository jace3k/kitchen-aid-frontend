import { TranslationTokensType } from "utils/translations";

export interface ListItemsInterface {
  name: TranslationTokensType
  list: () => JSX.Element
  onAddToListClick?: () => void
}