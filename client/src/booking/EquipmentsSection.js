import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './EquipmentsSection.sass'
import { Checkbox } from 'antd'
import EquipmentsSearch from '../components/EquipmentsSearch'
class EquipmentSection extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div>
          <Checkbox>Prophoto</Checkbox>
          <Checkbox>Broncolor</Checkbox>
        </div>
        <div>
          <EquipmentsSearch />
        </div>
      </div>
    )
  }
}

EquipmentSection.propTypes = {

}

export default EquipmentSection
