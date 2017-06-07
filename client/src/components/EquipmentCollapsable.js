import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Collapse, InputNumber } from 'antd'
import styles from './EquipmentCollapsable.sass'
const Panel = Collapse.Panel
class EquipmentCollapsable extends Component {

  onChange = (key) => {

  }
  onNumberChange = (number) => {

  }

  renderEquipmentRow = () => {
    return (
      <Panel header='This is panel header 1' key='1'>
        <div className={styles.panelContainer}>
          <span>bonchoue X</span> <InputNumber min={1} max={10} defaultValue={3} onChange={this.onNumberChange} className={styles.numberInput} />
        </div>
        <div className={styles.panelContainer}>
          <span>bonchoue X</span> <InputNumber min={1} max={10} defaultValue={3} onChange={this.onNumberChange} className={styles.numberInput} />
        </div>
        <div className={styles.panelContainer}>
          <span>bonchoue X</span> <InputNumber min={1} max={10} defaultValue={3} onChange={this.onNumberChange} className={styles.numberInput} />
        </div>
        <div className={styles.panelContainer}>
          <span>bonchoue X</span> <InputNumber min={1} max={10} defaultValue={3} onChange={this.onNumberChange} className={styles.numberInput} />
        </div>
        <div className={styles.panelContainer}>
          <span>bonchoue X</span> <InputNumber min={1} max={10} defaultValue={3} onChange={this.onNumberChange} className={styles.numberInput} />
        </div>
        <div className={styles.panelContainer}>
          <span>bonchoue X</span> <InputNumber min={1} max={10} defaultValue={3} onChange={this.onNumberChange} className={styles.numberInput} />
        </div>

      </Panel>
    )
  }

  render () {
    return (
      <div className={styles.container}>
        <Collapse onChange={this.onChange} className={styles.collapseContainer} activeKey='1'>
          {this.renderEquipmentRow()}
        </Collapse>
        <Collapse onChange={this.onChange} className={styles.collapseContainer} activeKey='1'>
          {this.renderEquipmentRow()}
        </Collapse>
        <Collapse onChange={this.onChange} className={styles.collapseContainer} activeKey='1'>
          {this.renderEquipmentRow()}
        </Collapse>
      </div>
    )
  }
}

EquipmentCollapsable.propTypes = {

}

export default EquipmentCollapsable
