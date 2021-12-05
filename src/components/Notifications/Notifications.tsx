import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Alert, AlertProps, Snackbar } from '@mui/material'
import { ApplicationState } from 'store'
import { TranslationTokensType } from 'utils/translations'
import Token from 'components/Token'


type SeverityProp = JSX.LibraryManagedAttributes<typeof Alert, AlertProps['severity']>

const Notifications = () => {
  const [notificationOpened, setNotificationOpened] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<TranslationTokensType>('empty')
  const [severity, setSeverity] = useState<SeverityProp>('info')

  const { authorized: userAuthorizedState, error: userError, loginLocal } = useSelector((state: ApplicationState) => state.user)
  const { error: ingredientError, successMessage: ingredientSuccess } = useSelector((state: ApplicationState) => state.ingredients)
  const { error: dishError, successMessage: dishSuccess } = useSelector((state: ApplicationState) => state.dishes)
  const { error: mealError, successMessage: mealSuccess } = useSelector((state: ApplicationState) => state.meals)
  const { error: retreatError, successMessage: retreatSuccess } = useSelector((state: ApplicationState) => state.retreats)
  const { error: cartError, successMessage: cartSuccess } = useSelector((state: ApplicationState) => state.carts)

  const handleCloseNotification = () => setNotificationOpened(false)

  useEffect(() => {
    if (userAuthorizedState && !loginLocal) {
      setCurrentMessage('loginSuccess')
      setNotificationOpened(true)
      setSeverity('success')
    }

    if (userError) {
      setCurrentMessage('operationFailure')
      setNotificationOpened(true)
      setSeverity('error')
      console.log(userError)
    }
  }, [userAuthorizedState, userError])

  useEffect(() => {
    if (ingredientError) {
      setCurrentMessage('operationFailure')
      setSeverity('error')
      setNotificationOpened(true)
      console.log(ingredientError)
    }

    if (ingredientSuccess) {
      setCurrentMessage('operationSuccess')
      setSeverity('success')
      setNotificationOpened(true)
    }
  }, [ingredientError, ingredientSuccess])

  useEffect(() => {
    if (dishError) {
      setCurrentMessage('operationFailure')
      setSeverity('error')
      setNotificationOpened(true)
      console.log(dishError)
    }

    if (dishSuccess) {
      setCurrentMessage('operationSuccess')
      setSeverity('success')
      setNotificationOpened(true)
    }
  }, [dishError, dishSuccess])

  useEffect(() => {
    if (mealError) {
      setCurrentMessage('operationFailure')
      setSeverity('error')
      setNotificationOpened(true)
      console.log(mealError)
    }

    if (mealSuccess) {
      setCurrentMessage('operationSuccess')
      setSeverity('success')
      setNotificationOpened(true)
    }
  }, [mealError, mealSuccess])

  useEffect(() => {
    if (retreatError) {
      setCurrentMessage('operationFailure')
      setSeverity('error')
      setNotificationOpened(true)
      console.log(retreatError)
    }

    if (retreatSuccess) {
      setCurrentMessage('operationSuccess')
      setSeverity('success')
      setNotificationOpened(true)
    }
  }, [retreatError, retreatSuccess])

  useEffect(() => {
    if (cartError) {
      setCurrentMessage('operationFailure')
      setSeverity('error')
      setNotificationOpened(true)
      console.log(cartError)
    }

    if (cartSuccess) {
      setCurrentMessage('operationSuccess')
      setSeverity('success')
      setNotificationOpened(true)
    }
  }, [cartError, cartSuccess])

  return (
    <Snackbar
      open={notificationOpened}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      autoHideDuration={3000}
      onClose={handleCloseNotification}
      sx={{ marginBottom: 6 }}
    >
      <Alert severity={severity} variant="outlined">
        <Token value={currentMessage} />
      </Alert>
    </Snackbar>
  )
}

export default Notifications
