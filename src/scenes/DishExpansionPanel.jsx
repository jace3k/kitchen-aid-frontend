import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IngredientsTable from './IngredientsTable'
import { Button, Grid, Paper, TextField, Dialog, DialogTitle, DialogContent, IconButton, ButtonGroup, Popover } from '@material-ui/core'
import { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import CakeIcon from '@material-ui/icons/Cake'
import TrashIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMeal, updateMealServings } from '../services/store/actions/mealsActions'
import { createDish, fetchDishesForMeal, deleteDish } from '../services/store/actions/dishesActions'
import { useEffect } from 'react'


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

export default function DishExpansionPanel({ mealType, mealId, servings, mealDate, retreatId }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [addDishVisible, setAddDishVisible] = useState(false)
  const [ingredientsModalVisible, setIngredientsModalVisible] = useState(false)
  const [areYouSureRemoveMeal, setAreYouSureRemoveMeal] = useState(false)
  const [servingsOpened, setServingsOpened] = useState(null)
  const [currentDish, setCurrentDish] = useState({})
  const [servingsValue, setServingsValue] = useState(servings)
  const [addDishName, setAddDishName] = useState("")
  const [addDishSize, setAddDishSize] = useState("")
  const createdDish = useSelector(state => state.dishes.createdDish)
  const dishes = useSelector(state => state.dishes.dishes[mealId])
  const dishLoading = useSelector(state => state.dishes.isLoading)
  console.log('dishes', dishes, dishLoading)

  useEffect(() => {
    dispatch(fetchDishesForMeal(mealId))
  }, [dispatch, mealId, createdDish])

  const openDishModal = (dish) => {
    setCurrentDish(dish)
    setIngredientsModalVisible(true)
  }

  const handleCloseServingsEdit = e => {
    setServingsOpened(null)
    dispatch(updateMealServings(mealId, {
      servings: servingsValue,
      date: mealDate,
      type: mealType,
      retreat: retreatId,
    }))
  }

  const handleChangeServingsEdit = e => {
    setServingsValue(e.target.value)
  }

  const handleRemoveMeal = () => {
    setAreYouSureRemoveMeal(false)
    dispatch(deleteMeal(mealId))
  }

  const handleAddDish = () => {
    dispatch(createDish({
      meal: mealId,
      name: addDishName,
      size: addDishSize,
    }))
  }

  const handleRemoveDish = (id) => {
    dispatch(deleteDish(id))
  }

  const handleChangeAddDishName = e => setAddDishName(e.target.value)
  const handleChangeAddDishSize = e => setAddDishSize(e.target.value)

  return (
    <div style={{ width: '100%' }}>
      <Grid container alignItems="center">
        <Grid item sm={4}>
          <h3>{`${mealTypeMap[mealType]}`}</h3>
        </Grid>
        <Grid item sm={4}>
          <Button color="default" onClick={(e) => {
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
              <Button onClick={handleRemoveMeal}>Yes</Button>
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
      {dishes && dishes.map((dish, i) => (
        <Paper
          className={"paperDish"}
          variant="outlined"
          key={`dishes-paper-key-${i}`}
        >
          <Grid container alignItems="center">
            <Grid item xs={6} onClick={() => openDishModal(dish)}>
              <Typography>{dish.name}</Typography>
            </Grid>
            <Grid item xs={4} onClick={() => openDishModal(dish)}>
              <Typography color="textSecondary">Size: {dish.size}</Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton size="small" onClick={() => handleRemoveDish(dish.id)}>
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
                <TextField
                  label="Dish name"
                  variant="outlined"
                  size="small"
                  value={addDishName}
                  onChange={handleChangeAddDishName}
                />
              </Grid>
              <Grid item sm={4} className={classes.addNewDish}>
                <TextField
                  label="Size"
                  variant="outlined"
                  size="small"
                  value={addDishSize}
                  onChange={handleChangeAddDishSize}
                  type="number"
                />
              </Grid>
              <Grid item sm={4} className={classes.addNewDish}>
                <Button variant="outlined" disabled={dishLoading} onClick={handleAddDish}>Add</Button>
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
