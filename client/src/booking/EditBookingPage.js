import { withRouter } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { selectBookingsByJobId } from '../../selectors/bookingsSelectors'
import { selectjobById } from '../../selectors/jobSelector'
import { submitJob, saveUnfinshedJob } from '../../actions/jobUnfinishedActions'
import { compose } from 'recompose'
import BookingForm from './BookingForm'

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

    selectjobById: propTypes.object,
    selectBookingsByJobId: propTypes.object,
    submitJob: propTypes.func
  }

  constructor (props) {
    super(props)
    this.stepsUrl = [
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
    return (
      <BookingForm
        saveUnfinshedBooking={this.saveUnfinshedBooking}
        saveUnfinshedJob={this.saveUnfinshedJob}
        bookingUnfinished={this.state.booking}
        job={this.state.job}
        addBookingRoom={this.addBookingRoom}
        submitJob={this.props.submitJob}
        history={this.props.history}
        location={this.props.location}
        stepsUrl={this.stepsUrl}
      />
    )
  }
}

export default enhance(EditBookingPage)
