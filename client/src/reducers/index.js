import {
  START_TIME,
  START_TIME_SUCCESS,
  START_TIME_FAILURE,
  GET_TIME,
  GET_TIME_SUCCESS,
  GET_TIME_FAILURE,
  FETCH_EMAIL,
  FETCH_EMAIL_FOUND,
  FETCH_EMAIL_NOTFOUND,
  FETCH_EMAIL_FAILURE,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE
} from "../actions";

const initialState = {
  error: null, timerStarted: false, gettingTime: false, gettingEmail: false, users: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {

    case START_TIME:
      return { ...state, timerStarted: true };
    case START_TIME_SUCCESS:
      return {
        ...state,
        timerStarted: false
      };
    case START_TIME_FAILURE:
      return { ...state, timerStarted: false, error: action.payload };
    case GET_TIME:
      return { ...state, gettingTime: true };
    case GET_TIME_SUCCESS:
      return { ...state, gettingTime: false };
    case GET_TIME_FAILURE:
      return { ...state, gettingTime: false, error: action.payload };
    case FETCH_EMAIL:
      return { ...state, gettingEmail: true };
    case FETCH_EMAIL_FOUND:
      return { ...state, gettingEmail: false, users: action.payload };
    case FETCH_EMAIL_NOTFOUND:
      return { ...state, gettingEmail: false, error: action.payload };
    case FETCH_EMAIL_FAILURE:
      return { ...state, gettingEmail: false, users: [], error: action.payload  };
    default:
      return state;
  }
};

export default reducer;
