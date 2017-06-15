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

class BookingPage extends React.Component {

  static propTypes = {
    step: propTypes.number,
    saveUnfinshedBooking: propTypes.func,
    selectBookingUnfinishedById: propTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      stepState: this.props.step
    }
  }

  onClickStep = (index) => {
    return (e) => this.setState({stepState: index})
  }

  renderPageStep = () => {
    const stepsComponent = [
      <JobInformationForms
        saveUnfinshedBooking={this.props.saveUnfinshedBooking}
      />,
      <RoomTabs
        saveUnfinshedBooking={this.props.saveUnfinshedBooking}
        selectBookingUnfinishedById={this.props.selectBookingUnfinishedById}
      />
    ]

    return stepsComponent[this.state.stepState]
  }

  renderSteps = () => {
    return (
      <div className={styles.stepContainer}>
        <Steps current={this.state.stepState}>
          <Step
            title={<span onClick={this.onClickStep(0)}>job</span>}
            description={<span onClick={this.onClickStep(0)}>job information</span>}
            icon={<Icon type='solution' onClick={this.onClickStep(0)} />}
          />
          <Step
            title={<span onClick={this.onClickStep(1)}>rooms</span>}
            description={<span onClick={this.onClickStep(1)}>rooms, dates</span>}
            icon={<Icon type='switcher' onClick={this.onClickStep(1)} />}
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
        <Button.Group>
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

export default connect(selectGetBookingUnfinishedById, { saveUnfinshedBooking })(BookingPage)
