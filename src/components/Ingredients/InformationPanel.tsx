import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import Token from 'components/Token'

interface InformationPanelProps {
  className?: string,
}

const InformationPanel = ({ className }: InformationPanelProps) => {
  return (
    <Card className={className}>
      <CardContent>
        <h2><Token value="ingredients" /></h2>
      </CardContent>
    </Card>
  )
}

export default InformationPanel
