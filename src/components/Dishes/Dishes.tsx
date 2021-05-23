import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import DishesTable from './DishesTable'
import { Tabs, Tab, IconButton, Typography, Box } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface CustomTabProps {
  overview?: boolean,
  dishId?: number,
  index: number,
  setValue: (n: number) => void,
}
const CustomTab = (props: CustomTabProps) => {
  return (
    <div
      style={{ borderRight: '1px solid gray' }}
    >
      <Tab
        label="Tab 1"
        onClick={() => {
          props.setValue(props.index)
        }}
      />
      {!props.overview && (
        <IconButton size="small">
          <CloseIcon />
        </IconButton>
      )}

    </div>
  )
}

const Dishes = () => {
  const [value, setValue] = useState(0)
  const [openedDishes, setOpenedDishes] = useState([])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }

  return (
    <Container style={{ minWidth: 300 }}>
      <Tabs
        indicatorColor="secondary"
        textColor="secondary"
        value={value}
        onChange={handleChange}
      >
        <CustomTab overview index={0} setValue={setValue} />
        <CustomTab dishId={99} index={1} setValue={setValue} />
        <CustomTab dishId={101} index={2} setValue={setValue} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DishesTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        LOLOLOLO
      </TabPanel>
      <TabPanel value={value} index={2}>
        Nothiing here
      </TabPanel>

    </Container>
  )
}

export default Dishes
