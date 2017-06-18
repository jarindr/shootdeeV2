import { Checkbox, Col, Row, Form, Input } from 'antd'
import React, { Component } from 'react'

import EquipmentsSearch from '../components/EquipmentsSearch'
import { connect } from 'react-redux'
import { getAllEquipments } from '../../selectors/equipmentsSelectors'
import { selectGetBookingUnfinishedEquipmentsById } from '../../selectors/bookingUnfinishedSelectors'
import { saveUnfinshedBooking } from '../../actions/bookingUnfinishedActions'
import propTypes from 'prop-types'
import styles from './EquipmentsSection.sass'
import _ from 'lodash'
class EquipmentSection extends Component {

  static propTypes = {
    equipments: propTypes.number,
    saveUnfinshedBooking: propTypes.func,
    form: propTypes.func,
    id: propTypes.string,
    selectUnfinishedEquipmentsById: propTypes.func
  }

  onAddEquipment = ({equipment, amount}) => {
    this.props.saveUnfinshedBooking({
      id: this.props.id,
      name: 'equipments',
      value: { equipment, amount }
    })
  }
  renderAddedEquipments = () => {
    const equipments = this.props.selectUnfinishedEquipmentsById(this.props.id)
    if (equipments) {
      return _.map(equipments, (value, key) => {
        return <div>{value.equipment}{value.amount}</div>
      })
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
  { saveUnfinshedBooking }
  )(Form.create({})(EquipmentSection))
