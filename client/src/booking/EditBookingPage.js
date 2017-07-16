import { withRouter } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { selectBookingsByJobId } from '../../selectors/bookingsSelectors'
import { selectjobById } from '../../selectors/jobSelector'
import { submitJob, saveUnfinshedJob } from '../../actions/jobUnfinishedActions'
import { compose } from 'recompose'
import BookingForm from './BookingForm'
import queryString from 'query-string'
import Immutable from 'immutable'
const enhance = compose(
  withRouter,
  connect(state => ({
    selectBookingsByJobId: selectBookingsByJobId(state),
    selectjobById: selectjobById(state)
  }),
  { saveUnfinshedJob, submitJob }),
)

class EditBookingPage extends React.Component {

  static propTypes = {
    addBookingRoom: propTypes.func,
    history: propTypes.object,
    location: propTypes.object,

    selectjobById: propTypes.func,
    selectBookingsByJobId: propTypes.func,
    submitJob: propTypes.func
  }

  constructor (props) {
    super(props)
    this.stepUrls = [
      '/edit/job/',
      '/edit/rooms/',
      '/edit/confirm/'
    ]
  }

  saveUnfinshedJob = (entity) => {
    this.setState({job: {...this.props.job, ...entity}})
  }

  saveUnfinshedBooking = (entity) => {
    this.setState({...this.props.bookings, ...entity})
  }

  render () {
    const { bookingId } = queryString.parse(this.props.location.search)
    const jobId = bookingId.split('-')[0]
    const bookings = this.props.selectBookingsByJobId(jobId)
    const job = Immutable.Map(this.props.selectjobById(jobId))

    return (
      <BookingForm
        saveUnfinshedBooking={this.saveUnfinshedBooking}
        saveUnfinshedJob={this.saveUnfinshedJob}
        bookingUnfinished={bookings}
        job={job}
        addBookingRoom={this.addBookingRoom}
        submitJob={this.props.submitJob}
        history={this.props.history}
        location={this.props.location}
        stepUrls={this.stepUrls}
      />
    )
  }
}

export default enhance(EditBookingPage)
