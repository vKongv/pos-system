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

import {
  calcTotalAmount,
  calcTotalAmountWithTax,
  calcTotalTax
} from './utils/helpers';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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
    title: 'GST Amount',
    dataIndex: 'tax',
    render: text =>
      Number(text) > 0 ? (
        <span>RM {Number(text).toFixed(2)}</span>
      ) : (
        <span>RM 0.00</span>
      )
  },
  {
    title: 'Amount Incl. Tax',
    render: (text, record) => {
      const taxAmt = record.tax > 0 ? record.tax : 0;
      return <span>RM {Number(record.amount + taxAmt).toFixed(2)}</span>;
    }
  }
];

const Footer = ({ transactions }) => {
  return (
    <div style={{ width: '100%', textAlign: 'right' }}>
      <h3>Total: RM {calcTotalAmount(transactions)}</h3>
      <h3>Total Tax: RM {calcTotalTax(transactions)}</h3>
      <h3>Total After Tax: RM {calcTotalAmountWithTax(transactions)}</h3>
    </div>
  );
};

const AddTransactionModal = ({
  isVisible,
  onConfirm,
  onCancel,
  form,
  gstCategories,
  handleTaxAmountEditable,
  taxAmountEditable
}) => (
  <Modal
    visible={isVisible}
    onOk={onConfirm}
    onCancel={onCancel}
    title="Record a new transaction"
  >
    <FormItem label="Item name">
      {form.getFieldDecorator('item', {
        rules: [{ required: true, message: 'Please provide the item name!' }]
      })(<Input placeholder="Name of your item, eg: Sausage" />)}
    </FormItem>
    <FormItem label="Amount (RM)">
      {form.getFieldDecorator('amount', {
        rules: [{ required: true, message: 'Please provide the amount!' }],
        initialValue: 0
      })(<InputNumber min={1} />)}
    </FormItem>
    <FormItem label="Category">
      {form.getFieldDecorator('category')(
        <RadioGroup onChange={handleTaxAmountEditable}>
          {gstCategories.map((gstCategory, i) => {
            return (
              <Radio.Button key={i} value={gstCategory}>
                {gstCategory.category}
              </Radio.Button>
            );
          })}
        </RadioGroup>
      )}
    </FormItem>
    {taxAmountEditable ? (
      <FormItem label="Tax Amount (RM)">
        {form.getFieldDecorator('tax', {
          rules: [
            { required: false, message: 'Please provide the tax amount!' }
          ],
          initialValue: form.getFieldValue('amount') * 0.06
        })(<InputNumber min={0.0} />)}
      </FormItem>
    ) : null}
  </Modal>
);

class TransactionList extends Component {
  state = {
    isAddTransactionClicked: false,
    gstCategories: [
      { category: 'Sad Shit', gstApplicable: false },
      { category: 'Goods', gstApplicable: true },
      { category: 'Services', gstApplicable: true }
    ],
    taxAmountEditable: false
  };

  handleOnAddTransactionClick = () => {
    this.setState({
      isAddTransactionClicked: true,
      taxAmountEditable: false
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

  handleTaxAmountEditable = e => {
    const category = e.target.value;
    this.setState({
      taxAmountEditable: category.gstApplicable ? true : false
    });
  };

  render() {
    const { transactions, form } = this.props;
    const {
      isAddTransactionClicked,
      gstCategories,
      taxAmountEditable
    } = this.state;

    return (
      <Fragment>
        <AddTransactionModal
          isVisible={isAddTransactionClicked}
          onConfirm={this.handleOnAddConfirm}
          onCancel={this.handleOnAddCancel}
          form={form}
          gstCategories={gstCategories}
          handleTaxAmountEditable={this.handleTaxAmountEditable}
          taxAmountEditable={taxAmountEditable}
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
