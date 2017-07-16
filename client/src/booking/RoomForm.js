import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Select, DatePicker, TimePicker } from 'antd'
import styles from './RoomForm.sass'
const FormItem = Form.Item
const Option = Select.Option
import EquipmentsSection from './EquipmentsSection'
import _ from 'lodash'
import moment from 'moment'
class RoomForm extends Component {

  static propTypes = {
    form: PropTypes.object,
    saveUnfinshedBooking: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    bookingUnfinished: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    assignment: PropTypes.string,
    removeUnfinshedEquipment: PropTypes.func,
    addDefaultEquipment: PropTypes.func,
    equipments: PropTypes.array
  }

  createSelectRoomForm = () => {
    const initialValue = this.props.bookingUnfinished.room
    const selectSet = {
      'Studio rental': ['S', 'M', 'L', 'XL', 'G'],
      'Equipment rental': ['NOTHING'],
      'Studio rental + Location': ['S', 'M', 'L', 'XL', 'G', 'O'],
      'Onscreen room': ['O'],
      'Production': ['S', 'M', 'L', 'XL', 'G', 'O']
    }
    return this.props.assignment !== 'Equipment rental' ? (
      <FormItem
        label={'room'}
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {this.props.form.getFieldDecorator('room', { initialValue })(
          <Select>
            {selectSet[this.props.assignment].map(r => {
              return (
                <Option value={r} key={r}>
                  {r === 'O' ? 'Onscreen room' : `Studio room ${r}`}
                </Option>)
            })}
          </Select>
      )}
      </FormItem>
    ) : null
  }
  createSelectStatusForm = () => {
    const initialValue = this.props.bookingUnfinished.status

    return (
      <FormItem
        label={'status'}
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {this.props.form.getFieldDecorator('status', { initialValue })(
          <Select>
            <Option value='TENTATIVE'>Tentative</Option>
            <Option value='CONFIRM'>Confirm</Option>
            <Option value='CANCEL'>Cancel</Option>
          </Select>
      )}
      </FormItem>

    )
  }
  renderDatePickerForm = () => {
    const initialValue = this.props.bookingUnfinished.date.map(x => moment(x))
    return (
      <FormItem
        label={'date'}
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {this.props.form.getFieldDecorator('date', {initialValue})(
          <DatePicker.RangePicker
            format={'dddd DD MMMM YYYY'}
            style={{width: '100%'}}
          />
      )}
      </FormItem>
    )
  }

  renderTimePickerForm = (name) => {
    const initialValue = moment(this.props.bookingUnfinished[name])
    const getFilteredRange = (hr) => {
      const result = []
      for (let i = 0; i < 60; i++) {
        if (i !== 30 && i !== 0) {
          result.push(i)
        }
      }
      return result
    }

    return (
      <FormItem
        label={name}
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {this.props.form.getFieldDecorator(name, {initialValue})(
          <TimePicker
            format='HH:mm'
            hideDisabledOptions
            disabledMinutes={getFilteredRange}
            onChange={this.onTimePickerChange}
          />
      )}
      </FormItem>
    )
  }
  renderAssistantForm = () => {
    const initialValue = this.props.bookingUnfinished.assistants
    return (
      <FormItem
        label='assistant'
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {this.props.form.getFieldDecorator('assistants', {initialValue})(
          <Select
            mode='multiple'
            placeholder='Please select assistants'
          >
            <Option value='Big'>Big</Option>
            <Option value='Ann'>Ann</Option>
            <Option value='Kwan'>Kwan</Option>
            <Option value='Potato'>Potato</Option>
          </Select>
        )}
      </FormItem>
    )
  }
  render () {
    return (
      <div>
        <Row className={styles.container}>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              {this.createSelectRoomForm()}
              {this.renderDatePickerForm()}
              {this.renderTimePickerForm('startTime')}
              {this.renderTimePickerForm('endTime')}
              {this.createSelectStatusForm()}
              {this.renderAssistantForm()}
            </Form>
          </Col>
          <Col md={6} />
        </Row>
        <h2 className={styles.equipmentHeader}>Equipments</h2>
        <Row>
          <EquipmentsSection
            id={this.props.bookingUnfinished.id}
            saveUnfinshedBooking={this.props.saveUnfinshedBooking}
            bookingUnfinishedEquipments={this.props.bookingUnfinished.equipments}
            preset={this.props.bookingUnfinished.preset}
            removeUnfinshedEquipment={this.props.removeUnfinshedEquipment}
            addDefaultEquipment={this.props.addDefaultEquipment}
            equipments={this.props.equipments}
          />
        </Row>
      </div>
    )
  }
}

function onFieldsChange (props, field) {
  const updateField = _.map(field, (value) => value)[0]
  const entity = { ...updateField, ...{ id: props.bookingUnfinished.id } }
  props.saveUnfinshedBooking(entity)
}

export default Form.create({onFieldsChange})(RoomForm)
