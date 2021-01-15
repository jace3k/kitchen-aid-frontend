import React, { useState } from 'react'
import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem } from '@material-ui/core'
import RetreatIcon from '@material-ui/icons/Assignment'
import MoreIcon from '@material-ui/icons/MoreVert'
import { Retreat } from 'store/retreats/types'
import Token from 'components/Token'
import RetreatDialogEdit from './RetreatDialogEdit'

type RetreatListItemProps = {
  retreat: Retreat,
  disabled: boolean,
}

const RetreatListItem: React.FC<RetreatListItemProps> = ({ retreat, disabled }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  };

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMenuOpen(false)
  };

  const handleEditDialogClose = () => setEditDialogOpen(false)
  const handleEditDialogOpen = () => {
    setEditDialogOpen(true)
    handleMenuClose()
  }

  const secondaryTitle = (
    <>
      <Token value="meals" />: {retreat.mealsCount},
      {' '}
      <Token value="carts" />: {retreat.carts}
    </>
  )

  return (
    <ListItem button disabled={disabled}>
      <Menu
        id={`more-menu-${retreat.id}`}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditDialogOpen}><Token value="edit" /></MenuItem>
        <MenuItem onClick={handleMenuClose}><Token value="delete" /></MenuItem>
      </Menu>
      <RetreatDialogEdit open={editDialogOpen} onClose={handleEditDialogClose} retreat={retreat}  />
      <ListItemIcon>
        <RetreatIcon />
      </ListItemIcon>
      <ListItemText primary={retreat.name} secondary={secondaryTitle} />
      <ListItemSecondaryAction>
        <IconButton onClick={handleMenuOpen}>
          <MoreIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default RetreatListItem
