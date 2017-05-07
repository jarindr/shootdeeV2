import React from 'react'
import { connect } from 'react-redux'
import { getAllBookings } from '../../selectors/bookings'
import styles from './BookingPage.sass'
import propTypes from 'prop-types'
class BookingPage extends React.Component {

  static propTypes = {
    bookings: propTypes.string
  }

  render () {
    return (
      <div className={styles.container}>
        <h1>{this.props.bookings ? this.props.bookings[0].bookingId : null }</h1>
      </div>
    )
  }
}

export default connect(getAllBookings)(BookingPage)
