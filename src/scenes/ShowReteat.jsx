import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRetreat } from '../services/store/actions/retreatsActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import { Typography, Paper, Button } from '@material-ui/core'
import DishExpansionPanel from './DishExpansionPanel'
import Error from './Error'
import DialogAddMeal from './DialogAddMeal'

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
    width: '100%',
  },
  div: {
    width: '28em',
    float: 'left',
    margin: '1em'
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
  const { id, mealDate } = props.match.params
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0)
  const { isLoading, retreat, error } = useSelector(state => state.retreats)
  const mealsState = useSelector(state => state.meals)
  const [mealsByDateState, setMealsByDateState] = React.useState({})
  const [newMealOpen, setNewMealOpen] = React.useState(false)

  const setPathMealDate = useCallback((mealDate) => {
    const pathname = `/retreat/${id}`
    props.history.push(`${pathname}/${mealDate}`)
  }, [id, props.history])


  useEffect(() => {
    dispatch(fetchRetreat(id))
  }, [mealsState.createdMeal, dispatch, id])

  useEffect(() => {
    const mealsByDate = {}
    if (retreat && retreat.meals) {
      retreat.meals.map(ret => {
        if (!mealsByDate[ret.date]) {
          mealsByDate[ret.date] = []
        }
        mealsByDate[ret.date].push(ret)
        return null
      })

      if (mealDate) {
        let indexOfMealDate = 0
        Object.keys(mealsByDate).map((date, i) => {
          if (date === mealDate) {
            indexOfMealDate = i
          }
          return null
        })
        setValue(indexOfMealDate)
        setMealsByDateState(mealsByDate)
      }

      if (!mealDate && retreat.meals.length !== 0) {
        const firstMealDate = Object.keys(mealsByDate)[0]
        setPathMealDate(firstMealDate)
      }
    }
  }, [retreat, mealDate, setPathMealDate]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  }
  console.log("SHOW RETREATS", props)

  return (
    <div>
      {(!isLoading && !error) && (
        <>
          <h2>{retreat.name}</h2>
          <div><Button color="primary" onClick={() => {
            setNewMealOpen(true)
          }}>New meal</Button></div>
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
              {retreat.meals && Object.entries(mealsByDateState).map(([mealDate, meals], i) => (
                <Tab label={`${mealDate} (${meals.length})`}
                  id={`vertical-tab-${i}`}
                  key={`vertical-tab-${i}`}
                  onClick={() => setPathMealDate(mealDate)}
                />
              ))}
            </Tabs>

            {retreat.meals && Object.entries(mealsByDateState).map(([date, meals], i) => (
              <TabPane
                key={`tab-pane-key-${i}`}
                className={classes.tabPane}
                value={value}
                index={i}>
                {meals.map((meal, i) => <div className={classes.div} key={`paper-meal-${i}`}>
                  <Paper variant="outlined" square>
                    <DishExpansionPanel
                      dishes={meal.dishes}
                      mealType={meal.type}
                      mealId={meal.id}
                      mealDate={meal.date}
                      servings={meal.servings}
                      retreatId={id} />
                  </Paper>
                </div>)}
              </TabPane>
            ))}

          </div>
        </>
      )}

      {isLoading && <CircularProgress />}
      {(!isLoading && error) && <Error error={error} />}
      {
        <DialogAddMeal
          retreatId={id}
          newMealOpen={newMealOpen}
          setNewMealOpen={setNewMealOpen}
          mealDate={mealDate}
        />
      }
    </div>
  )
}

export default ShowRetreat
