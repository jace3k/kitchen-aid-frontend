import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRetreats } from '../services/store/actions/retreatsActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Card, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  clean: {
    textDecoration: 'none',
    color: 'inherit'
  },
  flex1: {
    flex: 1
  }
});

const RetreatListItem = ({ retreat }) => {
  const classes = useStyles()
  return (
    <Link to={`/retreat/${retreat.id}`} className={classes.clean} key={`retreat-list-item-${retreat.id}`}>
      <Card style={{ padding: '1em', margin: '1em', cursor: 'pointer' }}>
        <Typography><b>{retreat.name}</b> Meals: {retreat.meals.length} Carts: {retreat.carts.length}</Typography>
      </Card>
    </Link>
  )
}


class Home extends Component {
  componentDidMount() {
    // if (!this.props.retreatsState.retreats) {
    this.props.fetchRetreats()
    // }
    // else {
    //   console.log('Already loaded.')
    // }
  }
  render() {
    console.log('PROPS', this.props)
    const { isLoading, retreats, error } = this.props.retreatsState

    const retreatsListItems = retreats
      ? retreats.data.map(retreat => <RetreatListItem retreat={retreat} />)
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  retreatsState: state.retreats
})

const mapDispatchToProps = ({
  fetchRetreats
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
