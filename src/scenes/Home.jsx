import React, { Component } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchRetreats, updateRetreat, deleteRetreat, clearCreatedRetreat } from '../services/store/actions/retreatsActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Card, Typography, Button, CardContent, CardActions, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import { useEffect } from 'react'

const useStyles = makeStyles({
  clean: {
    textDecoration: 'none',
    color: 'inherit'
  },
  flex1: {
    flex: 1
  },
  retreatCard: {
    padding: '1em',
    margin: '1em',
    cursor: 'pointer',
    width: '22em',
    float: 'left',
  },
});


const EditInput = ({ name, handleChange, updateClick }) => {
  return (
    <form onSubmit={e => {
      e.preventDefault()
      updateClick()
    }}>
      <TextField
        label="Nazwa"
        value={name}
        onChange={handleChange}
      />
    </form>
  )
}

const RetreatListItem = ({ retreat, handleOpenDialog }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const createdRetreat = useSelector(state => state.retreats.createdRetreat)
  const [editMode, setEditMode] = useState(false)

  const [currentName, setCurrentName] = useState(retreat.name)

  const handleEditInputChange = event => {
    setCurrentName(event.target.value)
  }

  const updateClick = () => {
    setEditMode(false)
    dispatch(updateRetreat(retreat.id, currentName))
  }

  useEffect(() => {
    if (createdRetreat) {
      dispatch(clearCreatedRetreat())
      dispatch(fetchRetreats())
    }
  }, [createdRetreat, dispatch])

  return (
    <Card className={classes.retreatCard}>
      <CardContent>
        {editMode ? <EditInput name={currentName} handleChange={handleEditInputChange} updateClick={updateClick} /> : <Link to={`/retreat/${retreat.id}`} className={classes.clean}>
          <Typography variant="h5" component="h2">
            {retreat.name}
          </Typography>
          <Typography color="textSecondary">
            Posiłki: {retreat.meals.length}
          </Typography>
          <Typography color="textSecondary">
            Koszyki: {retreat.carts.length}
          </Typography>
        </Link>}
      </CardContent>
      <Divider />
      <CardActions>
        {
          editMode
            ? (
              <>
                <Button size="small" color="primary" onClick={updateClick}>Ok</Button>
                <Button size="small" color="secondary" onClick={() => setEditMode(false)}>Anuluj</Button>
              </>
            )
            : <Button size="small" color="default" onClick={() => setEditMode(true)}>Edytuj</Button>
        }
        <Button size="small" color="secondary" onClick={handleOpenDialog}>Usuń</Button>
      </CardActions>
    </Card>
  )
}


class Home extends Component {
  state = { dialogOpen: false, retreatToBeDeleted: null }
  componentDidMount() {
    // if (!this.props.retreatsState.retreats) {
    this.props.fetchRetreats()
    // }
    // else {
    //   console.log('Already loaded.')
    // }
  }

  render() {
    const { isLoading, retreats, error, createdRetreat } = this.props.retreatsState
    console.log('RETREATS STORE', this.props.retreatsState)
    const { dialogOpen, retreatToBeDeleted } = this.state
    const { clearCreatedRetreat, deleteRetreat, fetchRetreats } = this.props

    if (createdRetreat) {
      clearCreatedRetreat()
      fetchRetreats()
    }

    const dialogHandleClose = () => this.setState({ dialogOpen: false })

    const retreatsListItems = retreats
      ? retreats.map(retreat => <RetreatListItem retreat={retreat} key={`rrr-${retreat.id}`} handleOpenDialog={() => this.setState({ dialogOpen: true, retreatToBeDeleted: retreat.id })} />)
      : null

    const retreatsComponent = (
      <div>
        {
          error ? <div>{error}</div> : retreatsListItems
        }
      </div>
    )
    return (
      <div>
        {
          isLoading ? <CircularProgress disableShrink /> : retreatsComponent
        }
        <Dialog
          open={dialogOpen}
          onClose={dialogHandleClose}
        >
          <DialogTitle>
            Jesteś pewien?
          </DialogTitle>
          <DialogContent>
            Retreat zostanie usunięty bezpowrotnie.
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => {
              deleteRetreat(retreatToBeDeleted)
              dialogHandleClose()
            }}>
              OK
            </Button>
            <Button color="secondary" onClick={dialogHandleClose}>
              Anuluj
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  retreatsState: state.retreats
})

const mapDispatchToProps = ({
  fetchRetreats,
  updateRetreat,
  deleteRetreat,
  clearCreatedRetreat,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
