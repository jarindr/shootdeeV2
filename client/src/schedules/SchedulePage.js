import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { selectjobs } from '../../selectors/jobSelector.js'
const enhance = compose(
  connect((state) => (
    { jobs: selectjobs(state) }
  ))
)
class SchedulePage extends Component {

  static propTypes = {
    jobs: PropTypes.array
  }
  render () {
    const columns = [
      {title: 'date', dataIndex: 'date', key: 'date'},
      {title: 'quotation', dataIndex: 'quotation', key: 'quotation'},
      {title: 'customer', dataIndex: 'customer', key: 'customer'},
      {title: 'assignment', dataIndex: 'assignment', key: 'assignment'},
      {title: 'room', dataIndex: 'room', key: 'room'},
      {title: 'status', dataIndex: 'status', key: 'status'}

    ]
    const dataSource = this.props.jobs.map((job, index) => {
      return {
        quotation: job.id,
        customer: job.customer,
        key: index,
        assignment: job.assignment,
        date: job.date,
        room: job.room,
        status: job.status
      }
    })
    return (
      <Table columns={columns} dataSource={dataSource} />
    )
  }
}

export default enhance(SchedulePage)
