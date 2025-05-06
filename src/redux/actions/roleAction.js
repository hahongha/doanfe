import {
  ADD_ROLE_FAIL,
  ADD_ROLE_REQUEST,
  ADD_ROLE_SUCCESS,
  ALL_ROLE_FAIL,
  ALL_ROLE_REQUEST,
  ALL_ROLE_SUCCESS,
  DELETE_ROLE_FAIL,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  SEARCH_ROLE_FAIL,
  SEARCH_ROLE_REQUEST,
  SEARCH_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL,
  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS
} from '../constaints/RoleConstaints';

export const getAllRoleRequest = (payload) => ({
  type: ALL_ROLE_REQUEST,
  payload
});

export const getAllRoleSuccess = (payload) => ({
  type: ALL_ROLE_SUCCESS,
  payload
});

export const getAllRoleFail = (payload) => ({
  type: ALL_ROLE_FAIL,
  payload
});

export const searchRoleRequest = (payload) => ({
  type: SEARCH_ROLE_REQUEST,
  payload
});

export const searchRoleSuccess = (payload) => ({
  type: SEARCH_ROLE_SUCCESS,
  payload
});

export const searchRoleFail = (payload) => ({
  type: SEARCH_ROLE_FAIL,
  payload
});

// ADD
export const addRoleRequest = (payload) => ({
  type: ADD_ROLE_REQUEST,
  payload
});

export const addRoleSuccess = (payload) => ({
  type: ADD_ROLE_SUCCESS,
  payload
});

export const addRoleFail = (payload) => ({
  type: ADD_ROLE_FAIL,
  payload
});

// DELETE
export const deleteRoleRequest = (payload) => ({
  type: DELETE_ROLE_REQUEST,
  payload
});

export const deleteRoleSuccess = (payload) => ({
  type: DELETE_ROLE_SUCCESS,
  payload
});

export const deleteRoleFail = (payload) => ({
  type: DELETE_ROLE_FAIL,
  payload
});

// UPDATE
export const updateRoleRequest = (payload) => ({
  type: UPDATE_ROLE_REQUEST,
  payload
});

export const updateRoleSuccess = (payload) => ({
  type: UPDATE_ROLE_SUCCESS,
  payload
});

export const updateRoleFail = (payload) => ({
  type: UPDATE_ROLE_FAIL,
  payload
});
