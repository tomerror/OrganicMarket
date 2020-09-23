import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Organic from './Organic/Organic';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Organic />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
