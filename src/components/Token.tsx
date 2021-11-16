import React from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import { getTranslation, TranslationTokensType } from 'utils/translations'


interface TokenProps {
  value: TranslationTokensType,
}

const Token = (props: TokenProps) => {
  const lang = useSelector((state: ApplicationState) => state.user.language)
  return (
    <>
      {getTranslation(props.value, lang)}
    </>
  )
}

export default Token
