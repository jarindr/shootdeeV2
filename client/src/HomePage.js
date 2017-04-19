import React from 'react'
import { connect } from 'react-redux'
import { setCurrentUser } from '../actions/user'
import { getUser } from '../selectors/user'
class HomePage extends React.Component {
  render () {
    return (
      <div>
        <h1>Hello it is so good development so far wow this is it</h1>
      </div>
    )
  }
}

export default connect(getUser, { setCurrentUser })(HomePage)
