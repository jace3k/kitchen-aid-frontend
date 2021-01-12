import { Snackbar } from '@material-ui/core'
import { Alert, AlertProps } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from 'store'

type SeverityProp = JSX.LibraryManagedAttributes<typeof Alert, AlertProps['severity']>

const Notifications = () => {
  const [notificationOpened, setNotificationOpened] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const [severity, setSeverity] = useState<SeverityProp>('info')
  const handleCloseNotification = () => setNotificationOpened(false)

  const userErrorState = useSelector((state: ApplicationState) => state.user.error)
  const userAuthorizedState = useSelector((state: ApplicationState) => state.user.authorized)
  

  useEffect(() => {
    if (userErrorState) {
      setCurrentMessage(userErrorState)
      setNotificationOpened(true)
      setSeverity('error')
    }
  }, [userErrorState])

  useEffect(() => {
    if (userAuthorizedState) {
      setCurrentMessage('Logged in successfully!')
      setNotificationOpened(true)
      setSeverity('success')
    }
  }, [userAuthorizedState])

  return (
    <Snackbar
      open={notificationOpened}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      autoHideDuration={3000}
      onClose={handleCloseNotification}
    >
      <Alert variant="filled" severity={severity}>
        {currentMessage}
      </Alert>
    </Snackbar>
  )
}

export default Notifications
