import { withRouter } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { selectBookingsByJobId, selectBookingById } from '../../selectors/bookingsSelectors'
import { selectjobById } from '../../selectors/jobSelector'
import { selectEquipmentList } from '../../selectors/equipmentsSelectors'
import { submitJob, saveUnfinshedJob } from '../../actions/jobUnfinishedActions'
import { compose } from 'recompose'
import BookingForm from './BookingForm'
import queryString from 'query-string'
import { PRESETS } from '../../misc/constants'
const enhance = compose(
  withRouter,
  connect(state => ({
    selectBookingsByJobId: selectBookingsByJobId(state),
    selectjobById: selectjobById(state),
    equipments: selectEquipmentList(state),
    selectBookingById: selectBookingById(state)
  }),
    { saveUnfinshedJob, submitJob }),
)

class EditBookingPage extends React.Component {

  static propTypes = {
    history: propTypes.object,
    location: propTypes.object,

    selectjobById: propTypes.func,
    selectBookingsByJobId: propTypes.func,
    selectBookingById: propTypes.func,
    submitJob: propTypes.func,
    equipments: propTypes.array
  }

  constructor (props) {
    super(props)
    this.stepUrls = [
      `/edit/job/`,
      '/edit/rooms/',
      '/edit/confirm/'
    ]
    const { bookingId } = queryString.parse(this.props.location.search)
    const jobId = bookingId.split('-')[0]
    this.state = {
      job: this.props.selectjobById(jobId),
      bookings: this.props.selectBookingsByJobId(jobId)
    }
  }

  addBookingRoom = () => {
    
  }

  saveUnfinshedJob = (entity) => {
    this.setState(oldState => {
      return { job: { ...oldState.job, ...{ [entity.name]: entity.value } } }
    })
  }

  removeUnfinshedEquipment = (equipmentId, bookingId) => {
    const index = _.findIndex(this.state.bookings, (x) => x.id === bookingId)
    const booking = this.state.bookings[index]
    const indexEq = _.findIndex(booking.equipments, (x) => x.equipment === equipmentId)
    this.setState((oldState) => {
      _.pullAt(oldState.bookings[index].equipments, [indexEq])
      return { bookings: oldState.bookings }
    })
  }
  addDefaultEquipment = (bookingId, preset) => {
    const index = _.findIndex(this.state.bookings, (x) => x.id === bookingId)
    this.setState((oldState) => {
      oldState.bookings[index].equipments = PRESETS[preset]
      return { bookings: oldState.bookings }
    })
  }

  saveUnfinshedBooking = (entity) => {
    const { bookingId } = queryString.parse(this.props.location.search)
    const index = _.findIndex(this.state.bookings, (x) => x.id === bookingId)
    if (entity.name === 'equipments') {
      this.setState((oldState) => {
        const booking = oldState.bookings[index]
        const indexEq = _.findIndex(booking.equipments, (x) => x.equipment === entity.value.equipment)
        if (indexEq === -1) {
          oldState.bookings.splice(index, 1, { ...booking, ...{ equipments: [...booking.equipments, entity.value] } })
        } else {
          booking.equipments[indexEq] = entity.value
        }
        return { bookings: oldState.bookings }
      })
    } else {
      this.setState((oldState) => {
        const booking = oldState.bookings[index]
        oldState.bookings.splice(index, 1, { ...booking, ...{ [entity.name]: entity.value } })
        return { bookings: oldState.bookings }
      })
    }
  }

  render () {
    return (
      <BookingForm
        saveUnfinshedBooking={this.saveUnfinshedBooking}
        saveUnfinshedJob={this.saveUnfinshedJob}
        addBookingRoom={this.addBookingRoom}
        removeUnfinshedEquipment={this.removeUnfinshedEquipment}
        addDefaultEquipment={this.addDefaultEquipment}
        bookingUnfinished={this.state.bookings}
        job={this.state.job}
        submitJob={this.props.submitJob}
        history={this.props.history}
        location={this.props.location}
        stepUrls={this.stepUrls}
        equipments={this.props.equipments}
      />
    )
  }
}

export default enhance(EditBookingPage)
