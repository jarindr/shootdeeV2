import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './EquipmentsSection.sass'
import { Checkbox, Row, Col } from 'antd'
import EquipmentsSearch from '../components/EquipmentsSearch'
import {connect} from 'react-redux'
import { getAllEquipments } from '../../selectors/equipmentsSelectors'
class EquipmentSection extends Component {
  render () {
    console.log(this.props)

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

export default connect(getAllEquipments, null)(EquipmentSection)
