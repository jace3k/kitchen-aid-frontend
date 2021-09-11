import { Backdrop, Button, Card, CardContent, Container, Divider, IconButton, List, Table, TableBody, TableCell, TableRow, TextField } from '@material-ui/core'
import Token from 'components/Token'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ITranslations } from 'utils/languages/interface'
import { TranslationTokensType } from 'utils/translations'
import { useStyles } from '../styles'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Check'
import PlusButton from '@material-ui/icons/Add'

import { useEffect } from 'react'

interface DetaiWithListViewProps {
  name: string | any
  generateContent: (editMode: boolean) => JSX.Element
  generateItemsList: () => JSX.Element
  listTitle: TranslationTokensType
  loading: boolean
  onCloseEditMode?: (itemName: string) => void
  onAddToListClick?: () => void
  disableEditMode?: boolean,
  notFound?: boolean,
}

const DetailWithListView = ({
  name,
  generateContent,
  generateItemsList,
  listTitle,
  loading,
  onCloseEditMode,
  onAddToListClick,
  disableEditMode,
  notFound
}: DetaiWithListViewProps) => {
  const classes = useStyles()
  const [editMode, setEditMode] = useState(false)
  const [itemName, setItemName] = useState(name)

  useEffect(() => {
    setItemName(name)
  }, [name])

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
    <Container className={classes.detailContainer}>
      <Card className={classes.detailInformationPanel}>
        <CardContent>
          {loading ? (
            <h2><Token value="loadingData" /></h2>
          ) : (
            <>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {!disableEditMode && editMode ? <TextField value={itemName} onChange={(e) => setItemName(e.target.value)} /> : <h3>{itemName}</h3>}
                    </TableCell>
                    <TableCell>
                      {editMode ? (
                        <span onClick={() => {
                          setEditMode(false)
                          if (onCloseEditMode)
                            onCloseEditMode(itemName)
                        }}>
                          <IconButton size="small" style={{ float: 'right' }} >
                            <CloseIcon />
                          </IconButton>
                        </span>
                      ) : (
                        <span onClick={() => setEditMode(true)}>
                          <IconButton size="small" style={{ float: 'right' }}>
                            <EditIcon />
                          </IconButton>
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Divider style={{ marginBottom: 10 }} />
              {generateContent(editMode)}
            </>
          )}

        </CardContent>
      </Card>
      <Card className={classes.itemList}>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <h2><Token value={listTitle} /></h2>
                </TableCell>
                <TableCell>
                  <span onClick={onAddToListClick}>
                    <IconButton size="small" style={{ float: 'right' }}>
                      <PlusButton />
                    </IconButton>
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Divider />
          {generateItemsList()}
        </CardContent>
      </Card>
    </Container>
  )
}

export default DetailWithListView
