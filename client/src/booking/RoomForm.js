import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Select, DatePicker, TimePicker } from 'antd'
import styles from './RoomForm.sass'
const FormItem = Form.Item
const Option = Select.Option
import EquipmentsSection from './EquipmentsSection'
import _ from 'lodash'
class NormalLoginForm extends Component {

  static propTypes = {
    form: PropTypes.object,
    saveUnfinshedBooking: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    bookingUnfinished: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    id: PropTypes.string // eslint-disable-line react/no-unused-prop-types
  }

  constructor (props) {
    super(props)
    this.state = {
      loginState: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loginState: true })
      }
    })
  }

  createSelectRoomForm = () => {
    const initialValue = this.props.bookingUnfinished.get('room')
    return (
      <FormItem
        label={'room'}
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {this.props.form.getFieldDecorator('room', {initialValue})(
          <Select>
            <Option value='S'>Studio room S</Option>
            <Option value='M'>Studio room M</Option>
            <Option value='L'>Studio room L</Option>
            <Option value='XL'>Studio room XL</Option>
            <Option value='G'>Studio room G</Option>
          </Select>
      )}
      </FormItem>

    )
  }
  createSelectStatusForm = () => {
    const initialValue = this.props.bookingUnfinished.get('status')

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
    const initialValue = this.props.bookingUnfinished.get('date')
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
    const initialValue = this.props.bookingUnfinished.get(name)
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
    return (
      <FormItem
        label='assistant'
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {this.props.form.getFieldDecorator('assistants')(
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
          <EquipmentsSection id={this.props.id} />
        </Row>
      </div>
    )
  }
}

function onFieldsChange (props, field) {
  const updateField = _.map(field, (value) => value)[0]
  const entity = { ...updateField, ...{ id: props.id } }
  props.saveUnfinshedBooking(entity)
}

export default Form.create({onFieldsChange})(NormalLoginForm)
