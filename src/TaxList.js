import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  Row,
  Modal,
  Form,
  Input,
  InputNumber,
  Radio
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const columns = [
  {
    title: 'No.',
    dataIndex: 'key'
  },
  {
    title: 'Tax',
    dataIndex: 'tax'
  },
  {
    title: 'Activate this',
    render: (text, record) => (
      <Radio value={record} checked={record.key === 1} />
    )
  },
  {
    title: 'Percentage (%)',
    dataIndex: 'percentage',
    className: 'column-amount',
    render: text => <span>{Number(text).toFixed(2)}</span>
  }
];

const AddTaxModal = ({ isVisible, onConfirm, onCancel, form }) => (
  <Modal
    visible={isVisible}
    onOk={onConfirm}
    onCancel={onCancel}
    title="Record a new tax"
    okText="Record"
  >
    <FormItem label="Tax Name">
      {form.getFieldDecorator('tax', {
        rules: [{ required: true, message: 'Please provide the tax name!' }]
      })(<Input placeholder="Tax Name, eg: GST / Sausage / Pizza" />)}
    </FormItem>
    <FormItem label="Percentage (%)">
      {form.getFieldDecorator('percentage', {
        rules: [
          { required: true, message: 'Please provide the tax percentage!' }
        ]
      })(<InputNumber min={0} step={0.01} />)}
    </FormItem>
  </Modal>
);

const EditTaxModal = ({ isVisible, onConfirm, onCancel, form }) => (
  <Modal
    visible={isVisible}
    onOk={onConfirm}
    onCancel={onCancel}
    title="Edit tax"
    okText="Record"
  >
    <FormItem label="Tax Name">
      {form.getFieldDecorator('tax', {
        rules: [{ required: true, message: 'Please provide the tax name!' }]
      })(<Input placeholder="Tax Name, eg: GST / Sausage / Pizza" />)}
    </FormItem>
    <FormItem label="Percentage (%)">
      {form.getFieldDecorator('percentage', {
        rules: [
          { required: true, message: 'Please provide the tax percentage!' }
        ]
      })(<InputNumber min={0} step={0.01} />)}
    </FormItem>
  </Modal>
);

class TaxList extends Component {
  state = {
    isAddTaxClicked: false,
    isEditTaxClicked: false,
    currentTaxRecord: {},
    selectedTax: {}
  };

  handleOnAddTaxClick = () => {
    this.props.form.setFieldsValue({
      tax: '',
      percentage: ''
    });
    this.setState({
      isAddTaxClicked: true
    });
  };

  handleOnEditTaxClick = record => {
    this.props.form.setFieldsValue({
      tax: record.tax,
      percentage: record.percentage
    });
    this.setState({
      isEditTaxClicked: true,
      currentTaxRecord: record
    });
  };

  handleOnAddConfirm = () => {
    const { form, onAddTax } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onAddTax(values);
        this.setState({
          isAddTaxClicked: false
        });
        form.resetFields();
      }
    });
  };

  handleOnAddCancel = () => {
    this.setState({
      isAddTaxClicked: false
    });
  };

  handleOnEditConfirm = () => {
    const { form, onEditTax } = this.props;
    form.validateFields((err, values) => {
      values.key = this.state.currentTaxRecord.key;
      if (!err) {
        onEditTax(values);
        this.setState({
          isEditTaxClicked: false
        });
        form.resetFields();
      }
    });
  };

  handleOnEditCancel = () => {
    this.setState({
      isEditTaxClicked: false
    });
  };

  onTaxChange = e => {
    this.setState({ selectedTax: e.target.value });
    this.props.changeSelectedTax(e.target.value);
  };

  render() {
    const { taxes, form } = this.props;
    const { isAddTaxClicked, isEditTaxClicked, selectedTax } = this.state;

    return (
      <Fragment>
        <AddTaxModal
          isVisible={isAddTaxClicked}
          onConfirm={this.handleOnAddConfirm}
          onCancel={this.handleOnAddCancel}
          form={form}
        />
        <EditTaxModal
          isVisible={isEditTaxClicked}
          onConfirm={this.handleOnEditConfirm}
          onCancel={this.handleOnEditCancel}
          form={form}
        />
        <Row style={{ marginBottom: '12px' }}>
          <Button onClick={this.handleOnAddTaxClick}>Add a tax</Button>
        </Row>
        <RadioGroup onChange={this.onTaxChange} value={selectedTax}>
          <Table
            columns={columns}
            dataSource={taxes}
            pagination={false}
            onRow={record => {
              return {
                onClick: () => {
                  this.handleOnEditTaxClick(record);
                }
              };
            }}
          />
        </RadioGroup>
      </Fragment>
    );
  }
}

TaxList.propTypes = {
  form: PropTypes.object.isRequired,
  onAddTax: PropTypes.func.isRequired,
  onEditTax: PropTypes.func.isRequired,
  taxes: PropTypes.array.isRequired,
  changeSelectedTax: PropTypes.func.isRequired
};

TaxList.defaultProps = {
  taxes: [],
  onAddTax: () => {},
  onEditTax: () => {}
};

export default Form.create()(TaxList);
