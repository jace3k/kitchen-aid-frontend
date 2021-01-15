import React, { useEffect } from 'react'
import { Container, LinearProgress, List } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import { fetchAllRetreatsRequest } from 'store/retreats/actions'
import RetreatListItem from './RetreatListItem'

const Retreats = () => {
  const { allRetreats, loading } = useSelector((state: ApplicationState) => state.retreats)

  const dispatch = useDispatch()
  const fetchAllRetreats = () => dispatch(fetchAllRetreatsRequest())
  console.log('allRetreats', allRetreats)
  const id = (index: number) => `retreat-list-item-${index}`

  useEffect(() => {
    console.log('useEffect, retreats')
    fetchAllRetreats()
  }, [])


  return (
    <Container style={{ minWidth: 300 }}>
      {loading && <LinearProgress />}
      <List>
        {allRetreats.map((retreat, index) => <RetreatListItem retreat={retreat} disabled={loading} key={id(index)} />)}
      </List>
    </Container>
  )
}

export default Retreats
