import {
  ADD_SERVICE_FAIL,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_SUCCESS,
  ALL_SERVICE_FAIL,
  ALL_SERVICE_REQUEST,
  ALL_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  SEARCH_SERVICE_FAIL,
  SEARCH_SERVICE_REQUEST,
  SEARCH_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS
} from '../constaints/serviceConstaints';

export const getAllServiceRequest = (payload) => ({
  type: ALL_SERVICE_REQUEST,
  payload
});

export const getAllServiceSuccess = (payload) => ({
  type: ALL_SERVICE_SUCCESS,
  payload
});

export const getAllServiceFail = (payload) => ({
  type: ALL_SERVICE_FAIL,
  payload
});

export const searchServiceRequest = (payload) => ({
  type: SEARCH_SERVICE_REQUEST,
  payload
});

export const searchServiceSuccess = (payload) => ({
  type: SEARCH_SERVICE_SUCCESS,
  payload
});

export const searchServiceFail = (payload) => ({
  type: SEARCH_SERVICE_FAIL,
  payload
});

// ADD
export const addServiceRequest = (payload) => ({
  type: ADD_SERVICE_REQUEST,
  payload
});

export const addServiceSuccess = (payload) => ({
  type: ADD_SERVICE_SUCCESS,
  payload
});

export const addServiceFail = (payload) => ({
  type: ADD_SERVICE_FAIL,
  payload
});

// DELETE
export const deleteServiceRequest = (payload) => ({
  type: DELETE_SERVICE_REQUEST,
  payload
});

export const deleteServiceSuccess = (payload) => ({
  type: DELETE_SERVICE_SUCCESS,
  payload
});

export const deleteServiceFail = (payload) => ({
  type: DELETE_SERVICE_FAIL,
  payload
});

// UPDATE
export const updateServiceRequest = (payload) => ({
  type: UPDATE_SERVICE_REQUEST,
  payload
});

export const updateServiceSuccess = (payload) => ({
  type: UPDATE_SERVICE_SUCCESS,
  payload
});

export const updateServiceFail = (payload) => ({
  type: UPDATE_SERVICE_FAIL,
  payload
});
