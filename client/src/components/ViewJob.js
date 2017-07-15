import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ViewJob.sass'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { selectBookingWithJobDetail } from '../../selectors/bookingsSelectors'
import { compose } from 'recompose'
import { Icon } from 'antd'
const enhance = compose(
  withRouter,
  connect((state) => (
    { selectBookingWithJobDetail: selectBookingWithJobDetail(state) }
  ))
)
class ViewJobPane extends Component {

  static propTypes = {
    location: PropTypes.object,
    selectBookingWithJobDetail: PropTypes.func,
    history: PropTypes.object
  }
  onClickCloseModal = () => {
    const removedBookingSearch = _.omit(queryString.parse(this.props.history.search), ['showBooking'])
    this.props.history.push({search: queryString.stringify(removedBookingSearch)})
  }

  renderModal = () => {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.closeModal} onClick={this.onClickCloseModal}>
            <Icon type='close' />
          </div>
          {this.renderRows()}
        </div>
      </div>
    )
  }

  renderRows = () => {
    const search = queryString.parse(this.props.location.search)
    const id = search.showBooking
    const job = this.props.selectBookingWithJobDetail(id)
    return (
      <div>
        <div className={styles.row}>
          <span className={styles.label}>Quotation:</span> {job.id}
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Assignment: </span>{job.assignment}
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Client: </span>{job.customer}
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Room: </span>{job.room}
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Date: </span>{_.uniq(job.date)}
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Start time: </span>{job.startTime}
        </div>
        <div className={styles.row}>
          <span className={styles.label}>End time: </span>{job.endTime}
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Assistants: </span>{job.assistants}
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Description: </span>{job.description}
        </div>
      </div>
    )
  }
  render () {
    const search = queryString.parse(this.props.location.search)
    return search.showBooking ? this.renderModal() : null
  }
}

export default enhance(ViewJobPane)
