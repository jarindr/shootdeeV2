import { AutoComplete } from 'antd'
const Option = AutoComplete.Option
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const dataSource = [
  {
    type: 'prophoto',
    equipment: 'hello'
  },
  {
    type: 'prophoto',
    equipment: 'hello'
  },
  {
    type: 'prophoto',
    equipment: 'hello'
  },
  {
    type: 'broncolor',
    equipment: 'potato'
  }
]

class EquipmentSearch extends Component {

  filterOption = (value, option) => {
    return option.props.equipment
  }

  renderOption = () => {

  }

  render () {
    return (
      <AutoComplete
        style={{ width: 200 }}
        dataSource={dataSource}
        placeholder='try to type `b`'
        filterOption={this.filterOption}
      />
    )
  }
}

export default EquipmentSearch
