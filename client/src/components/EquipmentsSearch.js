import { AutoComplete, Input, Form, Button, Select, InputNumber } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './EquipmentsSearch.sass'
import _ from 'lodash'

const Option = AutoComplete.Option
const InputGroup = Input.Group
const OptGroup = AutoComplete.OptGroup

class EquipmentSearch extends Component {
  static propTypes = {
    equipments: PropTypes.array,
    onAddEquipment: PropTypes.func,
    getFieldDecorator: PropTypes.func
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
            <Option key={opt.description} value={opt.description}>
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

  render () {
    return (
      <Form.Item>
        {this.props.getFieldDecorator('equipmentSelect')(
          <Select
            showSearch
            size='large'
            style={{ width: '50%' }}
            placeholder='Select a equipment'
            optionFilterProp='value'
            filterOption={this.filterOption}
          >
            {this.renderOption()}
          </Select>
        )}
        {this.props.getFieldDecorator('number', { initialValue: 1 })(
          <InputNumber size='large' />
        )}
        <Button
          shape='circle'
          type='primary'
          icon='plus'
          className={styles.addButton}
          onClick={this.props.onAddEquipment}
        />
      </Form.Item>
    )
  }
}

export default EquipmentSearch
