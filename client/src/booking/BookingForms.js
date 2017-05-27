import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Form, Input, Row, Col } from 'antd'
import styles from './BookingForms.sass'
const FormItem = Form.Item
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
        labelCol={{sm: {span: 6}}}
        wrapperCol={{sm: {span: 18}}}
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

  createTextAreaForm = (name) => {
    const { getFieldDecorator } = this.props.form
    return (
      <FormItem
        label={name}
        labelCol={{sm: {span: 6}}}
        wrapperCol={{sm: {span: 18}}}
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
          <Col md={12} xs={{span: 22, offset: 1}}>
            <Form onSubmit={this.handleSubmit}>
              {this.createInputForm('client')}
              {this.createInputForm('assignment')}
              {this.createTextAreaForm('job description')}
            </Form>
          </Col>
          <Col sm={11} />
        </Row>
      </div>
    )
  }
}

export default Form.create({})(NormalLoginForm)
