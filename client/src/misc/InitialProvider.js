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
    console.log('websocket connected.')
  }

  render () {
    return React.Children.only(this.props.children)
  }
}

export default InitialProvider
