import React from 'react'
import { connect } from 'react-redux'
import { getAllBookings } from '../../selectors/bookingsSelectors'
import styles from './BookingPage.sass'
import propTypes from 'prop-types'
import BookingForms from './BookingForms'
import { Steps, Button, Icon } from 'antd'
const Step = Steps.Step

class BookingPage extends React.Component {

  static propTypes = {
    bookings: propTypes.array
  }

  renderSteps = () => {
    return (
      <div className={styles.stepContainer}>
        <Steps current={0}>
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
        <div className={styles.topSectionContainer}>
          <div className={styles.titleContainer}>
            <h1>New booking</h1>
            <h4 className={styles.subTitle}>quotation: Q0000001</h4>
          </div>
          <div className={styles.stepNavigationContainer}>
            <Button.Group>
              <Button type='primary'>
                <Icon type='left' title='hello' />previous
              </Button>
              <Button type='primary'>
              next<Icon type='right' />
              </Button>
            </Button.Group>
          </div>
        </div>
        {this.renderSteps()}
        <BookingForms />
        <Button type='primary' icon='select' className={styles.submitButton}>Submit</Button>
      </div>
    )
  }
}
export default connect(getAllBookings)(BookingPage)
