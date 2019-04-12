import React, { Component } from 'react';
import './App.css';
import Nav from './Nav/Nav';
import CardsTable from './CardsTable/CardsTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <CardsTable />
      </div>
    );
  }
}

export default App;
