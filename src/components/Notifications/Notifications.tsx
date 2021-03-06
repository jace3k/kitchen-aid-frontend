import { Snackbar } from '@material-ui/core'
import { Alert, AlertProps } from '@material-ui/lab'
import Token from 'components/Token'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from 'store'
import { TranslationTokensType } from 'utils/translations'

type SeverityProp = JSX.LibraryManagedAttributes<typeof Alert, AlertProps['severity']>

const Notifications = () => {
  const [notificationOpened, setNotificationOpened] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<TranslationTokensType>('empty')
  const [severity, setSeverity] = useState<SeverityProp>('info')
  const [isInitial, setIsInitial] = useState(true)

  const userErrorState = useSelector((state: ApplicationState) => state.user.error)
  const userAuthorizedState = useSelector((state: ApplicationState) => state.user.authorized)
  // const userLanguageState = useSelector((state: ApplicationState) => state.user.language)

  const handleCloseNotification = () => setNotificationOpened(false)

  useEffect(() => {
    if (userErrorState) {
      // TODO: Handle network error & check userErrorState content
      console.log('[Nofitications] userErrorState', userErrorState)
      setCurrentMessage('invalidUsernameOrPass')
      setNotificationOpened(true)
      setSeverity('error')
    }
  }, [userErrorState])

  useEffect(() => {
    if (userAuthorizedState) {
      setCurrentMessage('loginSuccess')
      setNotificationOpened(true)
      setSeverity('success')
    }
  }, [userAuthorizedState])

  // useEffect(() => {
  //   if (isInitial) {
  //     setIsInitial(false)
  //     return
  //   }
    
  //   setCurrentMessage('languageChanged')
  //   setNotificationOpened(true)
  //   setSeverity('success')
  // }, [userLanguageState])

  return (
    <Snackbar
      open={notificationOpened}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      autoHideDuration={5000}
      onClose={handleCloseNotification}
    >
      <Alert variant="filled" severity={severity}>
        <Token value={currentMessage} />
      </Alert>
    </Snackbar>
  )
}

export default Notifications
