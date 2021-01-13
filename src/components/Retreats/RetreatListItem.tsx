import React from 'react'
import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import RetreatIcon from '@material-ui/icons/Assignment'
import MoreIcon from '@material-ui/icons/MoreVert'
import { Retreat } from 'store/retreats/types'

type RetreatListItemProps = {
  retreat: Retreat,
  disabled: boolean,
}

const RetreatListItem: React.FC<RetreatListItemProps> = ({ retreat, disabled }) => {
  const secondaryTitle = `Posiłki: ${retreat.mealsCount}, Koszyki: ${retreat.carts}`

  return (
    <ListItem button disabled={disabled}>
      <ListItemIcon>
        <RetreatIcon />
      </ListItemIcon>
      <ListItemText primary={retreat.name} secondary={secondaryTitle} />
      <ListItemSecondaryAction>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default RetreatListItem
