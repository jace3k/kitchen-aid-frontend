import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Row } from 'react-table'
import { Container, Fab, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Retreat } from 'utils/interfaces/retreat.interface'
import * as routes from 'utils/routes'
import Token from 'components/Token'
import RetreatDialogEdit from './RetreatDialogEdit'
import RetreatTable from './RetreatTable'
import StyledFab from 'components/genericComponents/StyledFab/StyledFab'


const Retreats: React.FC<RouteComponentProps> = ({ history }) => {
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
        <StyledFab color="primary" onClick={openRetreatDialogCreate}>
          <AddIcon />
        </StyledFab>
      </Tooltip>
      <RetreatDialogEdit onClose={onRetreatDialogClose} open={newRetreatOpen} />
    </Container>
  )
}

export default Retreats
