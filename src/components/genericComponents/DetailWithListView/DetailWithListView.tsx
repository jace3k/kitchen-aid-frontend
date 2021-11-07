import React, { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Check'
import Token from 'components/Token'
import { useStyles } from '../styles'
import SingleListView from './SingleListView'
import { ListItemsInterface } from './list-items.interface'
import MultiListView from './MultiListView'

interface DetaiWithListViewProps {
  name: string | any
  generateContent: (editMode: boolean) => JSX.Element
  generateItemsList: ListItemsInterface[]
  loading: boolean
  onCloseEditMode?: (itemName: string) => void
  disableEditMode?: boolean,
  notFound?: boolean,
  wide?: boolean,
}

const DetailWithListView = ({
  name,
  generateContent,
  generateItemsList,
  loading,
  onCloseEditMode,
  disableEditMode,
  notFound,
  wide
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
    <Container className={wide ? classes.wideDetailContainer : classes.detailContainer}>
      <Card className={wide ? classes.wideDetailInformationPanel : classes.detailInformationPanel}>
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
          {generateItemsList.length > 1 ? (
            <MultiListView generateItemsList={generateItemsList} />
          ) : (
            <SingleListView generateItem={generateItemsList[0]} />
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default DetailWithListView
