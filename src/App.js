import React, { Component } from 'react';
import { Tabs } from 'antd';
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
}

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

  handleOnAddExpensesRecord

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
            Calculate profit here
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
