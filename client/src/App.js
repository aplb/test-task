import React, { Component } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import Transactions from './components/Transactions/ListContainer';

// may be useful
// https://github.com/mui-org/material-ui/blob/dd45ebaa3fa9277c66d83d978da2e113261db458/docs/src/app/components/CodeExample/CodeBlock.js

class App extends Component {
  componentDidMount() {
    // fetch('/transaction')
    //   .then(r => r.json())
    //   .then(r => console.log('----------', r));
  }
  render() {
    return (
      <div>
        <AppBar />
        <Transactions />
      </div>
    );
  }
}

export default App;
