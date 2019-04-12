import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from "react-redux";
import { selectLeague, initLeagues } from '../redux/actions';

class LeagueSelection extends Component {
  // do api call for league and set the state to the last one
  componentDidMount() {
    Axios.get('https://api.poe.watch/leagues')
      .then(response => {
        let leagues = [];
        for (let league of response.data) {
          leagues.push(league.display);
        }
        this.props.initLeagues(leagues);
        this.props.selectLeague(leagues[leagues.length - 1]);
      });
  }

  render() {
    console.log(this.props.selectedLeague)
    const options = this.props.leagues.map((league, i) =>
      <option value={league} key={'league' + i}>{league}</option>
    );
    
    return (
      <select className='league-selection' value={this.props.selectedLeague} onChange={e => this.props.selectLeague(e.target.value)}>
        {options}
      </select>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    selectLeague: league => dispatch(selectLeague(league)),
    initLeagues: leagues => dispatch(initLeagues(leagues))
  };
}
const mapStateToProps = state => {
  return {
    selectedLeague: state.selectedLeague,
    leagues: state.leagues
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueSelection);
