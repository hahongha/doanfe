import {
  ADD_CONTRACT_FAIL,
  ADD_CONTRACT_REQUEST,
  ADD_CONTRACT_SUCCESS,
  ALL_CONTRACT_FAIL,
  ALL_CONTRACT_REQUEST,
  ALL_CONTRACT_SUCCESS,
  DELETE_CONTRACT_FAIL,
  DELETE_CONTRACT_REQUEST,
  DELETE_CONTRACT_SUCCESS,
  SEARCH_CONTRACT_FAIL,
  SEARCH_CONTRACT_REQUEST,
  SEARCH_CONTRACT_SUCCESS,
  UPDATE_CONTRACT_FAIL,
  UPDATE_CONTRACT_REQUEST,
  UPDATE_CONTRACT_SUCCESS
} from 'redux/constaints/contractConstaints';

export const getAllContractRequest = (payload) => ({
  type: ALL_CONTRACT_REQUEST,
  payload
});

export const getAllContractSuccess = (payload) => ({
  type: ALL_CONTRACT_SUCCESS,
  payload
});

export const getAllContractFail = (payload) => ({
  type: ALL_CONTRACT_FAIL,
  payload
});

export const searchContractRequest = (payload) => ({
  type: SEARCH_CONTRACT_REQUEST,
  payload
});

export const searchContractSuccess = (payload) => ({
  type: SEARCH_CONTRACT_SUCCESS,
  payload
});

export const searchContractFail = (payload) => ({
  type: SEARCH_CONTRACT_FAIL,
  payload
});

// ADD
export const addContractRequest = (payload) => ({
  type: ADD_CONTRACT_REQUEST,
  payload
});

export const addContractSuccess = (payload) => ({
  type: ADD_CONTRACT_SUCCESS,
  payload
});

export const addContractFail = (payload) => ({
  type: ADD_CONTRACT_FAIL,
  payload
});

// DELETE
export const deleteContractRequest = (payload) => ({
  type: DELETE_CONTRACT_REQUEST,
  payload
});

export const deleteContractSuccess = (payload) => ({
  type: DELETE_CONTRACT_SUCCESS,
  payload
});

export const deleteContractFail = (payload) => ({
  type: DELETE_CONTRACT_FAIL,
  payload
});

// UPDATE
export const updateContractRequest = (payload) => ({
  type: UPDATE_CONTRACT_REQUEST,
  payload
});

export const updateContractSuccess = (payload) => ({
  type: UPDATE_CONTRACT_SUCCESS,
  payload
});

export const updateContractFail = (payload) => ({
  type: UPDATE_CONTRACT_FAIL,
  payload
});
