import React, { useState } from 'react'
import { AppBar, Tabs, Tab, Box } from '@material-ui/core'
import Token from 'components/Token'
import { ListItemsInterface } from './list-items.interface'
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

const MultiListView: React.FC<MultiListViewProps> = ({ generateItemsList, onAddToListClick }) => {
  // in MultiListView - generateItemsList has multiple elements
  const [currentTab, setCurrentTab] = useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue)
  }
  const handleChangeIndex = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {generateItemsList.map((item, i) => (
            <Tab label={<Token value={item.name} />} key={`tab-${i}`} />
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
