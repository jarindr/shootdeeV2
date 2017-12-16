import { Col, Row, Icon, Select, Form, Tag } from 'antd'
import React, { Component } from 'react'

import EquipmentsSearch from '../components/EquipmentsSearch'
import EquipmentIdModalSelector from '../components/EquipmentIdModalSelectors'
import propTypes from 'prop-types'
import styles from './EquipmentsSection.sass'
import _ from 'lodash'
class EquipmentSection extends Component {

  static propTypes = {
    form: propTypes.object,
    id: propTypes.string,
    equipments: propTypes.array,
    saveUnfinshedBooking: propTypes.func,
    removeUnfinshedEquipment: propTypes.func,
    addDefaultEquipment: propTypes.func,
    bookingUnfinishedEquipments: propTypes.array,
    preset: propTypes.string
  }

  state = {
    modalEquipmentIdVisibility: false
  }

  onAddEquipment = (data) => {
    const { equipment, type } = JSON.parse(data.equipment)
    this.props.saveUnfinshedBooking({
      id: this.props.id,
      name: 'equipments',
      value: { equipment, amount: data.amount, type }
    })
  }
  onAddEquipmentId = (data) => {
    this.props.saveUnfinshedBooking({
      id: this.props.id,
      name: 'usedEquipmentIds',
      value: { usedEquipmentIds: {
        [data.equipmentId]: data.usedEquipmentIds
      }}
    })
  }

  onClickRemoveEquipment = (equipmentId, bookingId) => (e) => {
    this.props.removeUnfinshedEquipment(equipmentId, bookingId)
  }

  onClickAddIdEquipment = (description, amount) => (e) => {
    this.setState({
      modalEquipmentIdVisibility: true,
      modalEquipmentId: description,
      modalEquipmentAmount: amount
    })
  }

  onSelectPreset = (preset) => {
    this.props.saveUnfinshedBooking({
      id: this.props.id,
      name: 'preset',
      value: preset
    })
    this.props.addDefaultEquipment(this.props.id, preset)
  }

  renderAddedEquipments = () => {
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
          <Col>
            <span
              onClick={this.onClickAddIdEquipment(value.equipment, value.amount)}
              className={styles.removeEquipmentIcon}
            >
              <Icon type='tool' />
            </span>
          </Col>
        </Row>
        <Row>
          <Col xs={10} />
        </Row>
      </div>
      ))
  }

  renderPresetSelect = () => {
    const getFieldDecorator = this.props.form.getFieldDecorator
    return (
      <Form.Item
        label='preset'
        labelCol={{ sm: { span: 2 } }}
        wrapperCol={{ sm: { span: 6 } }}
      >
        {getFieldDecorator('preset', { initialValue: this.props.preset })(
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
            <EquipmentIdModalSelector
              equipment={this.state.modalEquipmentId}
              open={this.state.modalEquipmentIdVisibility}
              amount={this.state.modalEquipmentAmount}
            />
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

export default (Form.create({})(EquipmentSection))
