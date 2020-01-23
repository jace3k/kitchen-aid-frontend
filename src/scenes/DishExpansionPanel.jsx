import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDishesForMeal } from '../services/store/actions/dishesActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import Error from './Error'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

// const DishPanel({dish})

export default function DishExpansionPanel({ mealId }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { dishes, isLoading, error } = useSelector(state => state.dishes)
  useEffect(() => {
    console.log('USE EFFECT: DishExpansionPanel ')
    dispatch(fetchDishesForMeal(mealId))
  }, [dispatch, mealId])

  return (
    <div style={{ padding: '0.5em', width: '100%' }}>

      {(!isLoading && !error) && (
        dishes.map((dish, i) => (
          <ExpansionPanel elevation={3} key={`expansion-panel-dish-key-${i}`}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{dish.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Size: {dish.size}
                <br />

          </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))
      )}
      {isLoading && <CircularProgress />}
      {(!isLoading && error) && <Error error={error} />}
      {(!isLoading && !error && dishes.length === 0) && <div>No dishes yet.</div>}
    </div>
  )
}
