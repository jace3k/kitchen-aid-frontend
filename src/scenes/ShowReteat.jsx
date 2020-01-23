import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRetreat } from '../services/store/actions/retreatsActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'
import DishExpansionPanel from './DishExpansionPanel'
import Error from './Error'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '80vh',
    borderTop: `1px solid ${theme.palette.divider}`,
    
  },
  tabs: {
    width: '20em',
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabPane: {
    width: '100%'
  }
}));

const TabPane = ({ children, value, index, className }) => {
  return <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index} id={`vertical-tabpanel-${index}`}
    className={className}>
    {value === index && <Box p={3}>{children}</Box>}
  </Typography>
}


const ShowRetreat = (props) => {
  const classes = useStyles()
  const { id } = props.match.params
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0)
  const { isLoading, retreat, error } = useSelector(state => state.retreats)

  useEffect(() => {
    dispatch(fetchRetreat(id))
  }, [dispatch, id]);


  const handleChange = (_, newValue) => {
    setValue(newValue);
  }
  console.log("SHOW RETREATS", props)
  return (
    
    <div>
      {(!isLoading && !error) && (
        <>
          <h2>{retreat.name}</h2>
          <div className={classes.root}>
            <Tabs
              orientation="vertical"
              className={classes.tabs}
              variant="scrollable"
              onChange={handleChange}
              role="tabpanel"
              value={value}
              indicatorColor="primary"
            >
              {retreat.meals && retreat.meals.map((meal, i) => (
                <Tab label={`${meal.date} - ${meal.type}`}
                  id={`vertical-tab-${i}`}
                  key={`vertical-tab-${i}`}
                   />
              ))}
            </Tabs>
            {retreat.meals && retreat.meals.map((meal, i) => (
              <TabPane
                key={`tab-pane-key-${i}`}
                className={classes.tabPane}
                value={value}
                index={i}>
                  <DishExpansionPanel 
                    mealId={meal.id} 
                    mealType={meal.type} 
                    mealDate={meal.date} />
              </TabPane>
            ))}

          </div>
        </>
      )}

      {isLoading && <CircularProgress />}
      {(!isLoading && error) && <Error error={error} />}
    </div>
  )
}

export default ShowRetreat
