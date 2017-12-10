import { AutoComplete, Form, Modal, Select } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { selectEquipmentIdsByEquipmentId } from '../../selectors/equipmentsSelectors'
const Option = AutoComplete.Option

const enhance = compose(
  Form.create({}),
  connect(state => ({
    selectEquipmentIdsByEquipmentId: selectEquipmentIdsByEquipmentId(state)
  }))
)
class EquipmentModalSelector extends Component {
  static propTypes = {
    equipment: PropTypes.string,
    form: PropTypes.object,
    onClickAddIdEquipment: PropTypes.func,
    open: PropTypes.bool,
    selectEquipmentIdsByEquipmentId: PropTypes.func,
    amount: PropTypes.number
  }
  onClickAddIdEquipment = () => {
    this.props.onClickAddIdEquipment()
  }
  renderEquipmentSelects = () => {
    return Array(this.props.amount).fill()
    .map(() => (
      <Form.Item>
        {this.props.form.getFieldDecorator('equipmentx')(
          <Select
            showSearch
            size='large'
            style={{ width: '50%' }}
            placeholder='Select a equipment'
            optionFilterProp='filter'
            filterOption={this.filterOption}
          >
            {this.props.selectEquipmentIdsByEquipmentId(this.props.equipment).map(({ equipmentId }) => (
              <Option key={equipmentId} filter={equipmentId} value={equipmentId}>
                {equipmentId}
              </Option>
            ))}
          </Select>
      )}
      </Form.Item>
    ))
  }

  filterOption = (value, option) => {
    return new RegExp(value.toLowerCase(), 'g').test(option.key.toLowerCase())
  }

  render () {
    return (
      <Modal
        title='Basic Modal'
        visible={this.props.open}
        onCancel={this.onCancel}
      >
        <Form>
          {this.renderEquipmentSelects()}
        </Form>
      </Modal>
    )
  }
}

export default enhance(EquipmentModalSelector)
