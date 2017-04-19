import React from 'react'
import { connect } from 'react-redux'
import { setCurrentUser } from '../actions/user'
import { getCurrentUser } from '../selectors/user'
import styles from './HomePage.sass'
class HomePage extends React.Component {

  static propTypes = {
    user: React.PropTypes.string,
    setCurrentUser: React.PropTypes.func
  }

  onButtonClick = () => {
    this.props.setCurrentUser('me')
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
