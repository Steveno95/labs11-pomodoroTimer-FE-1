import axios from 'axios';

export const FETCHING_USERS = 'FETCHING_USERS';
export const FETCHING_USERS_SUCCESS = 'FETCHING_USERS_SUCCESS';
export const FETCHING_USERS_FAILURE = 'FETCHING_USERS_FAILURE';

export const fetchUsers = () => dispatch => {
  dispatch({ type: FETCHING_USERS });
  axios
    .get('https://swapi.co/api/people')
    .then(response => {
      dispatch({ type: FETCHING_USERS_SUCCESS, payload: response.data.results });
    })
    .catch(error => {
      dispatch({ type: FETCHING_USERS_FAILURE, payload: error });
    });
};