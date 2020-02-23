import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Button, Grid, Paper, TextField, IconButton, ButtonGroup, Popover } from '@material-ui/core'
import { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import CakeIcon from '@material-ui/icons/AddBox'
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
  'BR': 'Śniadanie',
  'LU': 'Obiad',
  'FE': 'Kolacja',
}

export default function DishExpansionPanel({ mealType, mealId, servings, mealDate, retreatId, openIngredientsPanel }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [addDishVisible, setAddDishVisible] = useState(false)
  const [areYouSureRemoveMeal, setAreYouSureRemoveMeal] = useState(false)
  const [servingsOpened, setServingsOpened] = useState(null)
  const [servingsValue, setServingsValue] = useState(servings)
  const [addDishName, setAddDishName] = useState("")
  const [addDishSize, setAddDishSize] = useState("")
  const createdDish = useSelector(state => state.dishes.createdDish)
  const dishes = useSelector(state => state.dishes.dishes[mealId])
  const dishLoading = useSelector(state => state.dishes.isLoading)

  useEffect(() => {
    dispatch(fetchDishesForMeal(mealId))
  }, [dispatch, mealId, createdDish])

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
  const handleOpenIngredientsSidePanel = dish => openIngredientsPanel(dish)

  return (
    <div style={{ width: '100%' }}>
      <Grid container alignItems="center">
        <Grid item sm={4}>
          <h3>{`${mealTypeMap[mealType]}`}</h3>
        </Grid>
        <Grid item sm={4}>
          <Button color="default" onClick={(e) => {
            setServingsOpened(e.currentTarget)
          }}>Porcje: {servings}</Button>

          <Popover
            open={!!servingsOpened}
            anchorEl={servingsOpened}
            onClose={handleCloseServingsEdit}
          >
            <TextField
              size="small"
              label="Porcje"
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
              <Button onClick={handleRemoveMeal}>Tak</Button>
              <Button onClick={() => setAreYouSureRemoveMeal(false)}>Nie</Button>
            </ButtonGroup>
          )}

          {(!addDishVisible && !areYouSureRemoveMeal) && (
            <ButtonGroup size="small" variant="text">
              <Button size="small" onClick={() => setAddDishVisible(true)}>
                <CakeIcon />
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
            <Grid item xs={6} onClick={() => handleOpenIngredientsSidePanel(dish)}>
              <Typography>{dish.name}</Typography>
            </Grid>
            <Grid item xs={4} onClick={() => handleOpenIngredientsSidePanel(dish)}>
              <Typography color="textSecondary">Rozmiar: {dish.size}</Typography>
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
                  label="Nazwa dania"
                  variant="outlined"
                  size="small"
                  value={addDishName}
                  onChange={handleChangeAddDishName}
                />
              </Grid>
              <Grid item sm={4} className={classes.addNewDish}>
                <TextField
                  label="Rozmiar"
                  variant="outlined"
                  size="small"
                  value={addDishSize}
                  onChange={handleChangeAddDishSize}
                  type="number"
                />
              </Grid>
              <Grid item sm={4} className={classes.addNewDish}>
                <Button variant="outlined" disabled={dishLoading} onClick={handleAddDish}>Dodaj</Button>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  )
}
