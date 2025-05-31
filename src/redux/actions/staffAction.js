import {
  ADD_STAFF_FAIL,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCESS,
  ALL_STAFF_FAIL,
  ALL_STAFF_REQUEST,
  ALL_STAFF_SUCCESS,
  DELETE_STAFF_FAIL,
  DELETE_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  SEARCH_STAFF_FAIL,
  SEARCH_STAFF_REQUEST,
  SEARCH_STAFF_SUCCESS,
  UPDATE_STAFF_FAIL,
  UPDATE_STAFF_REQUEST,
  UPDATE_STAFF_SUCCESS
} from '../constaints/staffConstaints';

export const getAllStaffRequest = (payload) => ({
  type: ALL_STAFF_REQUEST,
  payload
});

export const getAllStaffSuccess = (payload) => ({
  type: ALL_STAFF_SUCCESS,
  payload
});

export const getAllStaffFail = (payload) => ({
  type: ALL_STAFF_FAIL,
  payload
});

export const searchStaffRequest = (payload) => ({
  type: SEARCH_STAFF_REQUEST,
  payload
});

export const searchStaffSuccess = (payload) => ({
  type: SEARCH_STAFF_SUCCESS,
  payload
});

export const searchStaffFail = (payload) => ({
  type: SEARCH_STAFF_FAIL,
  payload
});

// ADD
export const addStaffRequest = (payload) => ({
  type: ADD_STAFF_REQUEST,
  payload
});

export const addStaffSuccess = (payload) => ({
  type: ADD_STAFF_SUCCESS,
  payload
});

export const addStaffFail = (payload) => ({
  type: ADD_STAFF_FAIL,
  payload
});

// DELETE
export const deleteStaffRequest = (payload) => ({
  type: DELETE_STAFF_REQUEST,
  payload
});

export const deleteStaffSuccess = (payload) => ({
  type: DELETE_STAFF_SUCCESS,
  payload
});

export const deleteStaffFail = (payload) => ({
  type: DELETE_STAFF_FAIL,
  payload
});

// UPDATE
export const updateStaffRequest = (payload) => ({
  type: UPDATE_STAFF_REQUEST,
  payload
});

export const updateStaffSuccess = (payload) => ({
  type: UPDATE_STAFF_SUCCESS,
  payload
});

export const updateStaffFail = (payload) => ({
  type: UPDATE_STAFF_FAIL,
  payload
});
