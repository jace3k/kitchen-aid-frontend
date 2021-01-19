import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import Token from 'components/Token'
import AppSettingsDialog from './AppSettingsDialog'
import { useDispatch } from 'react-redux'
import { logout } from 'store/user/actions'

const SettingsMenuButton = () => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false)

  const [appSettingsOpen, setAppSettingsOpen] = useState(false)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMenuOpen(false)
  }

  const handleSettingsOpen = () => {
    setAppSettingsOpen(true)
    handleMenuClose()
  }

  const handleSettingsClose = () => setAppSettingsOpen(false)

  const handleLogout = () => {
    handleMenuClose()
    dispatch(logout())
  }

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <SettingsIcon />
      </IconButton>
      <Menu
        id='settings-menu-button'
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleSettingsOpen}>
          <Token value="settings" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Token value="logout" />
        </MenuItem>
      </Menu>
      <AppSettingsDialog open={appSettingsOpen} onClose={handleSettingsClose} />
    </>
  )
}

export default SettingsMenuButton
