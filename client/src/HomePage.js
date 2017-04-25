import React from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../selectors/user'
import { setCurrentUser } from '../actions/user'
import styles from './HomePage.sass'
import propTypes from 'prop-types'
class HomePage extends React.Component {

  static propTypes = {
    user: propTypes.string,
    setCurrentUser: propTypes.func
  }

  onButtonClick = () => {
    fetch('http://localhost:3000/api/bookings/', { method: 'POST' })
      .then(response => {
        if (response.status === 200) {
          this.props.setCurrentUser('okay')
        }
      })
  }

  render () {
    return (
      <div className={styles.container}>
        <h1>{this.props.user}</h1>
        <button onClick={this.onButtonClick}>CLICK ME BISH</button>
      </div>
    )
  }
}

export default connect(getCurrentUser, { setCurrentUser })(HomePage)
