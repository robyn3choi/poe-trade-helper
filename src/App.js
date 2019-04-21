import React, { Component } from 'react';
import './App.css';
import Nav from './Nav/Nav';
import CardsTable from './CardsTable/CardsTable';
import ScrollToTop from './ScrollToTop/ScrollToTop';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <CardsTable />
        <ScrollToTop />
      </div>
    );
  }
}

export default App;
