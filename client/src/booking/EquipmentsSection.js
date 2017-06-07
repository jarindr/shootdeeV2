import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './EquipmentsSection.sass'
import { Checkbox } from 'antd'
class EquipmentSection extends Component {
  render () {
    return (
      <div className={styles.container}>
        <Checkbox>Prophoto</Checkbox>
        <Checkbox>Broncolor</Checkbox>
        <
      </div>
    )
  }
}

EquipmentSection.propTypes = {

}

export default EquipmentSection
