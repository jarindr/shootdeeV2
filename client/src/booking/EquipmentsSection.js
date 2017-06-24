import { Col, Row, Icon, Select, Form } from 'antd'
import React, { Component } from 'react'

import EquipmentsSearch from '../components/EquipmentsSearch'
import { connect } from 'react-redux'
import { getAllEquipments } from '../../selectors/equipmentsSelectors'
import { selectGetBookingUnfinishedEquipmentsById } from '../../selectors/bookingUnfinishedSelectors'
import {
  saveUnfinshedBooking,
  removeUnfinshedEquipment,
  addDefaultEquipment
} from '../../actions/bookingUnfinishedActions'
import propTypes from 'prop-types'
import styles from './EquipmentsSection.sass'
import _ from 'lodash'
class EquipmentSection extends Component {

  static propTypes = {
    form: propTypes.func,
    id: propTypes.string,
    equipments: propTypes.number,
    saveUnfinshedBooking: propTypes.func,
    removeUnfinshedEquipment: propTypes.func,
    selectUnfinishedEquipmentsById: propTypes.func,
    addDefaultEquipment: propTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      activeCheckbox: 'NO_LIGHTING'
    }
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
          <div className={styles.equipmentGroup}>[ {key} ]</div>
          {_.map(value, eq => (
            <div
              key={eq.equipment}
              className={styles.equipmentName}
            >
              <Row>
                <Col xs={10}>{eq.equipment}</Col>
                <Col xs={1}>{eq.amount}</Col>
                <Col xs={1}>
                  <span
                    onClick={this.onClickRemoveEquipment(eq.equipment, this.props.id)}
                    className={styles.removeEquipmentIcon}
                  >
                    <Icon type='close-circle-o' />
                  </span>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      ))
    }
    return null
  }

  onSelectPreset = (preset) => {
    this.props.addDefaultEquipment(this.props.id, preset)
  }

  renderPresetSelect = () => {
    const getFieldDecorator = this.props.form.getFieldDecorator
    return (
      <Form.Item
        label='preset'
        labelCol={{sm: {span: 2}}}
        wrapperCol={{sm: {span: 6}}}
      >
        {getFieldDecorator('preset', {initialValue: 'no'})(
          <Select
            showSearch
            placeholder='Please select preset'
            onChange={this.onSelectPreset}
          >
            <Select.Option value='no'>No lighting</Select.Option>
            <Select.Option value='prophoto'>Prophoto with lighting</Select.Option>
            <Select.Option value='broncolor'>Broncolor with lighting</Select.Option>
          </Select>
        )}
      </Form.Item>
    )
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.container}>
        <Row>
          <Col>
            <Form>
              {this.renderPresetSelect()}
            </Form>
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
  { saveUnfinshedBooking, removeUnfinshedEquipment, addDefaultEquipment }
  )(Form.create({})(EquipmentSection))
