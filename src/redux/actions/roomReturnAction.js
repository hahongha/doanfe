import {
  ADD_ROOM_RETURN_FAIL,
  ADD_ROOM_RETURN_REQUEST,
  ADD_ROOM_RETURN_SUCCESS,
  ALL_ROOM_RETURN_FAIL,
  ALL_ROOM_RETURN_REQUEST,
  ALL_ROOM_RETURN_SUCCESS,
  DELETE_ROOM_RETURN_FAIL,
  DELETE_ROOM_RETURN_REQUEST,
  DELETE_ROOM_RETURN_SUCCESS,
  SEARCH_ROOM_RETURN_FAIL,
  SEARCH_ROOM_RETURN_REQUEST,
  SEARCH_ROOM_RETURN_SUCCESS,
  UPDATE_ROOM_RETURN_FAIL,
  UPDATE_ROOM_RETURN_REQUEST,
  UPDATE_ROOM_RETURN_SUCCESS
} from '../constaints/roomReturnConstaints';

export const getAllRoomReturnRequest = (payload) => ({
  type: ALL_ROOM_RETURN_REQUEST,
  payload
});

export const getAllRoomReturnSuccess = (payload) => ({
  type: ALL_ROOM_RETURN_SUCCESS,
  payload
});

export const getAllRoomReturnFail = (payload) => ({
  type: ALL_ROOM_RETURN_FAIL,
  payload
});

export const searchRoomReturnRequest = (payload) => ({
  type: SEARCH_ROOM_RETURN_REQUEST,
  payload
});

export const searchRoomReturnSuccess = (payload) => ({
  type: SEARCH_ROOM_RETURN_SUCCESS,
  payload
});

export const searchRoomReturnFail = (payload) => ({
  type: SEARCH_ROOM_RETURN_FAIL,
  payload
});

// ADD
export const addRoomReturnRequest = (payload) => ({
  type: ADD_ROOM_RETURN_REQUEST,
  payload
});

export const addRoomReturnSuccess = (payload) => ({
  type: ADD_ROOM_RETURN_SUCCESS,
  payload
});

export const addRoomReturnFail = (payload) => ({
  type: ADD_ROOM_RETURN_FAIL,
  payload
});

// DELETE
export const deleteRoomReturnRequest = (payload) => ({
  type: DELETE_ROOM_RETURN_REQUEST,
  payload
});

export const deleteRoomReturnSuccess = (payload) => ({
  type: DELETE_ROOM_RETURN_SUCCESS,
  payload
});

export const deleteRoomReturnFail = (payload) => ({
  type: DELETE_ROOM_RETURN_FAIL,
  payload
});

// UPDATE
export const updateRoomReturnRequest = (payload) => ({
  type: UPDATE_ROOM_RETURN_REQUEST,
  payload
});

export const updateRoomReturnSuccess = (payload) => ({
  type: UPDATE_ROOM_RETURN_SUCCESS,
  payload
});

export const updateRoomReturnFail = (payload) => ({
  type: UPDATE_ROOM_RETURN_FAIL,
  payload
});
