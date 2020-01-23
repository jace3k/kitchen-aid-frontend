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
import Divider from '@material-ui/core/Divider'
import Error from './Error'
import IngredientsTable from './IngredientsTable'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansionPanel: {
    // marginBottom: '1em'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
    margin: 0,
    padding: 0,
  },
  column: {
    flexBasis: '33.33%',
  }
}));

const mealTypeMap = {
  'BR': 'Breakfast',
  'LU': 'Lunch',
  'FE': 'Feast',
}

export default function DishExpansionPanel({ mealId, mealType, mealDate }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { dishes, isLoading, error } = useSelector(state => state.dishes)
  useEffect(() => {
    dispatch(fetchDishesForMeal(mealId))
  }, [dispatch, mealId])

  return (
    <div style={{ width: '100%' }}>
      <h3>{mealTypeMap[mealType]} dishes for {mealDate}</h3>
      {(!isLoading && !error) && (
        dishes.map((dish, i) => (
          <ExpansionPanel elevation={2}
            key={`expansion-panel-dish-key-${i}`}
            className={classes.expansionPanel}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className={classes.column}>
                <Typography className={classes.heading}>{dish.name}</Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>Size: {dish.size}</Typography>
              </div>
            </ExpansionPanelSummary>
            <Divider />
            <ExpansionPanelDetails className={classes.details}>
              <IngredientsTable ingredients={dish.ingredients} dishId={dish.id} />
            </ExpansionPanelDetails>
            <Divider />
          </ExpansionPanel>
        ))
      )}
      {isLoading && <CircularProgress />}
      {(!isLoading && error) && <Error error={error} />}
      {(!isLoading && !error && dishes.length === 0) && <div>No dishes yet.</div>}
    </div>
  )
}
