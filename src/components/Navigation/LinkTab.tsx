import React from 'react'
import { Tab } from '@material-ui/core';

interface LinkTabProps {
  to: string,
  label: string,
  history: any,
  key: string,
}

const LinkTab: React.FC<LinkTabProps> = props => {
  return (
    <Tab
      style={{ fontWeight: 'bolder' }}
      label={props.label}
      onClick={(event: any) => {
        event.preventDefault();
        props.history.push(props.to)
      }}
      key={props.key}
    />
  )
}

export default LinkTab