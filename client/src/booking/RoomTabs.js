import { Tabs, Form } from 'antd'
import React from 'react'
const TabPane = Tabs.TabPane
import RoomForm from './RoomForm'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './RoomTabs.sass'
import moment from 'moment'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
const enhance = compose(
  withRouter,
  Form.create()
)
class RoomTabs extends React.Component {

  static propTypes = {
    saveUnfinshedBooking: PropTypes.func,
    addBookingRoom: PropTypes.func,
    bookingUnfinished: PropTypes.array,
    assignment: PropTypes.string,
    removeUnfinshedEquipment: PropTypes.func,
    addDefaultEquipment: PropTypes.func,
    equipments: PropTypes.array,
    location: PropTypes.object,
    history: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.newTabIndex = 1
    const search = queryString.parse(this.props.location.search)
    this.state = {
      activeKey: search.bookingId || this.props.bookingUnfinished[0].id
    }
  }

  formatDate (date) {
    const moments = _.uniq(date.map(x => moment(x).format('ddd DD/MM'))).join(' - ')
    return moments
  }

  getPanes = () => {
    return this.props.bookingUnfinished.map((booking, index) => {
      return { ...booking, ...{ title: `[${booking.room}] ${this.formatDate(booking.date)}`, key: booking.id } }
    })
  }

  renderTabs = () => {
    return this.getPanes().map(pane => {
      return (
        <TabPane
          tab={pane.title}
          key={pane.key}
          closable={pane.closable || true}
        >
          <RoomForm
            saveUnfinshedBooking={this.props.saveUnfinshedBooking}
            bookingUnfinished={pane}
            assignment={this.props.assignment}
            removeUnfinshedEquipment={this.props.removeUnfinshedEquipment}
            addDefaultEquipment={this.props.addDefaultEquipment}
            equipments={this.props.equipments}
          />
        </TabPane>
      )
    })
  }
  onChange = (activeKey) => {
    this.setState({ activeKey }, () => {
      const search = queryString.stringify({bookingId: this.state.activeKey})
      this.props.history.push({search})
    })
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

export default enhance(RoomTabs)
