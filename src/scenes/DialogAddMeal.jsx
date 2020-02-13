import React, { useState } from 'react'
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, TextField, ButtonGroup, Grid, makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { createMeal } from '../services/store/actions/mealsActions'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%'
  },
  gridItem: {
    // border: '1px solid black'
  },
  servingsInput: {
    width: '7em'
  }
}))

export default function DialogAddMeal({ newMealOpen, setNewMealOpen, mealDate, retreatId }) {
  const classes = useStyles()
  const [selectedType, setSelectedType] = useState('BR')
  const [selectedDate, setSelectedDate] = useState(mealDate ? mealDate : new Date().toISOString().split('T')[0])
  const [selectedServings, setSelectedServings] = useState(1)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (selectedDate && mealDate && (selectedDate !== mealDate)) {
  //     setSelectedDate(mealDate)
  //   }
  // }, [mealDate, selectedDate])

  const handleSelectType = type => setSelectedType(type)
  const isThisType = type => type === selectedType ? 'contained' : 'outlined'
  const handleChangeDate = e => setSelectedDate(e.target.value)
  const handleChangeServings = e => setSelectedServings(e.target.value)

  const handleClose = () => setNewMealOpen(false)
  const handleCreate = () => {
    dispatch(createMeal({
      type: selectedType,
      date: selectedDate,
      servings: selectedServings,
      retreat: retreatId,
    }))
    handleClose()
  }

  return (
    <div>
      <Dialog
        open={newMealOpen}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth={true}
      >
        <DialogTitle>
          New meal
          </DialogTitle>
        <DialogContent>
          <Grid container alignItems="center" justify="center" spacing={2}>
            <Grid item sm={12} className={classes.gridItem}>
              <ButtonGroup color="primary">
                <Button variant={isThisType('BR')} onClick={() => handleSelectType('BR')}>Breakfast</Button>
                <Button variant={isThisType('LU')} onClick={() => handleSelectType('LU')}>Lunch</Button>
                <Button variant={isThisType('FE')} onClick={() => handleSelectType('FE')}>Feast</Button>
              </ButtonGroup>
            </Grid>
            <Grid item sm={6}>
              <TextField
                label={"Date"}
                // defaultValue={mealDate}
                value={selectedDate}
                onChange={handleChangeDate}
                className={classes.textField}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                label={"Servings"}
                value={selectedServings}
                onChange={handleChangeServings}
                type="number"
                className={classes.servingsInput}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleCreate}>Create</Button>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
