import React, { useState } from 'react'
import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem, Tooltip } from '@material-ui/core'
import RetreatIcon from '@material-ui/icons/Assignment'
import MoreIcon from '@material-ui/icons/MoreVert'
import Token from 'components/Token'
import RetreatDialogEdit from './RetreatDialogEdit'
import * as routes from 'utils/routes'
import { Retreat } from 'utils/interfaces/retreat.interface'

type RetreatListItemProps = {
  retreat: Retreat,
  disabled: boolean,
  history: any,
}

const RetreatListItem: React.FC<RetreatListItemProps> = ({ retreat, disabled, history }) => {
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

  const handleOpenDetail = () => history.push(routes.Retreats + '/' + retreat.id)

  const secondaryTitle = (
    <>
      <Token value="meals" /> : 1
      {' '}
      <Token value="carts" /> : 2
    </>
  )

  return (
    <>
      <ListItem button disabled={disabled} onClick={handleOpenDetail}>
        <ListItemIcon>
          <RetreatIcon />
        </ListItemIcon>
        <ListItemText primary={retreat.name} secondary={secondaryTitle} />
        <ListItemSecondaryAction>
          <Tooltip title={<Token value="more" />}>
            <IconButton onClick={handleMenuOpen}>
              <MoreIcon />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      <Menu
        id={`more-menu-${retreat.id}`}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        keepMounted
      >
        <MenuItem onClick={handleEditDialogOpen}><Token value="editName" /></MenuItem>
        <MenuItem onClick={handleMenuClose}><Token value="delete" /></MenuItem>
      </Menu>
      <RetreatDialogEdit open={editDialogOpen} onClose={handleEditDialogClose} retreat={retreat} />
    </>
  )
}

export default RetreatListItem
