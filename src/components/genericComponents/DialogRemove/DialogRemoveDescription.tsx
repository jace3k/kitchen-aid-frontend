import React from 'react'
import { Chip, CircularProgress } from '@mui/material'
import IconOk from '@mui/icons-material/CheckCircleRounded'
import { green } from '@mui/material/colors'
import { TranslationTokensType } from 'utils/translations'
import Token from 'components/Token'


interface DialogRemoveDescriptionProps {
  usedInElements?: string[]
  usedInElementsJsx?: JSX.Element[]
  loading: boolean,
  headerUsed: TranslationTokensType
  headerUnused: TranslationTokensType
}

const DialogRemoveDescription: React.FC<DialogRemoveDescriptionProps> = ({ usedInElements, usedInElementsJsx, loading, headerUsed, headerUnused }) => {

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Token value="checkingRelations" />
        <div style={{ margin: 5 }} />
        <CircularProgress />
      </div>
    )
  }

  if (usedInElements?.length)
    return (
      <div style={{ textAlign: 'center' }}>
        <Token value={headerUsed} />
        <div style={{ margin: 10 }} />
        {Array.from(new Set(usedInElements)).map(el => <Chip key={`chip-key-${el}`} label={el} style={{ margin: 2 }} />)}
      </div>
    )

  if (usedInElementsJsx?.length)
    return (
      <div style={{ textAlign: 'center' }}>
        <Token value={headerUsed} />
        <div style={{ margin: 10 }} />
        {usedInElementsJsx.map((el, i) => <Chip key={`chip-key-${i}`} label={el} style={{ margin: 2 }} />)}
      </div>
    )

  return (
    <div style={{ textAlign: 'center' }}>
      <Token value={headerUnused} />
      <div style={{ margin: 10 }} />
      <IconOk style={{ color: green[500] }} />
    </div>
  )
}

export default DialogRemoveDescription
