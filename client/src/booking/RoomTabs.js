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
    removeBookingRoom: PropTypes.func,
    bookingUnfinished: PropTypes.array,
    assignment: PropTypes.string,
    removeUnfinshedEquipment: PropTypes.func,
    addDefaultEquipment: PropTypes.func,
    equipments: PropTypes.array,
    location: PropTypes.object
  }

  constructor (props) {
    super(props)
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
    const panes = this.getPanes()
    return panes.map(pane => {
      return (
        <TabPane
          tab={pane.title}
          key={pane.key}
          closable={panes.length !== 1}
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
    this.setState({ activeKey })
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }

  add = () => {
    const id = this.props.addBookingRoom()
    this.setState({ activeKey: id })
  }

  remove = (targetKey) => {
    this.props.removeBookingRoom(targetKey)
    const index = _.findIndex(this.props.bookingUnfinished, x => x.id === targetKey)
    this.setState({ activeKey: this.props.bookingUnfinished[index - 1].id })
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
