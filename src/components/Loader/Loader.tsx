import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { ApplicationState } from 'store'

const Loader = () => {
  const retreatLoading = useSelector((state: ApplicationState) => state.retreats.loading)
  const userLoading = useSelector((state: ApplicationState) => state.user.loading)

  const loading = retreatLoading || userLoading
  
  return (
    <div>
      {loading && <LinearProgress />}
    </div>
  )
}

export default Loader
