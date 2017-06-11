import { Checkbox, Col, Row } from 'antd'
import React, { Component } from 'react'

import EquipmentsSearch from '../components/EquipmentsSearch'
import {connect} from 'react-redux'
import { getAllEquipments } from '../../selectors/equipmentsSelectors'
import propTypes from 'prop-types'
import styles from './EquipmentsSection.sass'

class EquipmentSection extends Component {

  static propTypes = {
    equipments: propTypes.number
  }

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
            <span className={styles.equipment}> Po b14 </span>
            <span className={styles.amount}>X 213d2e2</span>
          </Col>
          <Col>
            <EquipmentsSearch equipments={this.props.equipments} />
          </Col>
        </Row>
      </div>
    )
  }
}

EquipmentSection.propTypes = {

}

export default connect(getAllEquipments, null)(EquipmentSection)
