import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import XpenseTracker from './Components/XpenseTracker';
import Login from './Components/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Login} />
            <Route exact path='/xpense-tracker' component={XpenseTracker} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
