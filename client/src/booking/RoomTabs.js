import { Tabs, Form } from 'antd'
import React from 'react'
const TabPane = Tabs.TabPane
import RoomForm from './RoomForm'
class RoomTabs extends React.Component {
  constructor (props) {
    super(props)
    this.newTabIndex = 0
    const panes = [
      { title: 'Room S', content: <RoomForm id='1' saveUnfinshedBooking={this.props.saveUnfinshedBooking} />, key: '1', closable: false },
      { title: 'Room L', content: <RoomForm id='2' saveUnfinshedBooking={this.props.saveUnfinshedBooking} />, key: '2' }
    ]
    this.state = {
      activeKey: panes[0].key,
      panes
    }
  }

  onChange = (activeKey) => {
    this.setState({ activeKey })
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }
  add = () => {
    const panes = this.state.panes
    const activeKey = `newTab${this.newTabIndex++}`
    panes.push({ title: 'New Tab', content: <RoomForm />, key: activeKey })
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
      >
        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
      </Tabs>
    )
  }
}

export default Form.create()(RoomTabs)
