import { Button, Icon, Steps } from 'antd'
import { Route } from 'react-router-dom'
import ConfirmJob from './ConfirmJob'
import JobInformationForms from './JobInformationForms'
import React from 'react'
import RoomTabs from './RoomTabs'
import propTypes from 'prop-types'
import styles from './BookingPage.sass'
const Step = Steps.Step

class BookingForm extends React.Component {

  static propTypes = {
    saveUnfinshedBooking: propTypes.func,
    bookingUnfinished: propTypes.object,
    addBookingRoom: propTypes.func,

    history: propTypes.object,
    location: propTypes.object,

    job: propTypes.object,
    submitJob: propTypes.func,
    saveUnfinshedJob: propTypes.func,
    stepUrls: propTypes.array
  }

  constructor (props) {
    super(props)
    this.state = {
      step: this.props.stepUrls.indexOf(this.props.location.pathname)
    }
  }

  renderRoomTabs = () => {
    return (
      <RoomTabs
        bookingUnfinished={this.props.bookingUnfinished}
        saveUnfinshedBooking={this.props.saveUnfinshedBooking}
        addBookingRoom={this.props.addBookingRoom}
        assignment={this.props.job.get('assignment')}
      />
    )
  }

  renderJobInformation = () => {
    return (
      <JobInformationForms
        saveUnfinshedBooking={this.props.saveUnfinshedBooking}
        job={this.props.job}
        saveUnfinshedJob={this.props.saveUnfinshedJob}

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
        <Route render={this.renderConfirm} path='/booking/confirm/' />
        <Route render={this.renderJobInformation} path='/booking/job/' />
      </div>
    )
  }

  renderSteps = () => {
    return (
      <div className={styles.stepContainer}>
        <Steps current={this.state.step}>
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

  onClickStep = (route) => {
    return (e) => {
      this.setState({ step: this.props.stepUrls.indexOf(route) })
      this.props.history.push(route)
    }
  }
  onClickNext = () => {
    this.setState((prevState) => {
      if (prevState.step + 1 <= 2) {
        this.props.history.push(this.props.stepUrls[prevState.step + 1])
        return { step: prevState.step + 1 }
      }
    })
  }
  onClickPrev = () => {
    this.setState((prevState) => {
      if (prevState.step - 1 >= 0) {
        this.props.history.push(this.props.stepUrls[prevState.step - 1])
        return { step: prevState.step - 1 }
      }
    })
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
            <Button.Group className={styles.stepNavigationButtons}>
              <Button type='primary' onClick={this.onClickPrev}><Icon type='left' />previous</Button>
              <Button onClick={this.onClickSubmitBooking} type='primary' icon='select' className={styles.submitButton}>Submit</Button>
              <Button type='primary' onClick={this.onClickNext}>next<Icon type='right' /></Button>
            </Button.Group>
          </div>
        </div>
        {this.renderSteps()}
        {this.renderPageStep()}
      </div>
    )
  }
}

export default BookingForm
