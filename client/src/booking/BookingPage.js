import React from 'react'
import { connect } from 'react-redux'
import { getAllBookings } from '../../selectors/bookingsSelectors'
import styles from './BookingPage.sass'
import propTypes from 'prop-types'
import BookingForms from './BookingForms'
import { Steps } from 'antd'
const Step = Steps.Step

class BookingPage extends React.Component {

  static propTypes = {
    bookings: propTypes.array
  }

  renderSteps = () => {
    return (
      <div className={styles.stepContainer}>
        <Steps current={1}>
          <Step title='job' description='job information' />
          <Step title='info' description='rooms, dates, etc' />
          <Step title='confirm' description='confirm job' />
        </Steps>
      </div>
    )
  }
  render () {
    return (
      <div className={styles.container}>
        <h1>New booking</h1>
        <h4 className={styles.subTitle}>job_id Q0000001</h4>
        {this.renderSteps()}
        <BookingForms />
      </div>
    )
  }
}
export default connect(getAllBookings)(BookingPage)
