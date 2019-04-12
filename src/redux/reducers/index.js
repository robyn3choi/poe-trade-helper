import { SELECT_LEAGUE, INIT_LEAGUES } from './../action-types';

const initialState = {
    leagues: [],
    selectedLeague: ''
};

const rootReducer = (state = initialState, action) => {
    if (action.type === SELECT_LEAGUE) {
        return Object.assign({}, state, {
            selectedLeague: action.payload.league
        });
    }
    else if (action.type === INIT_LEAGUES) {
        return Object.assign({}, state, {
            leagues: action.payload.leagues
        });
    }
    return state;
};

export default rootReducer;
