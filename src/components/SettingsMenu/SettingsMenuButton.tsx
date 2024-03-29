import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IconButton, Menu, MenuItem } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { logout } from 'store/user/actions'
import AppSettingsDialog from './AppSettingsDialog'
import Token from 'components/Token'


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
      <IconButton id="nav-settings-button" onClick={handleMenuOpen}>
        <SettingsIcon />
      </IconButton>
      <Menu
        id='nav-settings-menu'
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem id='nav-settings-menu-item-settings' onClick={handleSettingsOpen}>
          <Token value="settings" />
        </MenuItem>
        <MenuItem id='nav-settings-menu-item-logout' onClick={handleLogout}>
          <Token value="logout" />
        </MenuItem>
      </Menu>
      <AppSettingsDialog open={appSettingsOpen} onClose={handleSettingsClose} />
    </>
  )
}

export default SettingsMenuButton
