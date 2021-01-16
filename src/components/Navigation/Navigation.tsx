import React, { useEffect, useState } from 'react'
import { AppBar, IconButton, Paper, Tabs, Theme, Toolbar, useMediaQuery } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import KitchenIcon from '@material-ui/icons/Restaurant'
import HamburgerIcon from '@material-ui/icons/Menu'
import { RouteComponentProps } from 'react-router-dom'
import LinkTab from './LinkTab'
import * as routes from 'utils/routes'
import { TranslationTokensType } from 'utils/translations'
import Sidebar from './Sidebar'

type ITabNavigationUrls = {
  url: string,
  token: TranslationTokensType,
}

export const TabNavigationUrls: ITabNavigationUrls[] = [
  { url: routes.Retreats, token: "retreats" },
  { url: routes.Meals, token: 'meals' },
  { url: routes.Ingredients, token: 'ingredients' },
]

const Navigation: React.FC<RouteComponentProps> = props => {
  const [tabIndex, setTabIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const handleChangeTabIndex = (e: any, newVal: number) => setTabIndex(newVal)
  const handleSidebarClose = () => setSidebarOpen(false)
  const handleSidebarOpen = () => setSidebarOpen(true)

  const isDesktopSize = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  useEffect(() => {
    const rootPathName = props.history.location.pathname.split('/')[1]
    const activeTabIndex = TabNavigationUrls.findIndex(tab => tab.url === `/${rootPathName}`)
    if (activeTabIndex >= 0)
      setTabIndex(activeTabIndex)
  }, [props.history.location.pathname])

  return (
    <AppBar position="static" style={{ marginBottom: 10 }}>
      <Paper square>
        <Toolbar variant="dense">
          {isDesktopSize ? <KitchenIcon /> : <IconButton onClick={handleSidebarOpen}><HamburgerIcon /></IconButton>}
          <div style={{ marginRight: 25, flexGrow: isDesktopSize ? 0 : 1 }} />
          {isDesktopSize && (
            <Tabs
              value={tabIndex}
              onChange={handleChangeTabIndex}
              indicatorColor="primary"
              textColor="primary"
              style={{ flexGrow: 1 }}
            >
              {TabNavigationUrls.map(tab =>
                <LinkTab
                  label={tab.token}
                  to={tab.url}
                  key={tab.token}
                  history={props.history}
                />
              )}
            </Tabs>
          )}
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </Paper>
      {!isDesktopSize && <Sidebar open={sidebarOpen} onClose={handleSidebarClose} history={props.history} />}
    </AppBar>
  )
}

export default Navigation
