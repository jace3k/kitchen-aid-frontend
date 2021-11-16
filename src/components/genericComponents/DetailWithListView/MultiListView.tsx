import React, { useState, useEffect } from 'react'
import { AppBar, Tabs, Tab, Box } from '@mui/material'
import { useHistory } from "react-router-dom";
import { ListItemsInterface } from './list-items.interface'
import Token from 'components/Token'
import SingleListView from './SingleListView'


interface MultiListViewProps {
  generateItemsList: ListItemsInterface[]
  onAddToListClick?: () => void
}

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: any
  value: any
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const MultiListView: React.FC<MultiListViewProps> = ({ generateItemsList }) => {
  const history = useHistory();
  const tabIndex = generateItemsList.findIndex(x => x.name == history.location.pathname.split('/').pop())
  const [currentTab, setCurrentTab] = useState(tabIndex > 0 ? tabIndex : 0)

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Tabs
          value={currentTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {generateItemsList.map((item, i) => (
            <Tab label={<Token value={item.name} />} key={`tab-${i}`}
              onClick={() => {
                history.push(item.tabUrl || history.location.pathname)
              }}
            />
          ))}
        </Tabs>
      </AppBar>
      <div>
        {generateItemsList.map((item, i) => (
          <TabPanel value={currentTab} index={i} key={`tab-panel-${i}`}>
            <SingleListView generateItem={item} />
          </TabPanel>
        ))}
      </div>
    </div>
  )
}

export default MultiListView
