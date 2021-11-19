import React, { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardProps,
  Container,
  ContainerProps,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Check'
import { styled } from '@mui/material/styles'
import { ListItemsInterface } from './list-items.interface'
import Token from 'components/Token'
import SingleListView from './SingleListView'
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
const StyledContainer = styled(Container)<ContainerProps & { wide: boolean | undefined }>(({ theme, wide }) => {
  if (wide)
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    }

  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    }
  }
})

const DetailInfoCard = styled(Card)<CardProps & { wide: boolean | undefined }>(({ theme, wide }) => {
  if (wide)
    return {
      width: 'auto',
      margin: 5,
      minWidth: 300,
    }

  return {
    width: 'auto',
    margin: 5,
    minWidth: 300,
    [theme.breakpoints.up('md')]: {
      width: 300,
    }
  }
})

const ItemsListCard = styled(Card)<CardProps>(({ theme }) => {
  return {
    minWidth: 300,
    flexGrow: 1,
    margin: 5,
  }
})


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
    <StyledContainer wide={wide}>
      <DetailInfoCard wide={wide}>
        <CardContent>
          {loading ? (
            <h2><Token value="loadingData" /></h2>
          ) : (
            <>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {!disableEditMode && editMode
                        ? (
                          <TextField
                            size="small"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                          />
                        )
                        : (
                          <Typography>{itemName}</Typography>
                        )}
                    </TableCell>
                    <TableCell>
                      {editMode ? (
                        <span onClick={() => {
                          setEditMode(false)
                          if (onCloseEditMode)
                            onCloseEditMode(itemName)
                        }}>
                          <IconButton size="small" style={{ float: 'right' }} >
                            <CloseIcon color="success" />
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
      </DetailInfoCard>
      <ItemsListCard>
        <CardContent>
          {generateItemsList.length > 1 ? (
            <MultiListView generateItemsList={generateItemsList} />
          ) : (
            <SingleListView generateItem={generateItemsList[0]} />
          )}
        </CardContent>
      </ItemsListCard>
    </StyledContainer>
  )
}

export default DetailWithListView
