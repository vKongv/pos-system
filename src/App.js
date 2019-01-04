import React, { Component, Fragment } from 'react';
import { Tabs } from 'antd';

import { calcTotalAmount, calcTotalTax } from './utils/helpers';
import TransactionList from './TransactionList';
import './App.css';

const TabPane = Tabs.TabPane;

const getRecordsFromType = (type, state) => {
  switch (type) {
    case 'sales':
      return state.sales;
    case 'expenses':
      return state.expenses;
    default:
      throw new Error('type is not supported');
  }
};

const Profit = ({
  totalSales,
  totalExpenses,
  totalSalesTaxes,
  totalExpensesTaxes
}) => (
  <Fragment>
    <p>Your sales (before tax): RM {totalSales}</p>
    <p>
      Your sales (after tax): RM{' '}
      {(Number(totalSales) + Number(totalSalesTaxes)).toFixed(2)}
    </p>
    <p>Your expenses (before tax): RM {totalExpenses}</p>
    <p>
      Your expenses (after tax): RM{' '}
      {(Number(totalExpenses) + Number(totalExpensesTaxes)).toFixed(2)}
    </p>
    <p>
      Nettt Profit: RM{' '}
      {(
        Number(totalSales) +
        Number(totalSalesTaxes) -
        Number(totalExpenses) +
        Number(totalExpensesTaxes)
      ).toFixed(2)}
    </p>
    <hr />
    <p>
      Nettt Tax: RM{' '}
      {(Number(totalSalesTaxes) - Number(totalExpensesTaxes)).toFixed(2)}
    </p>
  </Fragment>
);

class App extends Component {
  state = {
    sales: [],
    expenses: []
  };

  handleOnAddRecord = type => newRecord => {
    this.setState(prevState => {
      let records = getRecordsFromType(type, prevState);
      return {
        [type]: [...records, { ...newRecord, key: `${records.length + 1}` }]
      };
    });
  };

  render() {
    const { sales, expenses } = this.state;
    return (
      <div className="root">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Sales" key="1">
            <h1 className="title">Transactions</h1>
            <TransactionList
              transactions={sales}
              onAddTransaction={this.handleOnAddRecord('sales')}
            />
          </TabPane>
          <TabPane tab="Expenses" key="2">
            <h1 className="title">Transactions</h1>
            <TransactionList
              transactions={expenses}
              onAddTransaction={this.handleOnAddRecord('expenses')}
            />
          </TabPane>
          <TabPane tab="Profit" key="3">
            <h1 className="title">Your Report</h1>
            <Profit
              totalSales={calcTotalAmount(sales)}
              totalExpenses={calcTotalAmount(expenses)}
              totalSalesTaxes={calcTotalTax(sales)}
              totalExpensesTaxes={calcTotalTax(expenses)}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
