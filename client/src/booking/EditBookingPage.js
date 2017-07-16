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
    this.state = {
      job: {},
      bookings: []
    }
  }

  saveUnfinshedJob = (entity) => {
    this.setState(oldState => {
      return { job: { ...oldState.job, ...{ [entity.name]: entity.value } } }
    })
  }

  saveUnfinshedBooking = (entity) => {
    const { bookingId } = queryString.parse(this.props.location.search)
    const { equipments } = this.props.selectBookingById(bookingId)

    if (entity.name === 'equipments') {
      this.setState(oldState => {
        return { bookings: { [entity.id]: { ...oldState.bookings[entity.id], ...{ equipments: [...equipments, entity.value] } } } }
      })
    } else {
      this.setState(oldState => {
        return { bookings: { [entity.id]: { ...oldState.bookings[entity.id], ...{ [entity.name]: entity.value } } } }
      })
    }
  }

  render () {
    const { bookingId } = queryString.parse(this.props.location.search)
    const jobId = bookingId.split('-')[0]
    const bookings = this.props.selectBookingsByJobId(jobId).map(x => {
      return { ...x, ...this.state.bookings[x.id] }
    })
    const job = { ...this.props.selectjobById(jobId), ...this.state.job }
    console.log(bookings)

    return (
      <BookingForm
        saveUnfinshedBooking={this.saveUnfinshedBooking}
        saveUnfinshedJob={this.saveUnfinshedJob}
        addBookingRoom={this.addBookingRoom}
        removeUnfinshedEquipment={this.removeUnfinshedEquipment}
        addDefaultEquipment={this.addDefaultEquipment}
        bookingUnfinished={bookings}
        job={job}
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
