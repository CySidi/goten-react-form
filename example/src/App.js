import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ExampleGotenForm from './exampleGotenForm';

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">GotenTextField Examples</h1>
        </header>
        <div className="App-body">
          <ExampleGotenForm/>
        </div>
      </div>
    );
  }
}

export default App;
