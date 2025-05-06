import {
  GET_ALL_USER_FAIL,
  GET_ALL_USER_SUCCESS,
  GET_USER_INFO_FAILURE,
  GET_USER_INFO_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_FAIL,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  RESTORE_SESSION
} from '../constaints/authConstaints';

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('profile')) || {},
  allUser: [],
  accessToken: localStorage.getItem('access_token') || null,
  refreshToken: localStorage.getItem('refresh_token') || null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        userInfo: action.payload,
        error: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
        loading: false,
        error: action.payload
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        allUser: action.payload?.data,
        error: null
      };
    case GET_ALL_USER_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
        allUser: [],
        error: null
      };
    case REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        loading: false
      };
    case REFRESH_TOKEN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        error: action.error,
        loading: false
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload?.data
      };
    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        userInfo: null,
        error: action.error
      };
    case RESTORE_SESSION:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    default:
      return state;
  }
};

export default authReducer;
