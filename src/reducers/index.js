import { combineReducers } from 'redux';

import { FETCH_PEOPLE } from '../actions';
import { FETCH_PLANETS } from '../actions';

const initialState = {
  people: [],
  planets: []
}

const dataReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case FETCH_PEOPLE: return {...state, people: action.payload};
    case FETCH_PLANETS: return {...state, planets: action.payload};
    default: return state;
  };
};

const reducers = combineReducers({
  data: dataReducer
});


export default reducers;