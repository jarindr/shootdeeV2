import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Row, Col, Select, DatePicker, TimePicker } from 'antd'
import styles from './JobInformationForms.sass'
const FormItem = Form.Item
const Option = Select.Option
import EquipmentsSection from './EquipmentsSection'
import moment from 'moment'
import _ from 'lodash'
class NormalLoginForm extends Component {

  static propTypes = {
    form: PropTypes.object,
    saveUnfinshedBooking: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    selectBookingUnfinishedById: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
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

  createInputForm = (name, { type = 'input', required = true } = {}) => {
    const { getFieldDecorator } = this.props.form
    return (
      <FormItem
        label={name}
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {getFieldDecorator(name, {
          rules: [{ required, message: 'this field can\'t be empty!' }]
        })(
          <Input
            size='large'
            placeholder={name}
            type={type}
          />
            )}
      </FormItem>
    )
  }

  createSelectRoomForm = () => {
    return (
      <FormItem
        label={'room'}
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {this.props.form.getFieldDecorator('room', {initialValue: 'S'})(
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
    const { bookingUnfinished } = this.props.selectBookingUnfinishedById(this.props.id)
    const initialValue = bookingUnfinished.get('status') || 'Tentative'

    return (
      <FormItem
        label={'status'}
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {this.props.form.getFieldDecorator('status', { initialValue })(
          <Select>
            <Option value='Tentative'>Tentative</Option>
            <Option value='Confirm'>Confirm</Option>
            <Option value='Cancel'>Cancel</Option>
          </Select>
      )}
      </FormItem>

    )
  }
  renderDatePickerForm = () => {
    return (
      <FormItem
        label={'date'}
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {this.props.form.getFieldDecorator('date')(
          <DatePicker style={{width: '100%'}} />
      )}
      </FormItem>
    )
  }
  onTimePickerChange = (time, x) => {
    console.log(time, x)
  }
  renderTimePickerForm = (name) => {
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
        {this.props.form.getFieldDecorator(name, {initialValue: moment('09:00', 'HH:mm')})(
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
        <h2>Equipments</h2>
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
  props.onChangeField(entity)
  props.saveUnfinshedBooking(entity)
}

export default Form.create({onFieldsChange})(NormalLoginForm)
