import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Form, Input, Row, Col, Select } from 'antd'
import styles from './BookingForms.sass'
const FormItem = Form.Item
const Option = Select.Option
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
        wrapperCol={{sm: {span: 14}}}
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

  createSelectForm = () => {
    return (
      <FormItem
        label={'assignment'}
        labelCol={{sm: {span: 5}}}
        wrapperCol={{sm: {span: 14}}}
      >
        <Select defaultValue='lucy'>
          <Option value='jack'>Jack</Option>
          <Option value='lucy'>Lucy</Option>
          <Option value='disabled' disabled>Disabled</Option>
          <Option value='Yiminghe'>yiminghe</Option>
        </Select>
      </FormItem>

    )
  }
  createTextAreaForm = (name) => {
    const { getFieldDecorator } = this.props.form
    return (
      <FormItem
        label={name}
        labelCol={{sm: {span: 5}}}
        wrapperCol={{sm: {span: 14}}}
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
      <div className={styles.container}>
        <Row>
          <Col md={16} xs={{span: 22, offset: 1}}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                labelCol={{sm: {span: 5}}}
                wrapperCol={{sm: {span: 14}}}
                label='quotation'
              >
                <span>Q0000001</span>
              </FormItem>
              {this.createInputForm('client')}
              {this.createSelectForm()}
              {this.createTextAreaForm('job description')}
            </Form>
          </Col>
          <Col md={6} />
        </Row>
      </div>
    )
  }
}

export default Form.create({})(NormalLoginForm)
