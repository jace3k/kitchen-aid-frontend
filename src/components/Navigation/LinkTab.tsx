import React from 'react'
import { Tab } from '@mui/material';
import { TranslationTokensType } from 'utils/translations';
import Token from 'components/Token';

interface LinkTabProps {
  to: string,
  label: TranslationTokensType,
  history: any,
  key: string,
}

const LinkTab: React.FC<LinkTabProps> = props => {
  return (
    <Tab
      style={{ fontWeight: 'bolder' }}
      label={<Token value={props.label} />}
      onClick={(event: any) => {
        event.preventDefault();
        props.history.push(props.to)
      }}
      key={props.key}
    />
  )
}

export default LinkTab