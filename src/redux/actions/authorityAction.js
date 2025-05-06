import {
  ADD_AUTHORITY_FAIL,
  ADD_AUTHORITY_REQUEST,
  ADD_AUTHORITY_SUCCESS,
  ALL_AUTHORITY_FAIL,
  ALL_AUTHORITY_REQUEST,
  ALL_AUTHORITY_SUCCESS,
  DELETE_AUTHORITY_FAIL,
  DELETE_AUTHORITY_REQUEST,
  DELETE_AUTHORITY_SUCCESS,
  SEARCH_AUTHORITY_FAIL,
  SEARCH_AUTHORITY_REQUEST,
  SEARCH_AUTHORITY_SUCCESS,
  UPDATE_AUTHORITY_FAIL,
  UPDATE_AUTHORITY_REQUEST,
  UPDATE_AUTHORITY_SUCCESS
} from '../constaints/authotityConstaints';

export const getAllAuthorityRequest = (payload) => ({
  type: ALL_AUTHORITY_REQUEST,
  payload
});

export const getAllAuthoritySuccess = (payload) => ({
  type: ALL_AUTHORITY_SUCCESS,
  payload
});

export const getAllAuthorityFail = (payload) => ({
  type: ALL_AUTHORITY_FAIL,
  payload
});

export const searchAuthorityRequest = (payload) => ({
  type: SEARCH_AUTHORITY_REQUEST,
  payload
});

export const searchAuthoritySuccess = (payload) => ({
  type: SEARCH_AUTHORITY_SUCCESS,
  payload
});

export const searchAuthorityFail = (payload) => ({
  type: SEARCH_AUTHORITY_FAIL,
  payload
});

// ADD
export const addAuthorityRequest = (payload) => ({
  type: ADD_AUTHORITY_REQUEST,
  payload
});

export const addAuthoritySuccess = (payload) => ({
  type: ADD_AUTHORITY_SUCCESS,
  payload
});

export const addAuthorityFail = (payload) => ({
  type: ADD_AUTHORITY_FAIL,
  payload
});

// DELETE
export const deleteAuthorityRequest = (payload) => ({
  type: DELETE_AUTHORITY_REQUEST,
  payload
});

export const deleteAuthoritySuccess = (payload) => ({
  type: DELETE_AUTHORITY_SUCCESS,
  payload
});

export const deleteAuthorityFail = (payload) => ({
  type: DELETE_AUTHORITY_FAIL,
  payload
});

// UPDATE
export const updateAuthorityRequest = (payload) => ({
  type: UPDATE_AUTHORITY_REQUEST,
  payload
});

export const updateAuthoritySuccess = (payload) => ({
  type: UPDATE_AUTHORITY_SUCCESS,
  payload
});

export const updateAuthorityFail = (payload) => ({
  type: UPDATE_AUTHORITY_FAIL,
  payload
});
