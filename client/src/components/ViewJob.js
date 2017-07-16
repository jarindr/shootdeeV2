import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ViewJob.sass'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { selectBookingWithJobDetail } from '../../selectors/bookingsSelectors'
import { compose } from 'recompose'
import { Icon, Tag, Button } from 'antd'
import moment from 'moment'
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

  onClickEdit = () => {
    const { showBooking } = queryString.parse(this.props.location.search)
    this.props.history.push({pathname: '/edit/job/', search: queryString.stringify({bookingId: showBooking})})
  }

  renderModal = () => {
    return (
      <div className={styles.container}>
        <div className={styles.closeModal} onClick={this.onClickCloseModal}>
          <Icon type='close' />
        </div>
        <div className={styles.innerContainer}>
          {this.renderButtons()}
          {this.renderRows()}
        </div>
      </div>
    )
  }
  renderButtons = () => {
    return (
      <div>
        <Button.Group style={{float: 'right'}}>
          <Button type='primary' onClick={this.onClickEdit}>Edit</Button>
          <Button type='danger'>Close job</Button>
        </Button.Group>
      </div>
    )
  }
  renderRows = () => {
    const search = queryString.parse(this.props.location.search)
    const id = search.showBooking
    const job = this.props.selectBookingWithJobDetail(id)
    return (
      <div>
        <div className={styles.jobRow}>
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
            <span className={styles.label}>Description: </span>{job.description}
          </div>
        </div>
        <div>
          <div className={styles.row}>
            <span className={styles.label}>Date: </span>{_.uniq(job.date).map(x => moment(x).format('dddd, DD/MM/YYYY')).join(' - ')}
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Room: </span>{job.room}
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Start time: </span>{moment(job.startTime).format('HH:mm')}
          </div>
          <div className={styles.row}>
            <span className={styles.label}>End time: </span>{moment(job.endTime).format('HH:mm')}
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Assistants: </span>{job.assistants}
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Equipments</span>
            {job.equipments
          ? _.isEmpty(job.equipments)
          ? 'none'
          : _.sortBy(job.equipments, e => e.type).map(x => (
            <div className={styles.equipmentRow}>
              <Tag color='pink'>{x.type}</Tag> {x.equipment} {x.amount}
            </div>
          ))
          : null}
          </div>
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
