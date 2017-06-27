import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Form, Input, Row, Col, Select } from 'antd'
import styles from './JobInformationForms.sass'
import { connect } from 'react-redux'
import { selectjobInfoUnfinished } from '../../selectors/jobUnfinishedSelectors'
import { saveUnfinshedJob } from '../../actions/jobInfoUnfinishedActions'
const FormItem = Form.Item
const Option = Select.Option
class NormalLoginForm extends Component {

  static propTypes = {
    form: propTypes.object,
    job: propTypes.object,
    saveUnfinshedJob: propTypes.func // eslint-disable-line react/no-unused-prop-types
  }

  createInputForm = () => {
    const { getFieldDecorator } = this.props.form
    return (
      <FormItem
        label='client'
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {getFieldDecorator('customer')(
          <Input
            size='large'
            placeholder='client'
            type='input'
          />
        )
        }
      </FormItem>
    )
  }

  createSelectForm = () => {
    const { getFieldDecorator } = this.props.form
    return (
      <FormItem
        label={'assignment'}
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {getFieldDecorator('assignment', {initialValue: 'Studio rental'})(
          <Select>
            <Option value='Studio rental'>Studio rental</Option>
            <Option value='Studio rental + Location'>Studio rental + Location</Option>
            <Option value='Equipment rental'>Equipment rental</Option>
            <Option value='Onscreen room'>Onscreen room</Option>
            <Option value='Production'>Production</Option>
          </Select>
      )}
      </FormItem>

    )
  }
  createTextAreaForm = (name) => {
    const { getFieldDecorator } = this.props.form
    return (
      <FormItem
        label={'job description'}
        labelCol={{sm: {span: 4}}}
        wrapperCol={{sm: {span: 10}}}
      >
        {getFieldDecorator('description')(
          <Input
            size='large'
            placeholder={name}
            type='textarea'
            autosize={{minRows: 5, maxRows: 10}}
          />
            )}
      </FormItem>
    )
  }

  render () {
    return (
      <div className={styles.container}>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                labelCol={{sm: {span: 4}}}
                wrapperCol={{sm: {span: 10}}}
                label='quotation'
              >
                <span>{this.props.job.get('id')}</span>
              </FormItem>
              {this.createInputForm()}
              {this.createSelectForm()}
              {this.createTextAreaForm()}
            </Form>
          </Col>
          <Col md={6} />
        </Row>
      </div>
    )
  }
}

function onFieldsChange (props, field) {
  const updateField = _.map(field, value => value)[0]
  props.saveUnfinshedJob(updateField)
}

export default connect(state => {
  return { job: selectjobInfoUnfinished(state) }
}, { saveUnfinshedJob })(Form.create({onFieldsChange})(NormalLoginForm))
