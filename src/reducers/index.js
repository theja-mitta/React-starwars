import { combineReducers } from 'redux';

import { FETCH_PEOPLE } from '../actions';
import { FETCH_PLANETS } from '../actions';

const initialState = {
  dataObject: {},
  people: [],
  planets: [],
  url: 'https://swapi.co/api/planets/'
}


const wholeDataReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case FETCH_PLANETS: return {...state, dataObject: action.payload};
    default: return state;
  };
};


const endPointReducer = ( state=initialState, action) => {
  switch (action.type) {
    case FETCH_PLANETS: return {...state, url: action.payload.next};
    default: return state;
  };
}


const dataReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case FETCH_PEOPLE: return {...state, people: action.payload};
    case FETCH_PLANETS: return {...state, planets: state.planets.concat(action.payload.results)};
    default: return state;
  };
};



const reducers = combineReducers({
  data: dataReducer,
  url: endPointReducer,
  fullData: wholeDataReducer
});


export default reducers;