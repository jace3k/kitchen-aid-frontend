import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ApplicationState } from 'store'
import { changeLanguage } from 'store/user/actions'
import { LanguageType, TranslationTokensType } from 'utils/translations'
import Token from 'components/Token'


type Languages = {
  language: LanguageType,
  token: TranslationTokensType,
}

const languages: Languages[] = [
  { language: 'pl', token: 'polish' },
  { language: 'en', token: 'english' },
]

const LanguageChooser = () => {
  const currentLanguage = useSelector((state: ApplicationState) => state.user.language)
  const dispatch = useDispatch()

  const handleChange = (event: SelectChangeEvent<LanguageType>) => {
    dispatch(changeLanguage(event.target.value as LanguageType))
  }

  return (
    <FormControl id="app-settings-lang-chooser" size="small" variant='outlined' fullWidth>
      <InputLabel id="lang-selector">
        <Token value='language' />
      </InputLabel>
      <Select
        id="app-settings-lang-chooser-select"
        labelId='lang-selector'
        label={<Token value='language' />}
        value={currentLanguage}
        onChange={handleChange}
      >
        {languages.map(lang => (
          <MenuItem id={`app-settings-lang-chooser-menu-item-${lang.token}`} value={lang.language} key={lang.language}>
            <Token value={lang.token} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LanguageChooser
