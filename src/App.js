import React, { Component, Fragment } from 'react';
import { Tabs } from 'antd';

import { calcTotalAmount, calculateGST } from './utils/helpers';
import TransactionList from './TransactionList';
import TaxList from './TaxList';
import './App.css';

const TabPane = Tabs.TabPane;

const getRecordsFromType = (type, state) => {
  switch (type) {
    case 'sales':
      return state.sales;
    case 'expenses':
      return state.expenses;
    case 'taxes':
      return state.taxes;
    default:
      throw new Error('type is not supported');
  }
};

const Profit = ({ totalSales, totalExpenses, salesGst, expensesGst }) => (
  <Fragment>
    <p>Your Sales: RM {totalSales}</p>
    <p>Total Sales GST: RM {salesGst}</p>
    <br />
    <p>Your expenses: RM {totalExpenses}</p>
    <p>Total Expenses GST: RM {expensesGst}</p>
    <br />
    <p>Net profit: RM {totalSales - totalExpenses}</p>
  </Fragment>
);

class App extends Component {
  state = {
    sales: [],
    expenses: [],
    taxes: [],
    currentSelectedTax: undefined
  };

  handleOnAddRecord = type => newRecord => {
    this.setState(prevState => {
      let records = getRecordsFromType(type, prevState);
      return {
        [type]: [...records, { ...newRecord, key: `${records.length + 1}` }]
      };
    });
  };

  handleOnEditRecord = type => newRecord => {
    this.setState(prevState => {
      let records = getRecordsFromType(type, prevState);
      let currentRecord = records.filter(
        record => record.key === newRecord.key
      )[0];
      if (currentRecord) {
        currentRecord.tax = newRecord.tax;
        currentRecord.percentage = newRecord.percentage;
      } else {
        records.push(newRecord);
      }
      return {
        [type]: records
      };
    });
  };

  handleOnTaxChanged = tax => {
    this.setState({ currentSelectedTax: tax });
  };

  render() {
    const { sales, expenses, taxes, currentSelectedTax } = this.state;
    return (
      <div className="root">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Sales" key="1">
            <h1 className="title">Transactions</h1>
            <TransactionList
              transactions={sales}
              tax={currentSelectedTax}
              onAddTransaction={this.handleOnAddRecord('sales')}
            />
          </TabPane>
          <TabPane tab="Expenses" key="2">
            <h1 className="title">Transactions</h1>
            <TransactionList
              transactions={expenses}
              tax={currentSelectedTax}
              onAddTransaction={this.handleOnAddRecord('expenses')}
            />
          </TabPane>
          <TabPane tab="Profit" key="3">
            <h1 className="title">Your Profit</h1>
            <Profit
              totalSales={calcTotalAmount(sales)}
              totalExpenses={calcTotalAmount(expenses)}
              salesGst={calculateGST(sales)}
              expensesGst={calculateGST(expenses)}
            />
          </TabPane>
          <TabPane tab="Tax Configuration" key="4">
            <h1 className="title">Tax Configuration</h1>
            <TaxList
              taxes={taxes}
              onAddTax={this.handleOnAddRecord('taxes')}
              onEditTax={this.handleOnEditRecord('taxes')}
              changeSelectedTax={this.handleOnTaxChanged}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
