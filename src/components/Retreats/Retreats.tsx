import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Row } from 'react-table'
import { Container } from '@mui/material'
import { Retreat } from 'utils/interfaces/retreat.interface'
import * as routes from 'utils/routes'
import RetreatDialogEdit from './RetreatDialogEdit'
import RetreatTable from './RetreatTable'
import MainHeader from 'components/genericComponents/MainHeader/MainHeader'


const Retreats: React.FC<RouteComponentProps> = ({ history }) => {
  const [newRetreatOpen, setNewRetreatOpen] = useState(false)

  const openRetreatDialogCreate = () => setNewRetreatOpen(true)
  const onRetreatDialogClose = () => setNewRetreatOpen(false)

  const onRowClick = (row: Row<Retreat>) => {
    history.push(routes.Retreats + '/' + row.original.id)
  }

  return (
    <Container style={{ minWidth: 300 }}>
      <MainHeader
        title="retreats"
        addTitle="addNewRetreat"
        onClickAddBtn={openRetreatDialogCreate}
      />
      <RetreatTable onRowClick={onRowClick} />
      <RetreatDialogEdit onClose={onRetreatDialogClose} open={newRetreatOpen} />
    </Container>
  )
}

export default Retreats
