import { get } from 'axios';

export const FETCH_PEOPLE = 'FETCH_PEOPLE';
export const FETCH_PLANETS = 'FETCH_PLANETS';

const urlForPeople = 'https://swapi.co/api/people';

export const getPeopleData = (url) => async dispatch => {
  const response = await get(urlForPeople);
  dispatch({type: FETCH_PEOPLE, payload: response.data.results});
};

export const getPlanetsData = (url) => async dispatch => {
  const response = await get(url);
  dispatch({type: FETCH_PLANETS, payload: response.data});
};