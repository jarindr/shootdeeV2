import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Form, Input, Row, Col, Select, DatePicker, TimePicker } from 'antd'
import styles from './JobInformationForms.sass'
import AssistantForm from './AssistantForm'
const FormItem = Form.Item
const Option = Select.Option
import EquipmentsSection from './EquipmentsSection'
class NormalLoginForm extends Component {

  static propTypes = {
    form: propTypes.object
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
        labelCol={{sm: {span: 5}}}
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
        labelCol={{sm: {span: 5}}}
        wrapperCol={{sm: {span: 10}}}
      >
        <Select defaultValue='S'>
          <Option value='S'>Studio room S</Option>
          <Option value='M'>Studio room M</Option>
          <Option value='L'>Studio room L</Option>
          <Option value='XL'>Studio room XL</Option>
          <Option value='G'>Studio room G</Option>
        </Select>
      </FormItem>

    )
  }
  createSelectStatusForm = () => {
    return (
      <FormItem
        label={'status'}
        labelCol={{sm: {span: 5}}}
        wrapperCol={{sm: {span: 10}}}
      >
        <Select defaultValue='Tentative'>
          <Option value='Tentative'>Tentative</Option>
          <Option value='Confirm'>Confirm</Option>
          <Option value='Cancel'>Cancel</Option>
        </Select>
      </FormItem>

    )
  }
  renderDatePickerForm = () => {
    return (
      <FormItem
        label={'date'}
        labelCol={{sm: {span: 5}}}
        wrapperCol={{sm: {span: 10}}}
      >
        <DatePicker style={{width: '100%'}} />
      </FormItem>
    )
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
        labelCol={{sm: {span: 5}}}
        wrapperCol={{sm: {span: 10}}}
      >
        <TimePicker
          format='HH:mm'
          hideDisabledOptions
          disabledMinutes={getFilteredRange}
        />
      </FormItem>
    )
  }
  renderAssistantForm = () => {
    return (
      <FormItem
        label='assistant'
        labelCol={{sm: {span: 5}}}
        wrapperCol={{sm: {span: 10}}}
      >
        <AssistantForm />
      </FormItem>
    )
  }
  createTextAreaForm = (name) => {
    const { getFieldDecorator } = this.props.form
    return (
      <FormItem
        label={name}
        labelCol={{sm: {span: 5}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {getFieldDecorator(name, {
          rules: [{ required: false, message: 'this field can\'t be empty!' }]
        })(
          <Input
            size='large'
            placeholder={name}
            type='textarea'
            autosize={{minRows: 5, maxRows: 10}}
          />
            )}
      </FormItem>
    )
  }

  render () {
    return (
      <div>
        <Row className={styles.container}>
          <Col md={16} xs={{span: 22, offset: 1}}>
            <Form onSubmit={this.handleSubmit}>
              {this.createSelectRoomForm()}
              {this.renderDatePickerForm()}
              {this.renderTimePickerForm('start time')}
              {this.renderTimePickerForm('end time')}
              {this.createSelectStatusForm()}
              {this.renderAssistantForm()}
            </Form>
          </Col>
          <Col md={6} />
        </Row>
        <h1>Equipments</h1>
        <Row>
          <EquipmentsSection />
        </Row>
      </div>
    )
  }
}

export default Form.create({})(NormalLoginForm)
