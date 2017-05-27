import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Layout } from 'antd'
const { Sider, Header } = Layout
import styles from './Layout.sass'
class LayoutApp extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  render () {
    return (
      <Layout style={{height: '100%'}}>
        <Sider width={200}>
          <div className={styles.logo}>
            <img src={require('../login/images/logo_C2.png')} />
          </div>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            theme='dark'
          >
            <Menu.Item key='1'>
              <Icon type='calendar' /><span className='nav-text'>Schedules</span>
            </Menu.Item>
            <Menu.Item key='2'>
              <Icon type='plus-circle-o' /><span className='nav-text'>Booking</span>
            </Menu.Item>
            <Menu.Item key='3'>
              <Icon type='user' /><span className='nav-text'>Customer</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {this.props.children}
        </Layout>
      </Layout>
    )
  }
}

export default LayoutApp
