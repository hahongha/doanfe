import {
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  SEARCH_USER_FAIL,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from "../constaints/userConstaints";

export const getAllUserRequest = (payload) => ({
  type: ALL_USER_REQUEST,
  payload
});

export const getAllUserSuccess = (payload) => ({
  type: ALL_USER_SUCCESS,
  payload
});

export const getAllUserFail = (payload) => ({
  type: ALL_USER_FAIL,
  payload
});

export const searchUserRequest = (payload) => ({
  type: SEARCH_USER_REQUEST,
  payload
});

export const searchUserSuccess = (payload) => ({
  type: SEARCH_USER_SUCCESS,
  payload
});

export const searchUserFail = (payload) => ({
  type: SEARCH_USER_FAIL,
  payload
});

// ADD
export const addUserRequest = (payload) => ({
  type: ADD_USER_REQUEST,
  payload
});

export const addUserSuccess = (payload) => ({
  type: ADD_USER_SUCCESS,
  payload
});

export const addUserFail = (payload) => ({
  type: ADD_USER_FAIL,
  payload
});

// DELETE
export const deleteUserRequest = (payload) => ({
  type: DELETE_USER_REQUEST,
  payload
});

export const deleteUserSuccess = (payload) => ({
  type: DELETE_USER_SUCCESS,
  payload
});

export const deleteUserFail = (payload) => ({
  type: DELETE_USER_FAIL,
  payload
});

// UPDATE
export const updateUserRequest = (payload) => ({
  type: UPDATE_USER_REQUEST,
  payload
});

export const updateUserSuccess = (payload) => ({
  type: UPDATE_USER_SUCCESS,
  payload
});

export const updateUserFail = (payload) => ({
  type: UPDATE_USER_FAIL,
  payload
});

// UPDATE
export const updatePasswordRequest = (payload) => ({
  type: UPDATE_PASSWORD_REQUEST,
  payload
});

export const updatePasswordSuccess = (payload) => ({
  type: UPDATE_PASSWORD_SUCCESS,
  payload
});

export const updatePasswordFail = (payload) => ({
  type: UPDATE_PASSWORD_FAIL,
  payload
});
