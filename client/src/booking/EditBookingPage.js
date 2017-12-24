import { withRouter } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { message } from 'antd'
import { selectBookingsByJobId, selectBookingById } from '../../selectors/bookingsSelectors'
import { selectjobById } from '../../selectors/jobSelector'
import { selectEquipmentList } from '../../selectors/equipmentsSelectors'
import { submitEditJob } from '../../actions/jobEditActions'
import { getInitialRoomState } from '../../reducers/bookingUnfinishedReducer'
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
    { submitEditJob }),
)

class EditBookingPage extends React.Component {

  static propTypes = {
    history: propTypes.object,
    location: propTypes.object,

    selectjobById: propTypes.func,
    selectBookingsByJobId: propTypes.func,
    submitEditJob: propTypes.func,
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
    const subId = Number(_.last(this.state.bookings.map(x => x.id.split('-')[1]).sort())) + 1
    const id = `${this.state.job.id}-${subId}`
    this.setState(oldState => {
      oldState.bookings.push(getInitialRoomState(id, this.state.job.assignment))
      return oldState
    })
    return id
  }
  removeBookingRoom = (bookingId) => {
    const index = _.findIndex(this.state.bookings, x => x.id === bookingId)
    this.setState(oldState => {
      oldState.bookings[index].deleted = true
      oldState.job.bookings.splice(index, 1)
      return oldState
    })
  }

  saveUnfinshedJob = (entity) => {
    if (entity.name === 'assignment') {
      this.setState(oldState => {
        return {
          job: { ...oldState.job, ...{ [entity.name]: entity.value } },
          bookings: [getInitialRoomState(`${this.state.job.id}-0`, entity.value)] }
      })
    } else {
      this.setState(oldState => {
        return { job: { ...oldState.job, ...{ [entity.name]: entity.value } } }
      })
    }
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
    const index = _.findIndex(this.state.bookings, (x) => x.id === entity.id)
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
  submitEditJob = () => {
    this.props.submitEditJob({ job: this.state.job, bookings: this.state.bookings })
    message.success(`successfully edit job ${this.state.job.id}`)
  }

  render () {
    return (
      <BookingForm
        saveUnfinshedBooking={this.saveUnfinshedBooking}
        saveUnfinshedJob={this.saveUnfinshedJob}
        addBookingRoom={this.addBookingRoom}
        removeBookingRoom={this.removeBookingRoom}
        removeUnfinshedEquipment={this.removeUnfinshedEquipment}
        addDefaultEquipment={this.addDefaultEquipment}
        bookingUnfinished={this.state.bookings.filter(x => !x.deleted)}
        job={this.state.job}
        title='Edit booking'
        submitJob={this.submitEditJob}
        history={this.props.history}
        location={this.props.location}
        stepUrls={this.stepUrls}
        equipments={this.props.equipments}
      />
    )
  }
}

export default enhance(EditBookingPage)
