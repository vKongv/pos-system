import React, { Component, Fragment } from 'react';
import { Tabs } from 'antd';

import { calcTotalAmount, calcGSTAmount } from './utils/helpers';
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

const Profit = ({ totalSales, totalExpenses, totalGST }) => (
  <Fragment>
    <p>Your sales: RM {totalSales}</p>
    <p>Your expenses: RM {totalExpenses}</p>
    <p>Total GST: RM {totalGST.toFixed(2)}</p>
    <p>Net profit: RM {(totalSales - totalExpenses).toFixed(2)}</p>
  </Fragment>
);

class App extends Component {
  state = {
    sales: [
      {
        key: '1',
        item: 'Shoes',
        gst: 3,
        amount: 100,
        totalgst: 12.31,
        total: 112.31
      }
    ],
    expenses: [
      {
        key: '1',
        item: 'Some random thing',
        gst: 3,
        amount: 10,
        totalgst: 11.3,
        total: 111.1
      }
    ]
  };

  handleOnAddRecord = type => newRecord => {
    this.setState(prevState => {
      let records = getRecordsFromType(type, prevState);
      return {
        [type]: [
          ...records,
          {
            ...newRecord,
            totalgst: `${(newRecord.amount * newRecord.gst) / 100}`,
            total: `${(newRecord.amount * newRecord.gst) / 100 +
              newRecord.amount}`,
            key: `${records.length + 1}`
          }
        ]
      };
    });
  };

  render() {
    const { sales, expenses, totalgst } = this.state;
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
            <h1 className="title">Your Profit</h1>
            <Profit
              totalSales={calcTotalAmount(sales)}
              totalExpenses={calcTotalAmount(expenses)}
              totalGST={
                Number(calcGSTAmount(sales)) + Number(calcGSTAmount(expenses))
              }
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
