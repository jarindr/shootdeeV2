import { Col, Row, Icon, Select, Form, Tag } from 'antd'
import React, { Component } from 'react'

import EquipmentsSearch from '../components/EquipmentsSearch'
import { connect } from 'react-redux'
import { getAllEquipments } from '../../selectors/equipmentsSelectors'
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
    addDefaultEquipment: propTypes.func,
    bookingUnfinishedEquipments: propTypes.array
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
    if (this.props.bookingUnfinishedEquipments) {
      return _.map(this.props.bookingUnfinishedEquipments, (value, key) => (
        <div
          key={value.equipment}
          className={styles.equipmentName}
        >
          <Row>
            <Col xs={10}><Tag color='pink'>{value.type}</Tag>{value.equipment}</Col>
            <Col xs={1}>{value.amount}</Col>
            <Col xs={1}>
              <span
                onClick={this.onClickRemoveEquipment(value.equipment, this.props.id)}
                className={styles.removeEquipmentIcon}
              >
                <Icon type='close-circle-o' />
              </span>
            </Col>
          </Row>
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
            <Select.Option value='profoto'>profoto with lighting</Select.Option>
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
      equipments: getAllEquipments(state)
    }
  },
  { saveUnfinshedBooking, removeUnfinshedEquipment, addDefaultEquipment }
  )(Form.create({})(EquipmentSection))
