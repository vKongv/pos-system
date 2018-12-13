import React, { Component } from 'react';
import { Tabs } from 'antd';
import './App.css';

const TabPane = Tabs.TabPane;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Sales" key="1">
            Record sales here
          </TabPane>
          <TabPane tab="Buying" key="2">
            Record buying transaction here
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
