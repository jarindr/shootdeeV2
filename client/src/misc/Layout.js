import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Layout, Row, Col } from 'antd'
const { Sider, Header } = Layout
import { withRouter, Route } from 'react-router'
import styles from './Layout.sass'
import ViewJob from '../components/ViewJob'
class LayoutApp extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    history: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  componentWillReceiveProps (nextProps) {

  }

  getActiveMenu = () => {
    return this.props.location.pathname.split('/')[1]
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  renderTriggerSideNav = () => {
    return (
      <div onClick={this.toggle}>
        <Icon
          className={styles.icon}
          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
        />
      </div>
    )
  }

  onClickMenu = ({item, key, keypath}) => {
    if (this.props.location.pathname.split('/')[1] !== key) {
      if (key === 'booking') {
        this.props.history.push(`/booking/job/`)
      } else {
        this.props.history.push(`/${key}/`)
      }
    }
  }
  renderSideNav = () => {
    return (
      <Sider
        trigger={this.renderTriggerSideNav()}
        collapsible
        collapsed={this.state.collapsed}
        style={{overflow: 'hidden'}}
      >
        <div className={styles.logo}>
          {this.state.collapsed
          ? <img src={require('../login/images/small.png')} />
          : <img src={require('../login/images/logo_C2.png')} />
          }
        </div>
        <Menu
          mode='inline'
          selectedKeys={[this.getActiveMenu()]}
          theme='dark'
          onClick={this.onClickMenu}
        >
          <Menu.Item key='calendar'>
            <Icon type='calendar' />{!this.state.collapsed && <span className='nav-text'>Calendar</span>}
          </Menu.Item>
          <Menu.Item key='schedules'>
            <Icon type='calendar' />{!this.state.collapsed && <span className='nav-text'>Schedules</span>}
          </Menu.Item>
          <Menu.Item key='booking'>
            <Icon type='plus-circle-o' />{!this.state.collapsed && <span className='nav-text'>Booking</span>}
          </Menu.Item>
          <Menu.Item key='equipments'>
            <Icon type='tool' />{!this.state.collapsed && <span className='nav-text'>Equipments</span>}
          </Menu.Item>
          <Menu.Item key='customer'>
            <Icon type='user' />{!this.state.collapsed && <span className='nav-text'>Customer</span>}
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }

  renderContent = () => {
    return (
      <Layout className={styles.contentContainer}>
        <Header className={styles.topNav}>
          <Icon type='down' /><span style={{marginLeft: '5px'}}>Jarindr</span> <Icon type='user' />
        </Header>
        <Route path='/' component={ViewJob} />
        <Row className={styles.innerContentContainer}>
          <Col span={22} offset={1}>
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
