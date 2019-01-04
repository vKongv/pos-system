import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Row, Modal, Form, Input, InputNumber } from 'antd';

import { calcTotalAmount, calcGSTAmount } from './utils/helpers';

const FormItem = Form.Item;

const columns = [
  {
    title: 'No.',
    dataIndex: 'key'
  },
  {
    title: 'Item',
    dataIndex: 'item'
  },
  {
    title: 'Amount (RM)',
    dataIndex: 'amount',
    className: 'column-amount',
    render: text => <span>{Number(text).toFixed(2)}</span>
  },
  {
    title: 'GST (%)',
    dataIndex: 'gst',
    className: 'column-gst',
    render: text => <span>{Number(text)}</span>
  },
  {
    title: 'Total GST (RM)',
    dataIndex: 'totalgst',
    className: 'column-totalgst',
    render: text => <span>{Number(text).toFixed(2)}</span>
  },
  {
    title: 'Total Amount (RM)',
    dataIndex: 'total',
    className: 'column-total',
    render: text => <span>{Number(text).toFixed(2)}</span>
  }
];

const Footer = ({ transactions }) => {
  return (
    <div style={{ width: '100%', textAlign: 'right' }}>
      <h3>Total GST: RM {calcGSTAmount(transactions)}</h3>
      <h3>Total: RM {calcTotalAmount(transactions)}</h3>
    </div>
  );
};

const AddTransactionModal = ({ isVisible, onConfirm, onCancel, form }) => (
  <Modal
    visible={isVisible}
    onOk={onConfirm}
    onCancel={onCancel}
    title="Record a new transaction"
    okText="Record"
  >
    <FormItem label="Item name">
      {form.getFieldDecorator('item', {
        rules: [{ required: true, message: 'Please provide the item name!' }]
      })(<Input placeholder="Name of your item, eg: Sausage" />)}
    </FormItem>
    <FormItem label="Amount (RM)">
      {form.getFieldDecorator('amount', {
        rules: [{ required: true, message: 'Please provide the amount!' }]
      })(<InputNumber min={1} />)}
    </FormItem>
    <FormItem label="GST Percentage (%)">
      {form.getFieldDecorator('gst', {
        rules: [{ required: true, message: 'Please provide the GST amount!' }]
      })(<InputNumber min={1} />)}
    </FormItem>
  </Modal>
);

class TransactionList extends Component {
  state = {
    isAddTransactionClicked: false
  };

  handleOnAddTransactionClick = () => {
    this.setState({
      isAddTransactionClicked: true
    });
  };

  handleOnAddConfirm = () => {
    const { form, onAddTransaction } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onAddTransaction(values);
        this.setState({
          isAddTransactionClicked: false
        });
        form.resetFields();
      }
    });
  };

  handleOnAddCancel = () => {
    this.setState({
      isAddTransactionClicked: false
    });
  };

  render() {
    const { transactions, form } = this.props;
    const { isAddTransactionClicked } = this.state;

    return (
      <Fragment>
        <AddTransactionModal
          isVisible={isAddTransactionClicked}
          onConfirm={this.handleOnAddConfirm}
          onCancel={this.handleOnAddCancel}
          form={form}
        />
        <Row style={{ marginBottom: '12px' }}>
          <Button onClick={this.handleOnAddTransactionClick}>
            Add a transaction
          </Button>
        </Row>
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={false}
          footer={() => <Footer transactions={transactions} />}
        />
      </Fragment>
    );
  }
}

TransactionList.propTypes = {
  form: PropTypes.object.isRequired,
  onAddTransaction: PropTypes.func.isRequired,
  transactions: PropTypes.array.isRequired
};

TransactionList.defaultProps = {
  transactions: [],
  onAddTransaction: () => {}
};

export default Form.create()(TransactionList);
