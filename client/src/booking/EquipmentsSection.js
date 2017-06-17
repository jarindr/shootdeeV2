import { Checkbox, Col, Row, Form, Input } from 'antd'
import React, { Component } from 'react'

import EquipmentsSearch from '../components/EquipmentsSearch'
import { connect } from 'react-redux'
import { getAllEquipments } from '../../selectors/equipmentsSelectors'
import { saveUnfinshedBooking } from '../../actions/bookingUnfinishedActions'
import propTypes from 'prop-types'
import styles from './EquipmentsSection.sass'

class EquipmentSection extends Component {

  static propTypes = {
    equipments: propTypes.number,
    saveUnfinshedBooking: propTypes.func,
    form: propTypes.func,
    id: propTypes.string
  }

  onAddEquipment = ({equipment, amount}) => {
    this.props.saveUnfinshedBooking({
      id: this.props.id,
      name: 'equipments',
      value: { [equipment]: {equipment, amount} }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
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
            <EquipmentsSearch
              equipments={this.props.equipments}
              onAddEquipment={this.onAddEquipment}
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

EquipmentSection.propTypes = {

}

export default connect(
  getAllEquipments,
  { saveUnfinshedBooking }
  )(Form.create({})(EquipmentSection))
