import React, { Component, Fragment } from 'react';
import { Tabs } from 'antd';

import { calcTotalAmount } from './utils/helpers';
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

const Profit = ({ totalSales, totalExpenses }) => (
  <Fragment>
    <p>Your sales: RM {totalSales}</p>
    <p>Your expenses: RM {totalExpenses}</p>
    <p>Net profit: RM {totalSales - totalExpenses}</p>
  </Fragment>
);

class App extends Component {
  state = {
    sales: [{ key: '1', item: 'Shoes', amount: 100 }],
    expenses: [{ key: '1', item: 'Some random thing', amount: 10 }]
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
            <h1 className="title">Your Profit</h1>
            <Profit
              totalSales={calcTotalAmount(sales)}
              totalExpenses={calcTotalAmount(expenses)}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
