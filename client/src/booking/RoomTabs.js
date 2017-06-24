import { Tabs, Form } from 'antd'
import React from 'react'
const TabPane = Tabs.TabPane
import RoomForm from './RoomForm'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './RoomTabs.sass'
class RoomTabs extends React.Component {

  static propTypes = {
    selectBookingUnfinishedById: PropTypes.func,
    saveUnfinshedBooking: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.newTabIndex = 1

    const panes = [{
      title: 'room S',
      key: '0',
      closable: true
    }]

    this.state = {
      activeKey: '0',
      panes
    }
  }

  onChangeField = (value) => {
    const index = _.findIndex(this.state.panes, (pane) => pane.key === value.id)
    if (value.name === 'room') {
      this.state.panes[index].title = `Room ${value.value}`
    }
  }

  renderTabs = () => {
    return this.state.panes.map(pane => {
      return (
        <TabPane
          actve
          tab={pane.title}
          key={pane.key}
          closable={pane.closable}
        >
          <RoomForm
            saveUnfinshedBooking={this.props.saveUnfinshedBooking}
            selectBookingUnfinishedById={this.props.selectBookingUnfinishedById}
            id={pane.key}
            onChangeField={this.onChangeField}
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
    const panes = this.state.panes
    const activeKey = `${this.newTabIndex++}`
    panes.push({
      title: 'Room S',
      key: activeKey
    })
    this.setState({ panes, activeKey })
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
