import { withRouter } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { saveUnfinshedBooking, addBookingRoom } from '../../actions/bookingUnfinishedActions'
import { selectbookingUnfinished } from '../../selectors/bookingUnfinishedSelectors'
import { selectjobInfoUnfinished } from '../../selectors/jobUnfinishedSelectors'
import { submitJob, saveUnfinshedJob } from '../../actions/jobUnfinishedActions'
import { compose } from 'recompose'
import BookingForm from './BookingForm'

const enhance = compose(
  withRouter,
  connect(state => ({
    bookingUnfinished: selectbookingUnfinished(state),
    job: selectjobInfoUnfinished(state)
  }),
    { saveUnfinshedJob, saveUnfinshedBooking, submitJob, addBookingRoom }),
)

class BookingPage extends React.Component {

  static propTypes = {
    saveUnfinshedBooking: propTypes.func,
    bookingUnfinished: propTypes.array,
    addBookingRoom: propTypes.func,

    history: propTypes.object,
    location: propTypes.object,

    job: propTypes.object,
    submitJob: propTypes.func,
    saveUnfinshedJob: propTypes.func
  }

  render () {
    return (
      <BookingForm
        saveUnfinshedBooking={this.props.saveUnfinshedBooking}
        bookingUnfinished={this.props.bookingUnfinished}
        addBookingRoom={this.props.addBookingRoom}
        history={this.props.history}
        location={this.props.location}
        job={this.props.job}
        submitJob={this.props.submitJob}
        saveUnfinshedJob={this.props.saveUnfinshedJob}
        stepUrls={['/booking/job/',
          '/booking/rooms/',
          '/booking/confirm/']}
      />
    )
  }
}

export default enhance(BookingPage)
