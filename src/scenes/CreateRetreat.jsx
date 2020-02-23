import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { createRetreat, clearCreatedRetreat } from '../services/store/actions/retreatsActions'
import { Redirect } from 'react-router-dom'


class CreateRetreat extends Component {
  state = {
    retreatName: ''
  }

  handleChange = (e) => {
    this.setState({ retreatName: e.target.value })

  }

  handleSubmit = () => {
    const { retreatName } = this.state
    this.props.createRetreat(retreatName)
  }

  render() {
    const { isLoading } = this.props.retreatsState
    if (this.props.retreatsState.createdRetreat) {
      this.props.clearCreatedRetreat()
      return <Redirect to="/" />
    }
    return (
      <div>
        <h3>Uwtórz nowy Retreat</h3>
        <div>
          <TextField id="standard-basic" label="Nazwa" variant="outlined" onChange={this.handleChange} />
        </div>
        <br />
        <div>
          <Button 
            onClick={this.handleSubmit} 
            disabled={this.state.retreatName === '' || isLoading}
            type="submit"
            >Utwórz</Button>
        </div>


      </div>
    )
  }
}

const mapStateToProps = state => ({
  retreatsState: state.retreats
})

const mapDispatchToProps = ({
  createRetreat,
  clearCreatedRetreat
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateRetreat);
