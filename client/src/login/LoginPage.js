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
        this.setState({ loginState: true })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className={styles.loginForm} wow='1'>
        <img src={require('./images/logo_A2.png')} className={styles.logo} />
        <FormItem className={styles.form}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username.' }]
          })(
            <Input
              size='large'
              prefix={<Icon type='user' style={{ fontSize: 13 }} />}
              placeholder='Username'
              disabled={this.state.loginState}
              className={styles.input}
            />
            )}
        </FormItem>
        <FormItem className={styles.form}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password.' }]
          })(
            <Input
              size='large'
              prefix={<Icon type='lock' />}
              style={{ fontSize: 13 }}
              type='password'
              placeholder='Password'
              disabled={this.state.loginState}
              className={styles.input}
            />
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

const WrappedNormalLoginForm = Form.create({
  onFieldsChange: (props, field) => console.log(props, field)
})(NormalLoginForm)

class LoginPage extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <WrappedNormalLoginForm />
          <div className={styles.copyright}>
            <Icon type='copyright' /> Copyright shootdee studio 2017
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
