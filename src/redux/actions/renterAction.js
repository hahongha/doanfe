import {
  ADD_RENTER_FAIL,
  ADD_RENTER_REQUEST,
  ADD_RENTER_SUCCESS,
  ALL_RENTER_FAIL,
  ALL_RENTER_REQUEST,
  ALL_RENTER_SUCCESS,
  DELETE_RENTER_FAIL,
  DELETE_RENTER_REQUEST,
  DELETE_RENTER_SUCCESS,
  SEARCH_RENTER_FAIL,
  SEARCH_RENTER_REQUEST,
  SEARCH_RENTER_SUCCESS,
  UPDATE_RENTER_FAIL,
  UPDATE_RENTER_REQUEST,
  UPDATE_RENTER_SUCCESS
} from '../constaints/renterConstaints';

export const getAllRenterRequest = (payload) => ({
  type: ALL_RENTER_REQUEST,
  payload
});

export const getAllRenterSuccess = (payload) => ({
  type: ALL_RENTER_SUCCESS,
  payload
});

export const getAllRenterFail = (payload) => ({
  type: ALL_RENTER_FAIL,
  payload
});

export const searchRenterRequest = (payload) => ({
  type: SEARCH_RENTER_REQUEST,
  payload
});

export const searchRenterSuccess = (payload) => ({
  type: SEARCH_RENTER_SUCCESS,
  payload
});

export const searchRenterFail = (payload) => ({
  type: SEARCH_RENTER_FAIL,
  payload
});

// ADD
export const addRenterRequest = (payload) => ({
  type: ADD_RENTER_REQUEST,
  payload
});

export const addRenterSuccess = (payload) => ({
  type: ADD_RENTER_SUCCESS,
  payload
});

export const addRenterFail = (payload) => ({
  type: ADD_RENTER_FAIL,
  payload
});

// DELETE
export const deleteRenterRequest = (payload) => ({
  type: DELETE_RENTER_REQUEST,
  payload
});

export const deleteRenterSuccess = (payload) => ({
  type: DELETE_RENTER_SUCCESS,
  payload
});

export const deleteRenterFail = (payload) => ({
  type: DELETE_RENTER_FAIL,
  payload
});

// UPDATE
export const updateRenterRequest = (payload) => ({
  type: UPDATE_RENTER_REQUEST,
  payload
});

export const updateRenterSuccess = (payload) => ({
  type: UPDATE_RENTER_SUCCESS,
  payload
});

export const updateRenterFail = (payload) => ({
  type: UPDATE_RENTER_FAIL,
  payload
});
