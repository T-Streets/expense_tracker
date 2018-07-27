import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import XpenseTracker from './Components/XpenseTracker';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Xpense Tracker</h1>
        </header>
        <XpenseTracker />

      </div>
    );
  }
}

export default App;
