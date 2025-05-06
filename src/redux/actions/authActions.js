// redux/actions/authActions.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAIL,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  RESTORE_SESSION
} from '../constaints/authConstaints';

export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload
});
export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload
});

export const loginFail = (payload) => ({
  type: LOGIN_FAIL,
  payload
});

export const getUserInfoRequest = () => ({
  type: GET_USER_INFO_REQUEST
});

export const getUserInfoSuccess = (userInfo) => ({
  type: GET_USER_INFO_SUCCESS,
  payload: userInfo
});

export const getUserInfoFailure = (error) => ({
  type: GET_USER_INFO_FAILURE,
  error
});

export const getAllUserRequest = (payload) => ({
  type: GET_ALL_USER_REQUEST,
  payload
});

export const getAllUserSuccess = (payload) => ({
  type: GET_ALL_USER_SUCCESS,
  payload
});

export const getAllUserFail = (payload) => ({
  type: GET_ALL_USER_FAIL,
  payload
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});
export const refreshTokenRequest = () => ({
  type: REFRESH_TOKEN_REQUEST
});

export const refreshTokenSuccess = (data) => ({
  type: REFRESH_TOKEN_SUCCESS,
  data
});

export const refreshTokenFail = (error) => ({
  type: REFRESH_TOKEN_FAIL,
  error
});

export const restoreSession = (accessToken, refreshToken) => ({
  type: RESTORE_SESSION,
  payload: { accessToken, refreshToken }
});
