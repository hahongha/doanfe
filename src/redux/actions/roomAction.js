import {
  ADD_ROOM_FAIL,
  ADD_ROOM_REQUEST,
  ADD_ROOM_SUCCESS,
  ALL_ROOM_FAIL,
  ALL_ROOM_REQUEST,
  ALL_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  SEARCH_ROOM_FAIL,
  SEARCH_ROOM_REQUEST,
  SEARCH_ROOM_SUCCESS,
  UPDATE_ROOM_FAIL,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS
} from '../constaints/roomConstaints';

export const getAllRoomRequest = (payload) => ({
  type: ALL_ROOM_REQUEST,
  payload
});

export const getAllRoomSuccess = (payload) => ({
  type: ALL_ROOM_SUCCESS,
  payload
});

export const getAllRoomFail = (payload) => ({
  type: ALL_ROOM_FAIL,
  payload
});

export const searchRoomRequest = (payload) => ({
  type: SEARCH_ROOM_REQUEST,
  payload
});

export const searchRoomSuccess = (payload) => ({
  type: SEARCH_ROOM_SUCCESS,
  payload
});

export const searchRoomFail = (payload) => ({
  type: SEARCH_ROOM_FAIL,
  payload
});

// ADD
export const addRoomRequest = (payload) => ({
  type: ADD_ROOM_REQUEST,
  payload
});

export const addRoomSuccess = (payload) => ({
  type: ADD_ROOM_SUCCESS,
  payload
});

export const addRoomFail = (payload) => ({
  type: ADD_ROOM_FAIL,
  payload
});

// DELETE
export const deleteRoomRequest = (payload) => ({
  type: DELETE_ROOM_REQUEST,
  payload
});

export const deleteRoomSuccess = (payload) => ({
  type: DELETE_ROOM_SUCCESS,
  payload
});

export const deleteRoomFail = (payload) => ({
  type: DELETE_ROOM_FAIL,
  payload
});

// UPDATE
export const updateRoomRequest = (payload) => ({
  type: UPDATE_ROOM_REQUEST,
  payload
});

export const updateRoomSuccess = (payload) => ({
  type: UPDATE_ROOM_SUCCESS,
  payload
});

export const updateRoomFail = (payload) => ({
  type: UPDATE_ROOM_FAIL,
  payload
});
