import React, { Component } from 'react'
import * as Backend from '../../backend'
import propTypes from 'prop-types'
import './global.sass'

class InitialProvider extends Component {
  static propTypes = {
    children: propTypes.node
  }

  componentDidMount () {
    Backend.initSocketConnection({
      onConntected: this.onConntected
    })
  }

  onConntected = () => {

  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default InitialProvider
