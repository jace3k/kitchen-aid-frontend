import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IngredientsTable from './IngredientsTable'
import { Button, Grid, Paper, TextField, Dialog, DialogTitle, DialogContent, IconButton, ButtonGroup, Popover } from '@material-ui/core'
import { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import CakeIcon from '@material-ui/icons/Cake'
import TrashIcon from '@material-ui/icons/Delete'


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
  },
  addNewDish: {
    padding: '.5em'
  },
  dishPaper: {
    padding: '1em',
    margin: '.5em',
  },
  servingsEdit: {
    margin: '1.2em',
    width: '6em'
  }
}));

const mealTypeMap = {
  'BR': 'Breakfast',
  'LU': 'Lunch',
  'FE': 'Feast',
}

export default function DishExpansionPanel({ dishes, mealType, mealId, servings }) {
  const classes = useStyles()
  const [addDishVisible, setAddDishVisible] = useState(false)
  const [ingredientsModalVisible, setIngredientsModalVisible] = useState(false)
  const [areYouSureRemoveMeal, setAreYouSureRemoveMeal] = useState(false)
  const [servingsOpened, setServingsOpened] = useState(null)
  const [currentDish, setCurrentDish] = useState({})
  const [servingsValue, setServingsValue] = useState(servings)

  const openDishModal = (dish) => {
    setCurrentDish(dish)
    setIngredientsModalVisible(true)
  }

  const handleCloseServingsEdit = e => {
    setServingsOpened(null)
    // put to the backend here{servingsValue}
  }

  const handleChangeServingsEdit = e => {
    setServingsValue(e.target.value)
  }

  return (
    <div style={{ width: '100%' }}>
      <Grid container alignItems="center">
        <Grid item sm={4}>
          <h3>{`${mealTypeMap[mealType]}`}</h3>
        </Grid>
        <Grid item sm={4}>
          <Button color="textSecondary" onClick={(e) => {
            setServingsOpened(e.currentTarget)
          }}>Servings: {servings}</Button>
          <Popover
            open={!!servingsOpened}
            anchorEl={servingsOpened}
            onClose={handleCloseServingsEdit}
          >
            <TextField
              size="small"
              label="Servings"
              variant="outlined"
              className={classes.servingsEdit}
              value={servingsValue}
              onChange={handleChangeServingsEdit}
              type="number"
            />
          </Popover>
        </Grid>
        <Grid item sm={4}>
          {addDishVisible && <Button size="small" color="secondary" variant="text" onClick={() => setAddDishVisible(false)}>Nope</Button>}
          {areYouSureRemoveMeal && (
            <ButtonGroup size="small" variant="text" color="secondary">
              <Button onClick={() => setAreYouSureRemoveMeal(false)}>Yes</Button>
              <Button onClick={() => setAreYouSureRemoveMeal(false)}>No</Button>
            </ButtonGroup>
          )}

          {(!addDishVisible && !areYouSureRemoveMeal) && (
            <ButtonGroup size="small" variant="text">
              <Button size="small" onClick={() => setAddDishVisible(true)}>
                +<CakeIcon />
              </Button>
              <Button onClick={() => setAreYouSureRemoveMeal(true)}>
                <TrashIcon />
              </Button>
            </ButtonGroup>
          )
          }
        </Grid>
      </Grid>

      {dishes.map((dish, i) => (
        <Paper
          className={"paperDish"}
          variant="outlined"
        >
          <Grid container alignItems="center">
            <Grid item xs={6} onClick={() => openDishModal(dish)}>
              <Typography>{dish.name}</Typography>
            </Grid>
            <Grid item xs={4} onClick={() => openDishModal(dish)}>
              <Typography color="textSecondary">Size: {dish.size}</Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton size="small">
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}

      {addDishVisible && (
        <div>
          <Paper>
            <Grid container alignItems="center">
              <Grid item sm={4} className={classes.addNewDish}>
                <TextField label="Dish name" variant="outlined" size="small" />
              </Grid>
              <Grid item sm={4} className={classes.addNewDish}>
                <TextField label="Size" variant="outlined" size="small" />
              </Grid>
              <Grid item sm={4} className={classes.addNewDish}>
                <Button variant="outlined">Add</Button>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}

      <div>
        <Dialog
          open={ingredientsModalVisible}
          onClose={() => setIngredientsModalVisible(false)}
        >
          <DialogTitle>
            Ingredients
            </DialogTitle>
          <DialogContent>
            <IngredientsTable ingredients={currentDish.ingredients} dishId={currentDish.id} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
