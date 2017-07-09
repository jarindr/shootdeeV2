import { Button, Icon, Steps } from 'antd'
import { Route, withRouter } from 'react-router-dom'
import ConfirmJob from './ConfirmJob'
import JobInformationForms from './JobInformationForms'
import React from 'react'
import RoomTabs from './RoomTabs'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { saveUnfinshedBooking, addBookingRoom } from '../../actions/bookingUnfinishedActions'
import {
  selectGetBookingUnfinishedById,
  selectbookingUnfinished
} from '../../selectors/bookingUnfinishedSelectors'
import styles from './BookingPage.sass'
import { submitJob } from '../../actions/jobUnfinishedActions'
import { compose } from 'recompose'
const Step = Steps.Step

const enhance = compose(
  withRouter,
  connect(state => ({
    selectBookingUnfinishedById: selectGetBookingUnfinishedById(state),
    bookingUnfinished: selectbookingUnfinished(state)
  }),
    { saveUnfinshedBooking, submitJob, addBookingRoom })
)

class BookingPage extends React.Component {

  static propTypes = {
    saveUnfinshedBooking: propTypes.func,
    selectBookingUnfinishedById: propTypes.func,
    bookingUnfinished: propTypes.object,
    submitJob: propTypes.func,
    addBookingRoom: propTypes.func,
    history: propTypes.object,
    location: propTypes.object
  }
  onClickStep = (route) => {
    return (e) => {
      this.props.history.push(route)
    }
  }

  renderRoomTabs = () => {
    return (
      <RoomTabs
        bookingUnfinished={this.props.bookingUnfinished}
        saveUnfinshedBooking={this.props.saveUnfinshedBooking}
        selectBookingUnfinishedById={this.props.selectBookingUnfinishedById}
        addBookingRoom={this.props.addBookingRoom}
      />
    )
  }

  renderJobInformation = () => {
    return (
      <JobInformationForms
        saveUnfinshedBooking={this.props.saveUnfinshedBooking}
      />
    )
  }

  renderConfirm = () => {
    return (
      <ConfirmJob
        bookingUnfinished={this.props.bookingUnfinished}
      />
    )
  }

  renderPageStep = () => {
    return (
      <div>
        <Route render={this.renderRoomTabs} path='/booking/rooms/' />
        <Route render={this.renderJobInformation} path='/booking/job/' />
        <Route render={this.renderConfirm} path='/booking/confirm/' />
      </div>
    )
  }

  renderSteps = () => {
    const page = this.props.location.pathname
    const pageIndex = {
      '/booking/job/': 0,
      '/booking/rooms/': 1,
      '/booking/confirm/': 2
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
            title={<span onClick={this.onClickStep('/booking/confirm/')}>confirm</span>}
            description={<span onClick={this.onClickStep('/booking/confirm/')}>confirm job</span>}
            icon={<Icon type='check' onClick={this.onClickStep('/booking/confirm/')} />}
          />
        </Steps>
      </div>
    )
  }
  onClickSubmitBooking = () => {
    this.props.submitJob()
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
            <Button onClick={this.onClickSubmitBooking} type='primary' icon='select' className={styles.submitButton}>Submit</Button>
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

export default enhance(BookingPage)
