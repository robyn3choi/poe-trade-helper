import React, { Component } from 'react';
import './Nav.scss';
import LeagueSelection from './LeagueSelection/LeagueSelection';

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="nav__logo">Path of Trade</div>
        {<LeagueSelection />}
      </div>
    );
  }
}

export default Nav;
