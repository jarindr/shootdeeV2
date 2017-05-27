import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Layout, Row, Col } from 'antd'
const { Sider, Header } = Layout
import { withRouter } from 'react-router'
import styles from './Layout.sass'
class LayoutApp extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  getActiveMenu = () => {
    return this.props.location.pathname.split('/')[1]
  }

  renderSideNav = () => {
    return (
      <Sider
        width={200}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className={styles.logo}>
          <img src={require('../login/images/logo_C2.png')} />
        </div>
        <Menu
          mode='inline'
          defaultSelectedKeys={[this.getActiveMenu()]}
          theme='dark'
        >
          <Menu.Item key='schedules'>
            <Icon type='calendar' /><span className='nav-text'>Schedules</span>
          </Menu.Item>
          <Menu.Item key='booking'>
            <Icon type='plus-circle-o' /><span className='nav-text'>Booking</span>
          </Menu.Item>
          <Menu.Item key='equipments'>
            <Icon type='tool' /><span className='nav-text'>Equipments</span>
          </Menu.Item>
          <Menu.Item key='customer'>
            <Icon type='user' /><span className='nav-text'>Customer</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  renderContent = () => {
    return (
      <Layout className={styles.contentContainer}>
        <Header className={styles.topNav}>
          <Icon
            className={styles.icon}
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
        </Header>
        <Row>
          <Col span={20} offset={2}>
            {this.props.children}
          </Col>
        </Row>
      </Layout>
    )
  }
  render () {
    return (
      <Layout style={{height: '100%'}}>
        {this.renderSideNav()}
        {this.renderContent()}
      </Layout>
    )
  }
}

export default withRouter(LayoutApp)
