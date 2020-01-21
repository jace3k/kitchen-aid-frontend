import React, { Component } from 'react'

export default class ShowReteat extends Component {
  
  
  render() {

    const { id } = this.props.match.params
    console.log(id)
    return (
      <div>
        SHOW RETREAT {id}
      </div>
    )
  }
}
