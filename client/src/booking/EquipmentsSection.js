import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './EquipmentsSection.sass'
import { Checkbox, Row, Col } from 'antd'
import EquipmentsSearch from '../components/EquipmentsSearch'
class EquipmentSection extends Component {
  render () {
    return (
      <div className={styles.container}>
        <Row>
          <Col>
            <Checkbox>Prophoto</Checkbox>
            <Checkbox>Broncolor</Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <EquipmentsSearch />
          </Col>
        </Row>
      </div>
    )
  }
}

EquipmentSection.propTypes = {

}

export default EquipmentSection
