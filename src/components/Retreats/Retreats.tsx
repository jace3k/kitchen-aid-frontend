import React, { useState } from 'react'
import { Container, Fab, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useStyles } from './styles'
import Token from 'components/Token'
import RetreatDialogEdit from './RetreatDialogEdit'
import { RouteComponentProps } from 'react-router-dom'
import { Retreat } from 'utils/interfaces/retreat.interface'
import { Row } from 'react-table'
import * as routes from 'utils/routes'
import RetreatTable from './RetreatTable'

const Retreats: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles()
  const [newRetreatOpen, setNewRetreatOpen] = useState(false)

  const openRetreatDialogCreate = () => setNewRetreatOpen(true)
  const onRetreatDialogClose = () => setNewRetreatOpen(false)

  const onRowClick = (row: Row<Retreat>) => {
    history.push(routes.Retreats + '/' + row.original.id)
  }

  return (
    <Container style={{ minWidth: 300 }}>
      <h1><Token value="retreats" /></h1>
      <RetreatTable onRowClick={onRowClick} />
      <Tooltip title={<Token value="addNewRetreat" />} placement='left'>
        <Fab color="primary" className={classes.fab} onClick={openRetreatDialogCreate}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <RetreatDialogEdit onClose={onRetreatDialogClose} open={newRetreatOpen} />
    </Container>
  )
}

export default Retreats
