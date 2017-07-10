import { Tabs, Form } from 'antd'
import React from 'react'
const TabPane = Tabs.TabPane
import RoomForm from './RoomForm'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './RoomTabs.sass'
import moment from 'moment'
class RoomTabs extends React.Component {

  static propTypes = {
    saveUnfinshedBooking: PropTypes.func,
    addBookingRoom: PropTypes.func,
    bookingUnfinished: PropTypes.object,
    assignment: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.newTabIndex = 1
    this.state = {
      activeKey: '0'
    }
  }
  formatDate (date) {
    const moments = _.uniq(date.map(x => moment(x).format('ddd DD/MM'))).join(' - ')
    return moments
  }

  getPanes = () => {
    return _.values(this.props.bookingUnfinished.toJS()).map((booking, index) => {
      return { ...booking, ...{ title: `[${booking.room}] ${this.formatDate(booking.date)}`, key: booking.id } }
    })
  }

  renderTabs = () => {
    return this.getPanes().map(pane => {
      return (
        <TabPane
          actve
          tab={pane.title}
          key={pane.key}
          closable={pane.closable || true}
        >
          <RoomForm
            saveUnfinshedBooking={this.props.saveUnfinshedBooking}
            bookingUnfinished={pane}
            assignment={this.props.assignment}
            id={pane.key}
          />
        </TabPane>
      )
    })
  }
  onChange = (activeKey) => {
    this.setState({ activeKey })
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }

  add = () => {
    const id = `${this.newTabIndex++}`
    this.props.addBookingRoom(id)
    this.setState({activeKey: id})
  }
  remove = (targetKey) => {
    let activeKey = this.state.activeKey
    let lastIndex
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const panes = this.state.panes.filter(pane => pane.key !== targetKey)
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key
    }
    this.setState({ panes, activeKey })
  }
  render () {
    return (
      <Tabs
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type='editable-card'
        onEdit={this.onEdit}
        className={styles.tabs}
      >
        {this.renderTabs()}
      </Tabs>
    )
  }
}

export default Form.create()(RoomTabs)
