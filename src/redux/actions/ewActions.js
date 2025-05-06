import {
  ADD_EW_FAIL,
  ADD_EW_REQUEST,
  ADD_EW_SUCCESS,
  ALL_EW_FAIL,
  ALL_EW_REQUEST,
  ALL_EW_SUCCESS,
  DELETE_EW_FAIL,
  DELETE_EW_REQUEST,
  DELETE_EW_SUCCESS,
  SEARCH_EW_FAIL,
  SEARCH_EW_REQUEST,
  SEARCH_EW_SUCCESS,
  UPDATE_EW_FAIL,
  UPDATE_EW_REQUEST,
  UPDATE_EW_SUCCESS
} from '../constaints/EWConstaints';

export const getAllEWRequest = (payload) => ({
  type: ALL_EW_REQUEST,
  payload
});

export const getAllEWSuccess = (payload) => ({
  type: ALL_EW_SUCCESS,
  payload
});

export const getAllEWFail = (payload) => ({
  type: ALL_EW_FAIL,
  payload
});

export const searchEWRequest = (payload) => ({
  type: SEARCH_EW_REQUEST,
  payload
});

export const searchEWSuccess = (payload) => ({
  type: SEARCH_EW_SUCCESS,
  payload
});

export const searchEWFail = (payload) => ({
  type: SEARCH_EW_FAIL,
  payload
});

// ADD
export const addEWRequest = (payload) => ({
  type: ADD_EW_REQUEST,
  payload
});

export const addEWSuccess = (payload) => ({
  type: ADD_EW_SUCCESS,
  payload
});

export const addEWFail = (payload) => ({
  type: ADD_EW_FAIL,
  payload
});

// DELETE
export const deleteEWRequest = (payload) => ({
  type: DELETE_EW_REQUEST,
  payload
});

export const deleteEWSuccess = (payload) => ({
  type: DELETE_EW_SUCCESS,
  payload
});

export const deleteEWFail = (payload) => ({
  type: DELETE_EW_FAIL,
  payload
});

// UPDATE
export const updateEWRequest = (payload) => ({
  type: UPDATE_EW_REQUEST,
  payload
});

export const updateEWSuccess = (payload) => ({
  type: UPDATE_EW_SUCCESS,
  payload
});

export const updateEWFail = (payload) => ({
  type: UPDATE_EW_FAIL,
  payload
});
