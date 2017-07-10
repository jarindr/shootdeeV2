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
    this.props.history.push({search: queryString.stringify(search)})
  }

  onClickPrev = () => {
    const search = queryString.parse(this.props.location.search)
    if (search.week) {
      search.week = Number(search.week) - 1
    } else {
      search.week = -1
    }
    this.props.history.push({search: queryString.stringify(search)})
  }

  render () {
    const week = queryString.parse(this.props.location.search).week
    const filterWeek = week ? Number(week) : 0
    const columns = [
      { title: 'date', dataIndex: 'date', key: 'date' },
      { title: 'time', dataIndex: 'time', key: 'time' },
      { title: 'room', dataIndex: 'room', key: 'room' },
      { title: 'customer', dataIndex: 'customer', key: 'customer' },
      { title: 'assignment', dataIndex: 'assignment', key: 'assignment' },
      { title: 'status', dataIndex: 'status', key: 'status' },
      { title: 'quotation', dataIndex: 'quotation', key: 'quotation' }

    ]
    const start = moment().add(filterWeek, 'weeks').startOf('week')
    const end = moment().add(filterWeek, 'weeks').endOf('week')
    const dataSource = this.props.jobs
      .reduce((prev, job, index) => {
        _.uniq(job.date).forEach((d, i) => {
          const momentDate = moment(d)
          if (momentDate >= start && momentDate <= end) {
            prev.push({
              quotation: job.id,
              customer: job.customer,
              key: `${index}-${i}`,
              assignment: job.assignment,
              date: momentDate.format('DD/MM/YYYY'),
              time: moment(job.startTime).format('HH:mm'),
              room: job.room,
              status: job.status
            })
          }
        })
        return prev
      }, [])
    return (
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
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
