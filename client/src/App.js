import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    fetch('/transaction')
      .then(r => r.json())
      .then(r => console.log('----------', r));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>
src/App.js
</code>
{' '}
and save to reload.
</p>
      </div>
    );
  }
}

export default App;
