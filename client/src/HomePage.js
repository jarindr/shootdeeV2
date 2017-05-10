import React from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../selectors/userSelectors'
import { setCurrentUser } from '../actions/userActions'
import styles from './HomePage.sass'
import propTypes from 'prop-types'
class HomePage extends React.Component {

  static propTypes = {
    user: propTypes.string,
    setCurrentUser: propTypes.func
  }

  onButtonClick = () => {
    this.props.setCurrentUser('okay')
  }

  render () {
    return (
      <div className={styles.container}>
        <h1>{this.props.user.userId}</h1>
        <button onClick={this.onButtonClick}>CLICK ME BISH</button>
      </div>
    )
  }
}

export default connect(getCurrentUser, { setCurrentUser })(HomePage)
