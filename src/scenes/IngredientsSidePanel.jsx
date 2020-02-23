import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, IconButton } from '@material-ui/core'
import MaterialTable from 'material-table'
import CloseIcon from '@material-ui/icons/DoubleArrowRounded'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIngredientsForDish, createIngredient, updateIngredient, deleteIngredient } from '../services/store/actions/ingredientsActions'

const columns = [
  { title: 'Nazwa', field: 'name' },
  { title: 'Margines', field: 'margin', type: 'numeric' },
  { title: 'Część', field: 'part', type: 'numeric' },
  { title: 'Całość', field: 'calculated_total', type: 'numeric', editable: 'never' }
  // {
  //   title: 'Birth Place',
  //   field: 'birthCity',
  //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
  // },
]

const useStyles = makeStyles(theme => ({
  root: {
    width: '80em',
    minWidth: '40em',
  },
  paper: {
    height: '100%',
    borderTop: '0',
    borderBottom: '0'
  },
  width100: {
    width: '90%',
    margin: '1em auto',
    height: '100%',
  },
  borderTop: {
    borderTop: '1px solid #f0f0f0'
  }
}))

export default function IngredientsSidePanel({ open, handleClose, dish }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const ingredientsState = useSelector(state => state.ingredients)
  console.log('ingredientsState', ingredientsState)
  useEffect(() => {
    if (open) dispatch(fetchIngredientsForDish(dish.id))
  }, [open, dish.id, dispatch])

  if (!open) return null
  return (
    <div className={classes.root}>
      <Paper square variant="outlined" className={classes.paper}>
        <Grid container alignItems="center">
          <Grid item md={2}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item md={8}>
            <h4>{dish.name}</h4>
          </Grid>
          <Grid item md={2}>
            {/* <h5>Options</h5> */}
          </Grid>
          <Grid item md={12} className={classes.borderTop}>
            <div className={classes.width100}>
              <MaterialTable
                title={"Składniki"}
                isLoading={ingredientsState.isLoading}
                options={{
                  search: false,
                  toolbar: true
                }}
                columns={columns}
                data={ingredientsState.ingredients}
                editable={{
                  onRowAdd: newData => {
                    const newIngredient = {
                      name: newData.name,
                      dish: dish.id,
                      margin: parseInt(newData.margin),
                      part: parseInt(newData.part)
                    }
                    return new Promise((resolve, reject) => {
                      dispatch(createIngredient(newIngredient))
                      resolve()
                    })
                  },
                  onRowUpdate: (newData, oldData) => {
                    return new Promise((resolve, reject) => {
                      dispatch(updateIngredient(oldData.id, {
                        name: newData.name,
                        margin: newData.margin,
                        part: newData.part,
                        dish: dish.id
                      }))
                      resolve()
                    })
                  },
                  onRowDelete: oldData => {
                    return new Promise((resolve, reject) => {
                      dispatch(deleteIngredient(oldData.id))
                      resolve()
                    })
                  }
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
