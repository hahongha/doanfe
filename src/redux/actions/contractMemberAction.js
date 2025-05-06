import {
  ADD_CONTRACT_MEMBER_FAIL,
  ADD_CONTRACT_MEMBER_REQUEST,
  ADD_CONTRACT_MEMBER_SUCCESS,
  ALL_CONTRACT_MEMBER_FAIL,
  ALL_CONTRACT_MEMBER_REQUEST,
  ALL_CONTRACT_MEMBER_SUCCESS,
  DELETE_CONTRACT_MEMBER_FAIL,
  DELETE_CONTRACT_MEMBER_REQUEST,
  DELETE_CONTRACT_MEMBER_SUCCESS,
  SEARCH_CONTRACT_MEMBER_FAIL,
  SEARCH_CONTRACT_MEMBER_REQUEST,
  SEARCH_CONTRACT_MEMBER_SUCCESS,
  UPDATE_CONTRACT_MEMBER_FAIL,
  UPDATE_CONTRACT_MEMBER_REQUEST,
  UPDATE_CONTRACT_MEMBER_SUCCESS
} from '../constaints/contractMemberConstaints';

export const getAllContractMemberRequest = (payload) => ({
  type: ALL_CONTRACT_MEMBER_REQUEST,
  payload
});

export const getAllContractMemberSuccess = (payload) => ({
  type: ALL_CONTRACT_MEMBER_SUCCESS,
  payload
});

export const getAllContractMemberFail = (payload) => ({
  type: ALL_CONTRACT_MEMBER_FAIL,
  payload
});

export const searchContractMemberRequest = (payload) => ({
  type: SEARCH_CONTRACT_MEMBER_REQUEST,
  payload
});

export const searchContractMemberSuccess = (payload) => ({
  type: SEARCH_CONTRACT_MEMBER_SUCCESS,
  payload
});

export const searchContractMemberFail = (payload) => ({
  type: SEARCH_CONTRACT_MEMBER_FAIL,
  payload
});

// ADD
export const addContractMemberRequest = (payload) => ({
  type: ADD_CONTRACT_MEMBER_REQUEST,
  payload
});

export const addContractMemberSuccess = (payload) => ({
  type: ADD_CONTRACT_MEMBER_SUCCESS,
  payload
});

export const addContractMemberFail = (payload) => ({
  type: ADD_CONTRACT_MEMBER_FAIL,
  payload
});

// DELETE
export const deleteContractMemberRequest = (payload) => ({
  type: DELETE_CONTRACT_MEMBER_REQUEST,
  payload
});

export const deleteContractMemberSuccess = (payload) => ({
  type: DELETE_CONTRACT_MEMBER_SUCCESS,
  payload
});

export const deleteContractMemberFail = (payload) => ({
  type: DELETE_CONTRACT_MEMBER_FAIL,
  payload
});

// UPDATE
export const updateContractMemberRequest = (payload) => ({
  type: UPDATE_CONTRACT_MEMBER_REQUEST,
  payload
});

export const updateContractMemberSuccess = (payload) => ({
  type: UPDATE_CONTRACT_MEMBER_SUCCESS,
  payload
});

export const updateContractMemberFail = (payload) => ({
  type: UPDATE_CONTRACT_MEMBER_FAIL,
  payload
});
