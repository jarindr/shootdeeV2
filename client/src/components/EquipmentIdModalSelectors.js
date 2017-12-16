import { AutoComplete, Form, Modal, Select } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { selectEquipmentIdsByEquipmentId } from '../../selectors/equipmentsSelectors'
const Option = AutoComplete.Option

const enhance = compose(
  Form.create({onFieldsChange}),
  connect(state => ({
    selectEquipmentIdsByEquipmentId: selectEquipmentIdsByEquipmentId(state)
  }))
)
function onFieldsChange (props, field) {
  const usedEquipmentEntity = _.map(field, ({ name, value }) => ({ name, value }))[0]
  props.onAddEquipmentId({
    equipmentName: props.equipment,
    usedEquipmentId: usedEquipmentEntity.value,
    index: usedEquipmentEntity.name })
}
class EquipmentModalSelector extends Component {
  static propTypes = {
    equipment: PropTypes.string,
    form: PropTypes.object,
    onClickAddIdEquipment: PropTypes.func,
    open: PropTypes.bool,
    selectEquipmentIdsByEquipmentId: PropTypes.func,
    onCancel: PropTypes.func,
    onAddEquipmentId: PropTypes.func,
    amount: PropTypes.number
  }

  state = {
    selectedEquipmentId: []
  }

  onClickAddIdEquipment = () => {
    this.props.onClickAddIdEquipment()
  }
  renderEquipmentSelects = () => {
    return Array(this.props.amount).fill()
    .map((x, i) => (
      <Form.Item>
        {this.props.form.getFieldDecorator(String(i))(
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
        title={this.props.equipment}
        visible={this.props.open}
        onCancel={this.props.onCancel}
      >
        <Form>
          {this.renderEquipmentSelects()}
        </Form>
      </Modal>
    )
  }
}

export default enhance(EquipmentModalSelector)
