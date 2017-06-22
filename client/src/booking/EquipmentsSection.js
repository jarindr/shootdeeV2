import { Checkbox, Col, Row, Form, Input } from 'antd'
import React, { Component } from 'react'

import EquipmentsSearch from '../components/EquipmentsSearch'
import { connect } from 'react-redux'
import { getAllEquipments } from '../../selectors/equipmentsSelectors'
import { selectGetBookingUnfinishedEquipmentsById } from '../../selectors/bookingUnfinishedSelectors'
import { saveUnfinshedBooking, removeUnfinshedEquipment } from '../../actions/bookingUnfinishedActions'
import propTypes from 'prop-types'
import styles from './EquipmentsSection.sass'
import _ from 'lodash'
class EquipmentSection extends Component {

  static propTypes = {
    equipments: propTypes.number,
    saveUnfinshedBooking: propTypes.func,
    removeUnfinshedEquipment: propTypes.func,
    form: propTypes.func,
    id: propTypes.string,
    selectUnfinishedEquipmentsById: propTypes.func
  }

  onAddEquipment = (data) => {
    const { equipment, type } = JSON.parse(data.equipment)
    this.props.saveUnfinshedBooking({
      id: this.props.id,
      name: 'equipments',
      value: { equipment, amount: data.amount, type }
    })
  }
  onClickRemoveEquipment = (equipmentId, bookingId) => (e) => {
    this.props.removeUnfinshedEquipment(equipmentId, bookingId)
  }
  renderAddedEquipments = () => {
    const equipments = this.props.selectUnfinishedEquipmentsById(this.props.id)
    const group = _.groupBy(equipments, 'type')
    if (equipments) {
      return _.map(group, (value, key) => (
        <div key={key}>
          <div><b>{key}</b></div>
          {_.map(value, eq => (<div key={eq.equipment}>{eq.equipment} {eq.amount} <span onClick={this.onClickRemoveEquipment(eq.equipment, this.props.id)}>-</span></div>))}
        </div>
      ))
    }
    return null
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
            {this.renderAddedEquipments()}
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
  (state) => {
    return {
      equipments: getAllEquipments(state),
      selectUnfinishedEquipmentsById: selectGetBookingUnfinishedEquipmentsById(state)
    }
  },
  { saveUnfinshedBooking, removeUnfinshedEquipment }
  )(Form.create({})(EquipmentSection))
