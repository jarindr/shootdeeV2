import React from 'react'
import styles from './BookingPage.sass'
import propTypes from 'prop-types'
import RoomTabs from './RoomTabs'
import JobInformationForms from './JobInformationForms'
import { Steps, Button, Icon } from 'antd'
import { connect } from 'react-redux'
import { saveUnfinshedBooking } from '../../actions/bookingUnfinishedActions'
import { selectGetBookingUnfinishedById } from '../../selectors/bookingUnfinishedSelectors'
const Step = Steps.Step
import { withRouter } from 'react-router-dom'
class BookingPage extends React.Component {

  static propTypes = {
    step: propTypes.number,
    saveUnfinshedBooking: propTypes.func,
    selectBookingUnfinishedById: propTypes.object,
    history: propTypes.object,
    match: propTypes.object
  }

  onClickStep = (route) => {
    return (e) => {
      this.props.history.push(route)
    }
  }

  renderPageStep = () => {
    const { page } = this.props.match.params
    switch (page) {
      case 'rooms':
        return (
          <RoomTabs
            saveUnfinshedBooking={this.props.saveUnfinshedBooking}
            selectBookingUnfinishedById={this.props.selectBookingUnfinishedById}
          />
        )

      case 'job':
        return (
          <JobInformationForms
            saveUnfinshedBooking={this.props.saveUnfinshedBooking}
          />)

      default:
        return null
    }
  }

  renderSteps = () => {
    const { page } = this.props.match.params
    const pageIndex = {
      job: 0,
      rooms: 1
    }

    return (
      <div className={styles.stepContainer}>
        <Steps current={pageIndex[page]}>
          <Step
            title={<span onClick={this.onClickStep('/booking/job/')}>job</span>}
            description={<span onClick={this.onClickStep('/booking/job/')}>job information</span>}
            icon={<Icon type='solution' onClick={this.onClickStep('/booking/job/')} />}
          />
          <Step
            title={<span onClick={this.onClickStep('/booking/rooms/')}>rooms</span>}
            description={<span onClick={this.onClickStep('/booking/rooms/')}>rooms, dates</span>}
            icon={<Icon type='switcher' onClick={this.onClickStep('/booking/rooms/')} />}
          />
          <Step
            title={<span onClick={this.onClickStep(2)}>confirm</span>}
            description={<span onClick={this.onClickStep(2)}>confirm job</span>}
            icon={<Icon type='check' onClick={this.onClickStep(2)} />}
          />
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
            <Button type='primary' icon='select' className={styles.submitButton}>Submit</Button>
          </div>
        </div>
        {this.renderSteps()}
        {this.renderPageStep()}
        <Button.Group className={styles.stepNavigationButtons}>
          <Button type='primary'>
            <Icon type='left' title='hello' />previous
              </Button>
          <Button type='primary'>
            next<Icon type='right' />
          </Button>
        </Button.Group>
      </div>
    )
  }
}

export default withRouter(connect(state => ({
  selectBookingUnfinishedById: selectGetBookingUnfinishedById(state)
}
),
  { saveUnfinshedBooking })(BookingPage))
