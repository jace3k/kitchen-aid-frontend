import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import Token from 'components/Token'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import { changeLanguage } from 'store/user/actions'
import { LanguageType, TranslationTokensType } from 'utils/translations'

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

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(changeLanguage(event.target.value as LanguageType))
  }

  return (
    <FormControl size="small" variant='outlined'>
      <InputLabel id="lang-selector">
        <Token value='language' />
      </InputLabel>
      <Select
        labelId='lang-selector'
        label={<Token value='language' />}
        value={currentLanguage}
        onChange={handleChange}
      >
        {languages.map(lang => (
          <MenuItem value={lang.language} key={lang.language}>
            <Token value={lang.token} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LanguageChooser
