import { SELECT_LEAGUE, INIT_LEAGUES } from './action-types';

export const selectLeague = league => ({
  type: SELECT_LEAGUE,
  payload: {
    league
  }
});

export const initLeagues = leagues => ({
  type: INIT_LEAGUES,
  payload: {
    leagues
  }
});