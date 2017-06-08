import { AutoComplete, Input, Icon, Button, Select, InputNumber } from 'antd'
const Option = AutoComplete.Option
const InputGroup = Input.Group
const OptGroup = AutoComplete.OptGroup
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './EquipmentsSearch.sass'
import _ from 'lodash'
const dataSource = [
  {
    type: 'prophoto',
    equipment: 'hello1'
  },
  {
    type: 'prophoto',
    equipment: 'hello2'
  },
  {
    type: 'prophoto',
    equipment: 'hello3'
  },
  {
    type: 'prophoto',
    equipment: 'hello4'
  },
  {
    type: 'prophoto',
    equipment: 'hello5'
  },
  {
    type: 'prophoto',
    equipment: 'hello6'
  },
  {
    type: 'prophoto',
    equipment: 'hello7'
  },
  {
    type: 'prophoto',
    equipment: 'hello8'
  },

  {
    type: 'broncolor',
    equipment: 'potato4'
  }
]

class EquipmentSearch extends Component {

  filterOption = (value, option) => {
    return option.props.equipment
  }

  constructor (props) {
    super(props)
    this.data = this.groupDataSource()
  }

  groupDataSource = () => {
    return _(dataSource)
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
    return this.data.map(group => (
      <OptGroup
        key={group.type}
        label={group.type}
      >
        {group.equipments.map(opt => (
          <Option key={opt.equipment} value={opt.equipment}>
            {opt.title}
            <span className='certain-search-item-count'>{opt.equipment}</span>
          </Option>
    ))}
      </OptGroup>
    ))
  }
  filterOption = (value, option) => {
    return new RegExp(value, 'g').test(option.key)
  }

  render () {
    return (
      <div>
        <InputGroup size='large'>
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
          <InputNumber size='large' defaultValue={1} />
          <Button shape='circle' type='primary' icon='plus' className={styles.addButton} />
        </InputGroup>
      </div>
    )
  }
}

export default EquipmentSearch
