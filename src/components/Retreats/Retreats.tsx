import React, { useEffect, useState } from 'react'
import { Container, Fab, LinearProgress, List, Tooltip, Zoom } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import { fetchAllRetreatsRequest } from 'store/retreats/actions'
import RetreatListItem from './RetreatListItem'
import AddIcon from '@material-ui/icons/Add'
import { useStyles } from './styles'
import Token from 'components/Token'
import RetreatDialogEdit from './RetreatDialogEdit'

const Retreats = () => {
  const classes = useStyles()
  const [newRetreatOpen, setNewRetreatOpen] = useState(false)

  const { allRetreats, loading } = useSelector((state: ApplicationState) => state.retreats)

  const dispatch = useDispatch()
  const fetchAllRetreats = () => dispatch(fetchAllRetreatsRequest())
  const id = (index: number) => `retreat-list-item-${index}`

  const handleAddNewRetreatOpen = () => setNewRetreatOpen(true)
  const handleAddNewRetreatClose = () => setNewRetreatOpen(false)

  useEffect(() => {
    console.log('useEffect, retreats')
    fetchAllRetreats()
  }, [])

  return (
    <>
      { loading && <LinearProgress />}
      <Container style={{ minWidth: 300 }}>

        <List>
          {allRetreats.map((retreat, index) => <RetreatListItem retreat={retreat} disabled={loading} key={id(index)} />)}
        </List>
        <Tooltip title={<Token value="addNewRetreat" />} placement='left'>
          <Fab color="primary" className={classes.fab} onClick={handleAddNewRetreatOpen}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <RetreatDialogEdit onClose={handleAddNewRetreatClose} open={newRetreatOpen} />
      </Container>
    </>
  )
}

export default Retreats
