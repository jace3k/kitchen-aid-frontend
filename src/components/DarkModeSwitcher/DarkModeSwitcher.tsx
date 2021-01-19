import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { ApplicationState } from 'store'
import { toggleDarkMode } from 'store/user/actions'
import DarkModeIcon from '@material-ui/icons/Brightness7'
import LightModeIcon from '@material-ui/icons/Brightness4'

const DarkModeSwitcher = () => {
  const isDarkMode = useSelector((state: ApplicationState) => state.user.darkMode)
  const dispatch = useDispatch()
  const handleDarkModeChange = () => dispatch(toggleDarkMode(!isDarkMode))
  return (
    <IconButton onClick={handleDarkModeChange}>
      {
        isDarkMode
          ? <DarkModeIcon />
          : <LightModeIcon />
      }
    </IconButton>
  )
}

export default DarkModeSwitcher
