import React, { useEffect, useState } from 'react'
import { AppBar, IconButton, Paper, Tabs, Toolbar } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import KitchenIcon from '@material-ui/icons/Restaurant'
import { RouteComponentProps } from 'react-router-dom'
import LinkTab from './LinkTab'
import * as routes from 'utils/routes'

const TabNavigationUrls = [
  routes.Retreats,
  routes.Ingredients,
]

const Navigation: React.FC<RouteComponentProps> = props => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChangeTabIndex = (e: any, newVal: number) => setTabIndex(newVal)

  useEffect(() => {
    const rootPathName = props.history.location.pathname.split('/')[1]
    const activeTabIndex = TabNavigationUrls.indexOf(`/${rootPathName}`)
    if (activeTabIndex >= 0)
      setTabIndex(activeTabIndex)
  }, [props.history.location.pathname])


  return (
    <AppBar position="static" style={{ marginBottom: 10 }}>
      <Paper square>
        <Toolbar variant="dense">
          <KitchenIcon />
          <div style={{ marginRight: 25 }} />
          <Tabs
            value={tabIndex}
            onChange={handleChangeTabIndex}
            indicatorColor="primary"
            textColor="primary"
            style={{ flexGrow: 1 }}
          >
            {TabNavigationUrls.map(url =>
              <LinkTab
                label={url.split('/')[1]}
                to={url}
                key={url}
                history={props.history}
              />
            )}
          </Tabs>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </Paper>
    </AppBar>
  )
}

export default Navigation
