import React, { Component } from 'react';
import Axios from 'axios';

class LeagueSelection extends Component {
  state = { leagues: [] };

  // do api call for league and set the state to the last one - https://api.poe.watch/leagues
  componentDidMount() {
    Axios.get('https://api.poe.watch/leagues')
      .then(response => {
        let leagues = [];
        for (let league in response) {
          leagues.push(league.display);
        }
        this.setState({ leagues: leagues });
        this.props.setLeague(leagues[leagues.length - 1]);
      });
  }

  render() {
    const options = this.state.leagues.map((league, i) =>
      <option value={league}>{league}</option>
    );

    return (
      <select className='league-selection'>
        {options}
      </select>
    );
  }
}

export default LeagueSelection;
