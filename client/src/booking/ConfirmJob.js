import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './ConfirmJob.sass'
import { Row, Col } from 'antd'
class ConfirmJob extends Component {

  static propTypes = {
    bookingUnfinished: PropTypes.array
  }
  renderAddedEquipments = (equipments) => {
    const group = _.groupBy(equipments, 'type')
    if (equipments) {
      return _.map(group, (value, key) => (
        <div key={key}>
          <div className={styles.equipmentGroup}>[ {key} ]</div>
          {_.map(value, eq => (
            <div
              key={eq.equipment}
              className={styles.equipmentName}
            >
              <Row>
                <Col xs={20}>{eq.equipment}</Col>
                <Col xs={4}>{eq.amount}</Col>
              </Row>
            </div>
          ))}
        </div>
      ))
    }
  }
  render () {
    return (
      <div>
        {_.values(this.props.bookingUnfinished).map(booking => {
          return (
            <Row className={styles.bookingRow} key={booking.id}>
              <Col sm={14}>
                <div>
                  {booking.room}
                </div>
                <div>
                  {booking.date.map(d => d.toString()).join(' ')}
                </div>
                <div>
                  {booking.assistants}
                </div>
                <div>
                  {booking.status}
                </div>
              </Col>
              <Col sm={10}>{this.renderAddedEquipments(booking.equipments)}</Col>
            </Row>
          )
        })}

      </div>
    )
  }
}

export default ConfirmJob
