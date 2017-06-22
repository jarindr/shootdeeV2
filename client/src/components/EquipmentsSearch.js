import { AutoComplete, Form, Button, Select, InputNumber } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './EquipmentsSearch.sass'
import _ from 'lodash'

const Option = AutoComplete.Option
const OptGroup = AutoComplete.OptGroup
class EquipmentSearch extends Component {
  static propTypes = {
    equipments: PropTypes.array,
    onAddEquipment: PropTypes.func,
    getFieldDecorator: PropTypes.func,
    form: PropTypes.object
  }

  groupDataSource = () => {
    return _(this.props.equipments)
    .uniqBy('description')
    .groupBy(x => x.type)
    .map((value, key) => {
      return {
        type: key,
        equipments: value
      }
    }
    ).value()
  }

  renderOption = () => {
    if (this.props.equipments) {
      return this.groupDataSource().map(group => (
        <OptGroup
          key={group.type}
          label={group.type}
        >
          {group.equipments.map(opt => (
            <Option key={opt.description} filter={opt.description} value={JSON.stringify({ equipment: opt.description, type: group.type })}>
              {opt.description}
            </Option>
          ))}
        </OptGroup>
      ))
    }
    return []
  }
  filterOption = (value, option) => {
    return new RegExp(value.toLowerCase(), 'g').test(option.key.toLowerCase())
  }

  onAddEquipment = (e) => {
    const { equipment, amount, type } = this.props.form.getFieldsValue()
    this.props.onAddEquipment({equipment, amount, type})
  }

  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('equipment')(
            <Select
              showSearch
              size='large'
              style={{ width: '50%' }}
              placeholder='Select a equipment'
              optionFilterProp='filter'
              filterOption={this.filterOption}
            >
              {this.renderOption()}
            </Select>
        )}
          {getFieldDecorator('amount', { initialValue: 1 })(
            <InputNumber size='large' />
        )}
          <Button
            shape='circle'
            type='primary'
            icon='plus'
            className={styles.addButton}
            onClick={this.onAddEquipment}

          />
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({})(EquipmentSearch)
