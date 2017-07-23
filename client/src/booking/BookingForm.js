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
    bookingUnfinished: propTypes.array,
    addBookingRoom: propTypes.func,
    removeBookingRoom: propTypes.func,
    history: propTypes.object,
    location: propTypes.object,

    job: propTypes.object,
    submitJob: propTypes.func,
    saveUnfinshedJob: propTypes.func,
    removeUnfinshedEquipment: propTypes.func,
    addDefaultEquipment: propTypes.func,
    stepUrls: propTypes.array,
    equipments: propTypes.array
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
        removeUnfinshedEquipment={this.props.removeUnfinshedEquipment}
        addDefaultEquipment={this.props.addDefaultEquipment}
        addBookingRoom={this.props.addBookingRoom}
        removeBookingRoom={this.props.removeBookingRoom}
        assignment={this.props.job.assignment}
        equipments={this.props.equipments}

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
        <Route render={this.renderJobInformation} path={this.props.stepUrls[0]} />
        <Route render={this.renderRoomTabs} path={this.props.stepUrls[1]} />
        <Route render={this.renderConfirm} path={this.props.stepUrls[2]} />
      </div>
    )
  }

  renderSteps = () => {
    return (
      <div className={styles.stepContainer}>
        <Steps current={this.state.step}>
          <Step
            title={<span onClick={this.onClickStep(this.props.stepUrls[0])}>job</span>}
            description={<span onClick={this.onClickStep(this.props.stepUrls[0])}>job information</span>}
            icon={<Icon type='solution' onClick={this.onClickStep(this.props.stepUrls[0])} />}
          />
          <Step
            title={<span onClick={this.onClickStep(this.props.stepUrls[1])}>rooms</span>}
            description={<span onClick={this.onClickStep(this.props.stepUrls[1])}>rooms, dates</span>}
            icon={<Icon type='switcher' onClick={this.onClickStep(this.props.stepUrls[1])} />}
          />
          <Step
            title={<span onClick={this.onClickStep(this.props.stepUrls[2])}>confirm</span>}
            description={<span onClick={this.onClickStep(this.props.stepUrls[2])}>confirm job</span>}
            icon={<Icon type='check' onClick={this.onClickStep(this.props.stepUrls[2])} />}
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
      this.props.history.push({ pathname: route, search: this.props.location.search })
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
            <h4 className={styles.subTitle}>quotation: {this.props.job.id}</h4>
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
