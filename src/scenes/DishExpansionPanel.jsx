import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'
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
    flexBasis: '50%',
  }
}));

const mealTypeMap = {
  'BR': 'Breakfast',
  'LU': 'Lunch',
  'FE': 'Feast',
}

export default function DishExpansionPanel({ dishes, mealType }) {
  const classes = useStyles()

  return (
    <div style={{ width: '100%' }}>
      <h3>{mealTypeMap[mealType]}</h3>
      {dishes.map((dish, i) => (
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
      ))}
    </div>
  )
}
