import React from 'react'
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import RetreatIcon from '@material-ui/icons/Assignment'
import IngredientIcon from '@material-ui/icons/Grain'
import MealsIcon from '@material-ui/icons/Kitchen'
import DishesIcon from '@material-ui/icons/Fastfood'
import CartsIcon from '@material-ui/icons/ShoppingCart'
import { TabNavigationUrls } from './Navigation'
import Token from 'components/Token'
import * as routes from 'utils/routes'

interface SidebarProps {
  open: boolean,
  onClose: () => void,
  history: any,
}

const renderIcon = (url: string) => {
  switch (url) {
    case routes.Retreats:
      return <RetreatIcon />
    case routes.Meals:
      return <MealsIcon />
    case routes.Ingredients:
      return <IngredientIcon />
    case routes.Dishes:
      return <DishesIcon />
    case routes.Carts:
      return <CartsIcon />
  }
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, history }) => {

  return (
    <Drawer anchor="left" open={open} onClose={onClose} >
      <List dense>
        <ListItem disabled><Token value="kitchenAid" /></ListItem>
        {TabNavigationUrls.map(tab =>
          <ListItem button onClick={() => { history.push(tab.url); onClose() }} key={tab.url} style={{ marginRight: 25 }}>
            <ListItemIcon>
              {renderIcon(tab.url)}
            </ListItemIcon>
            <ListItemText>
              <Token value={tab.token} />
            </ListItemText>
          </ListItem>
        )}
        <Divider />
      </List>
    </Drawer>
  )
}

export default Sidebar
