import React, { useState, useEffect } from 'react'
import { Backdrop, Button, Card, CardContent, Container, Divider, IconButton, List, Table, TableBody, TableCell, TableRow, TextField } from '@material-ui/core'
import Token from 'components/Token'
import { useDispatch } from 'react-redux'
import { ITranslations } from 'utils/languages/interface'
import { TranslationTokensType } from 'utils/translations'
import { useStyles } from '../styles'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Check'
import PlusButton from '@material-ui/icons/Add'

interface TabElement {
  name: string,
  content: any,
}

interface DetailWithTabsViewProps {
  tabs: TabElement[],
  loading: boolean,
  notFound?: boolean,
}

const DetailWithTabsView: React.FC<DetailWithTabsViewProps> = ({ tabs, loading, notFound }) => {
  const classes = useStyles()

  if (!loading && notFound)
    return (
      <div style={{ textAlign: 'center' }}>
        <h1><Token value="elementNotFound" /></h1>
        <h3><Token value="elementNotFoundDesc" /></h3>
        <Button variant="outlined" onClick={() => window.location.pathname = '/'}>
          <Token value="backToHome" />
        </Button>
      </div>
    )


  return (
    <div>
      <Container className={classes.detailContainer}>
        <Card className={classes.detailInformationPanel}>
          <CardContent>
            {loading ? (
              <h2><Token value="loadingData" /></h2>
            ) : (
              <>
                

              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default DetailWithTabsView
