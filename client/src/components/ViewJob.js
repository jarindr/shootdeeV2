import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ViewJob.sass'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { selectjobById } from '../../selectors/jobSelector'
import { selectBookingsByJobId } from '../../selectors/bookingsSelectors'
import { compose } from 'recompose'
const enhance = compose(
  withRouter,
  connect((state) => (
    { selectjobById: selectjobById(state),
      selectBookingsByJobId: selectBookingsByJobId(state)
    }
  ))
)
class ViewJobPane extends Component {

  static propTypes = {
    location: PropTypes.object,
    selectjobById: PropTypes.func,
    selectBookingsByJobId: PropTypes.func
  }

  renderModal = () => {
    const search = queryString.parse(this.props.location.search)
    const id = search.showBooking
    const job = this.props.selectjobById(id)
    return (
      <div className={styles.container}>
        <div> {job ? `Quotatation: ${job.id}` : 'loading job...'}</div>
        <div> {job ? `Assignment: ${job.assignment}` : 'loading job...'}</div>
        <div> {job ? `Description: ${job.description}` : 'loading job...'}</div>
      </div>
    )
  }
  render () {
    const search = queryString.parse(this.props.location.search)
    return search.showBooking ? this.renderModal() : null
  }
}

export default enhance(ViewJobPane)
