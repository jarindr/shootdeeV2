import { withRouter } from 'react-router-dom'
import React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { selectbookingUnfinished } from '../../selectors/bookingUnfinishedSelectors'
import { selectjobInfoUnfinished } from '../../selectors/jobUnfinishedSelectors'
import { submitJob, saveUnfinshedJob } from '../../actions/jobUnfinishedActions'
import { selectEquipmentList } from '../../selectors/equipmentsSelectors'
import {
  saveUnfinshedBooking,
  addBookingRoom,
  removeBookingRoom,
  removeUnfinshedEquipment,
  addDefaultEquipment
} from '../../actions/bookingUnfinishedActions'
import { compose } from 'recompose'
import BookingForm from './BookingForm'

const enhance = compose(
  withRouter,
  connect(state => ({
    bookingUnfinished: selectbookingUnfinished(state),
    job: selectjobInfoUnfinished(state),
    equipments: selectEquipmentList(state)
  }),
    {
      saveUnfinshedJob,
      saveUnfinshedBooking,
      submitJob,
      addBookingRoom,
      removeBookingRoom,
      removeUnfinshedEquipment,
      addDefaultEquipment
    }),
)

class BookingPage extends React.Component {

  static propTypes = {
    saveUnfinshedBooking: propTypes.func,
    bookingUnfinished: propTypes.array,
    addBookingRoom: propTypes.func,
    removeBookingRoom: propTypes.func,
    equipments: propTypes.array,
    history: propTypes.object,
    location: propTypes.object,

    job: propTypes.object,
    submitJob: propTypes.func,
    saveUnfinshedJob: propTypes.func,
    removeUnfinshedEquipment: propTypes.func,
    addDefaultEquipment: propTypes.func
  }

  constructor (props) {
    super(props)
    this.stepUrls = [
      '/booking/job/',
      '/booking/rooms/',
      '/booking/confirm/'
    ]
  }

  addBookingRoom = () => {
    const id = String(this.props.bookingUnfinished.length)
    this.props.addBookingRoom(id)
    return id
  }

  onSubmit = () => {
    this.props.submitJob()
    message.success(`successfully create job ${this.props.job.id}`)
  }

  render () {
    return (
      <BookingForm
        saveUnfinshedBooking={this.props.saveUnfinshedBooking}
        bookingUnfinished={this.props.bookingUnfinished.filter(x => !x.deleted)}
        addBookingRoom={this.addBookingRoom}
        removeBookingRoom={this.props.removeBookingRoom}
        history={this.props.history}
        location={this.props.location}
        job={this.props.job}
        equipments={this.props.equipments}
        submitJob={this.onSubmit}
        saveUnfinshedJob={this.props.saveUnfinshedJob}
        stepUrls={this.stepUrls}
        removeUnfinshedEquipment={this.props.removeUnfinshedEquipment}
        addDefaultEquipment={this.props.addDefaultEquipment}
      />
    )
  }
}

export default enhance(BookingPage)
