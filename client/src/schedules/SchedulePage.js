import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Icon } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { selectjobs } from '../../selectors/jobSelector'
import moment from 'moment'
import _ from 'lodash'
import styles from './SchedulePage.sass'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
const enhance = compose(
  withRouter,
  connect((state) => (
    { jobs: selectjobs(state) }
  ))
)
const columns = [
  { title: 'date', dataIndex: 'date', key: 'date' },
  { title: 'time', dataIndex: 'time', key: 'time' },
  { title: 'room', dataIndex: 'room', key: 'room' },
  { title: 'customer', dataIndex: 'customer', key: 'customer' },
  { title: 'assignment', dataIndex: 'assignment', key: 'assignment' },
  { title: 'status', dataIndex: 'status', key: 'status' },
  { title: 'quotation', dataIndex: 'quotation', key: 'quotation' }

]
const weeks = [1, 2, 3, 4, 5, 6, 7]

class SchedulePage extends Component {

  static propTypes = {
    jobs: PropTypes.array,
    history: PropTypes.object,
    location: PropTypes.object
  }

  onClickNext = () => {
    const search = queryString.parse(this.props.location.search)
    if (search.week) {
      search.week = Number(search.week) + 1
    } else {
      search.week = 1
    }
    this.props.history.push({ search: queryString.stringify(search) })
  }

  onClickPrev = () => {
    const search = queryString.parse(this.props.location.search)
    if (search.week) {
      search.week = Number(search.week) - 1
    } else {
      search.week = -1
    }
    this.props.history.push({ search: queryString.stringify(search) })
  }
  getRowClassName = (record, index) => {
    switch (moment(record.date, 'DD-MM-YYYY').day()) {
      case 1:
        return styles.mon
      case 2:
        return styles.tue
      case 3:
        return styles.wed
      case 4:
        return styles.thu
      case 5:
        return styles.fri
      case 6:
        return styles.sat
      case 0:
        return styles.sun
      default:
        break
    }
  }

  render () {
    const week = queryString.parse(this.props.location.search).week
    const filterWeek = week ? Number(week) : 0
    const start = moment().add(filterWeek, 'weeks').startOf('isoweek')
    const end = moment().add(filterWeek, 'weeks').endOf('isoweek')
    const dataSource = this.props.jobs
      .reduce((prev, job, index) => {
        _.uniq(job.date).forEach((d, i) => {
          const momentDate = moment(d)
          if (momentDate > start && momentDate <= end) {
            prev.push({
              quotation: job.id,
              customer: job.customer,
              key: `${index}-${i}`,
              assignment: job.assignment,
              date: momentDate,
              time: moment(job.startTime).format('HH:mm'),
              room: job.room,
              status: job.status
            })
          }
        })
        return prev
      }, [])

    weeks.forEach(week => {
      const date = dataSource.map(d => d.date.day())
      if (!_.includes(date, week)) {
        dataSource.push({ date: moment().add(filterWeek, 'weeks').isoWeekday(week) })
      }
    })
    const data = _.sortBy(dataSource, d => d.date).map(x => ({ ...x, ...{ date: x.date.format('DD/MM/YYYY') } }))

    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={this.getRowClassName}
        />
        <div className={styles.stepNavigationContainer}>
          <Button.Group className={styles.stepNavigationButtons}>
            <Button type='primary' onClick={this.onClickPrev}><Icon type='left' />previous week</Button>
            <Button type='primary' onClick={this.onClickNext}>next week<Icon type='right' /></Button>
          </Button.Group>
        </div>
      </div>
    )
  }
}

export default enhance(SchedulePage)
