import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'
import styles from './LoginPage.sass'

const FormItem = Form.Item
class NormalLoginForm extends React.Component {

  static propTypes = {
    form: propTypes.node
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
        console.log('Received values of form: ', values)
      }
    })
  }

  onLoginButtonClick = (e) => {
    this.setState({loginState: !this.state.loginState})
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
        <img src={require('./images/logo_A2.jpg')} className={styles.logo} />
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username.' }]
          })(
            <Input size='large' prefix={<Icon type='user' style={{ fontSize: 13 }} />} placeholder='Username' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password.' }]
          })(
            <Input size='large' prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password' placeholder='Password' />
          )}
        </FormItem>
        <FormItem>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className={styles.loginFormButton}
            onClick={this.onLoginButtonClick}
            loading={this.state.loginState}
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

class LoginPage extends Component {
  render () {
    return (
      <div className={styles.container}>
        <WrappedNormalLoginForm />
        <div className={styles.background} />
      </div>
    )
  }
}

export default LoginPage
