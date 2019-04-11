import React, { Component } from 'react';
import './App.css';
import Nav from './Nav/Nav';
import CardsTable from './CardsTable/CardsTable';
import Axios from 'axios';

class App extends Component {
  state = { league: '' }

  setLeague = (league) => {
    this.setState({league: league});
  }

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
